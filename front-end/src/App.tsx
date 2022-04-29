import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';
import { abi, contractAddress } from './data/Contract';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import AboutSurgeBanner from './components/AboutSurgeBanner';
import Footer from './components/Footer';
import InitialBanner from './components/InitialBanner';
import PartnersBanner from './components/PartnersBanner';
import TeamMembersBanner from './components/TeamMembersBanner';
import FAQBanner from './components/FAQBanner';
import PerkBanner from './components/PerkBanner';
import CollapsableRoadmapBanner from './components/CollapsableRoadmapBanner';
import MintForAFriendBanner from './components/MintForAFriendBanner';
import './App.scss';

declare let window: any;

library.add(fab, faBars, faTimes);

function App() {
  const [saleStatus, setSaleStatus] = useState<number>(0);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (window.ethereum) {
      instantiateEthereum();
      getStatusUpdate();
    }
    addWalletListener();
  }, []);

  useEffect(() => {
    if (!!address) {
      getSaleStatus();
    }
  }, [address])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: any) => {
        if (!!accounts.length) {
          setAddress(accounts);
        } else {
          setAddress('');
        }
      })
    }
  }

  function instantiateEthereum() {
    window.ethers = ethers;
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
    window.signer = window.provider?.getSigner();
    window.contract = new ethers.Contract(contractAddress, abi, window.signer);
  }

  async function getSaleStatus() {
    const status: number = await window.contract.status();
    setSaleStatus(status);
  }

  function getStatusUpdate() {
    window.contract.on('StatusUpdate', (saleStatusUpdate: number) => {
      setSaleStatus(saleStatusUpdate);
    })
  }

  return (
    <div className="App">
      <InitialBanner address={address} saleStatus={saleStatus} setAddress={setAddress} />
      <MintForAFriendBanner saleStatus={saleStatus} address={address} />
      <PartnersBanner />
      <AboutCollectionBanner />
      <PerkBanner />
      <CollapsableRoadmapBanner />
      <AboutSurgeBanner />
      <TeamMembersBanner />
      <FAQBanner />
      <Footer />
    </div>
  );
}

export default App;

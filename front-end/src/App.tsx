import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Contract, ethers } from 'ethers';
import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers';
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

library.add(fab, faBars, faTimes);

function App() {
  const [saleStatus, setSaleStatus] = useState<number>(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [wallet, setWallet] = useState<string>('');

  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(ethersProvider);

  const providerSigner = provider?.getSigner();
  setSigner(providerSigner);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      })
    }
  }

  useEffect(() => {
    addWalletListener();
    // getSaleStatus();
  }, []);

  async function getSaleStatus() {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const status: number = await contract?.status();
    setSaleStatus(status);
  }

  return (
    <div className="App">
      <InitialBanner addresses={addresses} provider={provider} saleStatus={saleStatus} setAddresses={() => setAddresses} signer={signer} />
      <MintForAFriendBanner provider={provider} saleStatus={saleStatus} addresses={addresses} />
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

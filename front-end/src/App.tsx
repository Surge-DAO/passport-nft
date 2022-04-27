import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Contract, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { abi, contractAddress } from './data/Contract';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import AboutSurgeBanner from './components/AboutSurgeBanner';
import Footer from './components/Footer';
import InitialBanner from './components/InitialBanner';
import PartnersBanner from './components/PartnersBanner';
import TeamMembersBanner from './components/TeamMembersBanner';
import FAQBanner from './components/FAQBanner';
import PerkBanner from './components/PerkBanner';
import './App.scss';
import CollapsableRoadmapBanner from './components/CollapsableRoadmapBanner';
import MintForAFriendBanner from './components/MintForAFriendBanner';

library.add(fab, faBars, faTimes);

export const AddressContext = React.createContext(['']);

function App() {
  const [saleStatus, setSaleStatus] = useState<number>(0);
  const [contract, setContract] = useState<Contract>();
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    getProvider();

    try {
      const nftContract: Contract = new ethers.Contract(contractAddress, abi, provider);
      setContract(contract);
      getSaleStatus(nftContract);
    } catch (e) {
      console.error(e);
    }
  }, [provider, contract]);

  async function getProvider() {
    let provider;
    await window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
    setProvider(provider);
  }

  async function getSaleStatus(contract?: Contract) {
    const status: number = contract && await contract.status();
    setSaleStatus(status);
  }

  return (
    <div className="App">
      <InitialBanner addresses={addresses} provider={provider} saleStatus={saleStatus} setAddresses={() => setAddresses} />
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

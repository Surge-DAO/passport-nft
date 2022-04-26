import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Contract, ethers } from 'ethers';
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

function App() {
  let provider: any;
  let contract: Contract;

  const [saleStatus, setSaleStatus] = useState<number>(0);

  try {
    provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PUBLIC_ID}`);
    contract = new ethers.Contract(contractAddress, abi, provider);

    if (contract) {
      contract && getSaleStatus(contract);
      contract && contract.once('StatusUpdate', (saleStatusUpdate, event) => {
        setSaleStatus(saleStatusUpdate);
      })
    }
  } catch (e) {
    console.error(e);
  }

  async function getSaleStatus(contract: Contract) {
    const status = await contract.status();
    setSaleStatus(status);
  }

  return (
    <div className="App">
      <InitialBanner provider={provider} saleStatus={saleStatus} />
      <MintForAFriendBanner provider={provider} saleStatus={saleStatus} />
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

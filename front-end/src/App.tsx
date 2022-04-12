import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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

library.add(fab, faBars, faTimes);

function App() {
  return (
    <div className="App">
      <AboutSurgeBanner />
      <InitialBanner />
      <PartnersBanner />
      <AboutCollectionBanner />
      <PerkBanner />
      <CollapsableRoadmapBanner />
      <TeamMembersBanner />
      <FAQBanner />
      <Footer />
    </div>
  );
}

export default App;

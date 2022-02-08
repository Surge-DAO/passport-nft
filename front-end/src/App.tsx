import React from 'react';
import './App.scss';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import AboutSurgeBanner from './components/AboutSurgeBanner';
import Footer from './components/Footer';
import InitialBanner from './components/InitialBanner';
import PartnersBanner from './components/PartnersBanner';
import TeamMembersBanner from './components/TeamMembersBanner';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import FAQBanner from './components/FAQBanner';

library.add(fab, faBars, faTimes);

function App() {
  return (
    <div className="App">
      <InitialBanner />
      <PartnersBanner />
      <AboutCollectionBanner/>
      <AboutSurgeBanner/>
      <FAQBanner/>
      <TeamMembersBanner />
      <Footer/>
    </div>
  );
}

export default App;

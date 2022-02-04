import React from 'react';
import './App.scss';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import AboutSurgeBanner from './components/AboutSurgeBanner';
import InitialBanner from './components/InitialBanner';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faBars, faTimes);

function App() {
  return (
    <div className="App">
      <InitialBanner />
      <AboutCollectionBanner/>
      <AboutSurgeBanner/>
    </div>
  );
}

export default App;

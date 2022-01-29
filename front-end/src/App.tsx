import React from 'react';
import './App.scss';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import AboutSurgeBanner from './components/AboutSurgeBanner';
import InitialBanner from './components/InitialBanner';

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

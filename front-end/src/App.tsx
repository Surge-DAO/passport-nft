import React from 'react';
import './App.scss';
import AboutCollectionBanner from './components/AboutCollectionBanner';
import InitialBanner from './components/InitialBanner';

function App() {
  return (
    <div className="App">
      <InitialBanner />
      <AboutCollectionBanner/>
    </div>
  );
}

export default App;

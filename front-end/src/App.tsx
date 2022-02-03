import React from 'react';
import './App.scss';
import InitialBanner from './components/InitialBanner';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faBars, faTimes);

function App() {
  return (
    <div className="App">
      <InitialBanner />
    </div>

  );
}

export default App;

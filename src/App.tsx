import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Connection from './components/connection/Connection';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

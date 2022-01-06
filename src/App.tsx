import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Connection from './components/connection/Connection';
import CreateAccount from './components/createAccount/CreateAccount';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

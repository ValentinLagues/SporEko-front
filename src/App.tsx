import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';
import OfferForm from './components/mobile/offerForm/OfferForm';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/offerForm" element={<OfferForm />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

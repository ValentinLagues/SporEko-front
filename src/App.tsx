import React, { useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';
import OfferForm from './components/mobile/offerForm/OfferForm';
import ModificationProfil from './components/mobile/profile/ModificationProfil';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipement from './components/mobile/profile/Shipement';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { id } = useContext(CurrentUserContext);
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/offerForm" element={<OfferForm />} />
          <Route path="/profil" element={<Profile userIn={id != 0} />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="/modifier-mon-profil" element={<ModificationProfil />} />
          <Route path="/mode-envoi" element={<Shipement />} />
        </Routes>
        <Footer userIn={id != 0} />
      </HashRouter>
    </div>
  );
}

export default App;

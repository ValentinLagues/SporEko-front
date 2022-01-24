import React, { useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import ConfirmOrder from './components/mobile/confirmOrder/ConfirmOrder';
import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';
import OfferForm from './components/mobile/offerForm/OfferForm';
import ModificationProfil from './components/mobile/profile/ModificationProfil';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipement from './components/mobile/profile/Shipement';
import FilterMenu from './components/mobile/search/FilterMenu';
import Search from './components/mobile/search/Search';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { idUser, accepted } = useContext(CurrentUserContext);

  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<ConfirmOrder />} />
          <Route path="/search" element={<FilterMenu />} />
          <Route path="/messages" element={<Search />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
        {(idUser || accepted) && (
          <Routes>
            <Route path="/offerForm" element={<OfferForm />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/modifier-mon-profil" element={<ModificationProfil />} />
            <Route path="/mode-envoi" element={<Shipement />} />
          </Routes>
        )}
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

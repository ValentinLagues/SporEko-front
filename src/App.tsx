import React, { useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import AllOffers from './components/mobile/allOffers/AllOffers';
import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Favorites from './components/mobile/favorites/Favorites';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';
import OfferForm from './components/mobile/offerForm/OfferForm';
import ModificationProfil from './components/mobile/profile/ModificationProfil';
import OffersUser from './components/mobile/profile/OffersUser/OffersUser';
import UpdateOffer from './components/mobile/profile/OffersUser/UpdateOffer';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipement from './components/mobile/profile/Shipement';
import FilterMenu from './components/mobile/search/FilterMenu';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { idUser, accepted } = useContext(CurrentUserContext);

  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annonces" element={<AllOffers />} />
          <Route path="/search" element={<FilterMenu />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path={idUser || accepted ? '' : '*'} element={<Connection />} />
        </Routes>
        {(idUser || accepted) && (
          <Routes>
            <Route path="/offerForm" element={<OfferForm />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/modifier-mon-profil" element={<ModificationProfil />} />
            <Route path="/mode-envoi" element={<Shipement />} />
            <Route path="/modifier-votre-annonce" element={<UpdateOffer />} />
            <Route path="/mes-ventes-et-achats" element={<OffersUser />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        )}

        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

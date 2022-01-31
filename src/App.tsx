import React, { useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import AllOffers from './components/mobile/allOffers/AllOffers';
import ConfirmationOrder from './components/mobile/confirmOrder/ConfirmationOrder';
import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Favorites from './components/mobile/favorites/Favorites';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';
import Header from './components/mobile/layout/Header';
import OfferForm from './components/mobile/offerForm/OfferForm';
import ProductDescription from './components/mobile/productDescription/ProductDescription';
// import OfferDetails from './components/mobile/offerDetails/OfferDetails';
import ModificationProfil from './components/mobile/profile/ModificationProfil';
import OffersUser from './components/mobile/profile/OffersUser/OffersUser';
import UpdateOffer from './components/mobile/profile/OffersUser/UpdateOffer';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipment from './components/mobile/profile/Shipment';
// import UpdateOffer from './components/mobile/profile/UpdateOffer';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { idUser, accepted } = useContext(CurrentUserContext);

  return (
    <div className="App">
      <HashRouter basename="/">
        <Header />
        <Routes>
          <Route path="/accueil" element={<Home />} />
          <Route path="/annonces" element={<AllOffers />} />
          <Route path="/connexion" element={<Connection />} />
          <Route path="/creation-compte" element={<CreateAccount />} />
          <Route path="/annonces/:id" element={<ProductDescription />} />
          <Route path={idUser || accepted ? '' : '*'} element={<Connection />} />
        </Routes>
        {(idUser || accepted) && (
          <Routes>
            <Route path="/creation-offre" element={<OfferForm />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/modifier-mon-profil" element={<ModificationProfil />} />
            <Route path="/mode-envoi" element={<Shipment />} />
            <Route path="/modifier-votre-annonce" element={<UpdateOffer />} />
            <Route path="/mes-ventes-et-achats" element={<OffersUser />} />
            <Route path="/confirmer-achat/:idoffer" element={<ConfirmationOrder />} />
            <Route path="/favoris" element={<Favorites />} />
          </Routes>
        )}
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

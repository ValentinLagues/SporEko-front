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
import OffersUser from './components/mobile/profile/OffersUser/OffersUser';
import UpdateOffer from './components/mobile/profile/OffersUser/UpdateOffer';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipment from './components/mobile/profile/Shipment';
import UpdateProfile from './components/mobile/profile/UpdateProfile';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { idUser, accepted } = useContext(CurrentUserContext);

  return (
    <div className="App">
      <HashRouter basename="/">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/offers" element={<AllOffers />} />
          <Route path="/login" element={<Connection />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/offers/:id" element={<ProductDescription />} />
          <Route path={idUser || accepted ? '' : '*'} element={<Connection />} />
        </Routes>
        {(idUser || accepted) && (
          <Routes>
            <Route path="/create-offer" element={<OfferForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/update-offer/:id" element={<UpdateOffer />} />
            <Route path="/my-dashboard" element={<OffersUser />} />
            <Route path="/confirmation-order/:idOffer" element={<ConfirmationOrder />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        )}
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

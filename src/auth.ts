import React from 'react';

import ConfirmationOrder from './components/mobile/confirmOrder/ConfirmationOrder';
import Favorites from './components/mobile/favorites/Favorites';
import OfferForm from './components/mobile/offerForm/OfferForm';
import OffersUser from './components/mobile/profile/OffersUser/OffersUser';
import UpdateOffer from './components/mobile/profile/OffersUser/UpdateOffer';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipment from './components/mobile/profile/Shipment';
import UpdateProfile from './components/mobile/profile/UpdateProfile';

type Menu = {
  path: string;
  title: string;
  Component: React.ComponentType;
};

const authMenu: Menu[] = [
  {
    path: '/create-offer',
    title: 'Créer une annonce',
    Component: OfferForm,
  },
  {
    path: '/profile',
    title: 'Profil',
    Component: Profile,
  },
  {
    path: '/settings',
    title: 'Paramétres',
    Component: Settings,
  },
  {
    path: '/update-profile',
    title: 'Modifier votre profil',
    Component: UpdateProfile,
  },
  {
    path: '/shipment',
    title: 'Livraison',
    Component: Shipment,
  },
  {
    path: '/update-offer/:id',
    title: 'Modifier votre annonce',
    Component: UpdateOffer,
  },
  {
    path: '/my-dashboard',
    title: 'Mes ventes et achats',
    Component: OffersUser,
  },
  {
    path: '/confirmation-order/:id',
    title: 'Confirmation de commande',
    Component: ConfirmationOrder,
  },
  {
    path: '/favorites',
    title: 'Mes favoris',
    Component: Favorites,
  },
];
export default authMenu;

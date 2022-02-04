import React from 'react';

import ConfirmationOrder from './components/mobile/confirmOrder/ConfirmationOrder';
import Favorites from './components/mobile/favorites/Favorites';
import UnderConstruction from './components/mobile/layout/UnderConstruction';
import OfferForm from './components/mobile/offerForm/OfferForm';
import OffersUser from './components/mobile/profile/OffersUser/OffersUser';
import UpdateOffer from './components/mobile/profile/OffersUser/UpdateOffer';
import Profile from './components/mobile/profile/Profile';
import Settings from './components/mobile/profile/Settings';
import Shipment from './components/mobile/profile/Shipment';
import UpdateProfile from './components/mobile/profile/UpdateProfile';

type Menu = {
  path: string;
  titleFr: string;
  titleEn: string;
  Component: React.ComponentType;
};

const authMenu: Menu[] = [
  {
    path: '/create-offer',
    titleFr: 'Créer une annonce',
    titleEn: 'Create an offer',
    Component: OfferForm,
  },
  {
    path: '/profile',
    titleFr: 'Profil',
    titleEn: 'Profile',
    Component: Profile,
  },
  {
    path: '/settings',
    titleFr: 'Paramétres',
    titleEn: 'Settings',
    Component: Settings,
  },
  {
    path: '/update-profile',
    titleFr: 'Modifier votre profil',
    titleEn: 'Edit your profile',
    Component: UpdateProfile,
  },
  {
    path: '/shipment',
    titleFr: 'Livraison',
    titleEn: 'Shipment',
    Component: Shipment,
  },
  {
    path: '/update-offer/:id',
    titleFr: 'Modifier votre annonce',
    titleEn: 'Update your offer',
    Component: UpdateOffer,
  },
  {
    path: '/my-dashboard',
    titleFr: 'Mes ventes et achats',
    titleEn: 'My sales and purchases',
    Component: OffersUser,
  },
  {
    path: '/confirmation-order/:id',
    titleFr: 'Confirmation de commande',
    titleEn: 'Order confirmation',
    Component: ConfirmationOrder,
  },
  {
    path: '/favorites',
    titleFr: 'Mes favoris',
    titleEn: 'My favorites',
    Component: Favorites,
  },
  {
    path: '/under-construction',
    titleFr: 'Prochainement',
    titleEn: 'Under construction',
    Component: UnderConstruction,
  },
];
export default authMenu;

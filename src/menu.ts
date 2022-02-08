import React from 'react';

import AllOffers from './components/mobile/allOffers/AllOffers';
import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Home from './components/mobile/Home/Home';
import ProductDescription from './components/mobile/productDescription/ProductDescription';

type Menu = {
  path: string;
  titleFr: string;
  titleEn: string;
  Component: React.ComponentType;
};

const menuList: Menu[] = [
  {
    path: '/offers',
    titleFr: 'Annonces',
    titleEn: 'Offers',
    Component: AllOffers,
  },
  {
    path: '/login',
    titleFr: 'Connexion',
    titleEn: 'Login',
    Component: Connection,
  },
  {
    path: '/create-account',
    titleFr: 'Créer votre compte',
    titleEn: 'Create your account',
    Component: CreateAccount,
  },
  {
    path: '/offer/:id',
    titleFr: 'Annonce',
    titleEn: 'Offer',
    Component: ProductDescription,
  },
  {
    path: '/',
    titleFr: 'Accueil',
    titleEn: 'Home',
    Component: Home,
  },
];

export default menuList;

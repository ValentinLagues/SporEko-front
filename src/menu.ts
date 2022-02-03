import React from 'react';

import AllOffers from './components/mobile/allOffers/AllOffers';
import Connection from './components/mobile/connection/Connection';
import CreateAccount from './components/mobile/createAccount/CreateAccount';
import Home from './components/mobile/Home/Home';
import ProductDescription from './components/mobile/productDescription/ProductDescription';

type Menu = {
  path: string;
  title: string;
  Component: React.ComponentType;
};

const menuList: Menu[] = [
  {
    path: '/home',
    title: 'Accueil',
    Component: Home,
  },
  {
    path: '/offers',
    title: 'Annonces',
    Component: AllOffers,
  },
  {
    path: '/login',
    title: 'Connexion',
    Component: Connection,
  },
  {
    path: '/create-account',
    title: 'Créer votre compte',
    Component: CreateAccount,
  },
  {
    path: '/offer/:id',
    title: 'Annonce',
    Component: ProductDescription,
  },
];

export default menuList;

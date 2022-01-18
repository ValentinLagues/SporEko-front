import React from 'react';
import { FiList } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiHelpCircle } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiShield } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import HeaderProfil from '../layout/HeaderProfil';
import LogOut from '../layout/LogOut';

const Profile = () => {
  return (
    <div className="profile">
      <HeaderProfil />
      <div className="profile__content">
        <Link to="/ventes-achats" className="profile__content__link">
          <FiList className="profile__content__icons" />
          Mes ventes et achats
          <hr />
        </Link>
        <Link to="/favoris" className="profile__content__link">
          <FiHeart className="profile__content__icons" />
          Mes favoris
          <hr />
        </Link>
        <Link to="/parametres" className="profile__content__link">
          <FiSettings className="profile__content__icons" />
          Paramètres
        </Link>
      </div>
      <div className="profile__content">
        <Link to="/mode-envoi" className="profile__content__link">
          <FiShield className="profile__content__icons" />
          Politique de confidentialité
          <hr />
        </Link>
        <Link to="/mode-envoi" className="profile__content__link">
          <FiEdit className="profile__content__icons" />
          Faites nous vos suggestions
          <hr />
        </Link>
        <Link to="/" className="profile__content__link">
          <FiHelpCircle className="profile__content__icons" />
          Aide
        </Link>
      </div>
      <LogOut />
    </div>
  );
};

export default Profile;

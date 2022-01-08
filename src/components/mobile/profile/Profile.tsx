import React from 'react';
import { FiList } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiHelpCircle } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiShield } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Photo from '../../../../resources/homeBck.jpg';
import LogoRun from '../../../../resources/LogoRun.png';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__intro">
        <Link to="/">
          <img src={LogoRun} alt="Logo" className="profile__intro__logoRun" />
        </Link>
        <div className="profile__intro__photo">
          <img src={Photo} alt="Avatar" />
        </div>
        <div className="profile__intro__name">
          <h3>Alexandra Flahaut</h3>
          <Link to="/profil" className="profile__intro__name__link">
            Voir mon profil
          </Link>
        </div>
      </div>
      <div className="profile__content1">
        <Link to="/ventes-achats" className="profile__content1__link">
          <FiList className="profile__content1__icons" />
          Mes ventes et achats
          <hr />
        </Link>
        <Link to="/favoris" className="profile__content1__link">
          <FiHeart className="profile__content1__icons" />
          Mes favoris
          <hr />
        </Link>
        <Link to="/parametre" className="profile__content1__link">
          <FiSettings className="profile__content1__icons" />
          Paramètre
        </Link>
        {/*  <Link to="/sportif" className="profile__content__link">
          <FiMeh className="profile__content__icons" />
          Invite un sportif
        </Link> */}
      </div>
      <div className="profile__content2">
        <Link to="/mode-envoi" className="profile__content2__link">
          <FiShield className="profile__content2__icons" />
          Politique de confidentialité
          <hr />
        </Link>
        <Link to="/mode-envoi" className="profile__content2__link">
          <FiEdit className="profile__content2__icons" />
          Faites nous vos suggestions
          <hr />
        </Link>
        <Link to="/" className="profile__content2__link">
          <FiHelpCircle className="profile__content2__icons" />
          Aide
        </Link>
      </div>
      <div className="profile__content2__deconexion">
        <p>
          Se déconnecter <FiLogOut />
        </p>
      </div>
    </div>
  );
};

export default Profile;

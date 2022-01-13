import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { FiTruck } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import LogoRun from '../../../../resources/LogoRun.png';
import PhotoDefault from '../../../../resources/photoDefault.png';

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__intro">
        <Link to="/">
          <img src={LogoRun} alt="Logo" className="settings__intro__logoRun" />
        </Link>
        <div className="settings__intro__photo">
          <img src={PhotoDefault} alt="Avatar" />
        </div>
        <div className="settings__intro__name">
          <h3>Alexandra Flahaut</h3>
          <Link to="/" className="settings__intro__name__link">
            Voir mon profil
          </Link>
        </div>
      </div>
      <div className="settings__content">
        <Link to="/modifier-mon-profil" className="settings__content__link">
          <FiPackage className="settings__content__icons" />
          Modifer mon profil
          <hr />
        </Link>
        <Link to="/mode-envoi" className="settings__content__link">
          <FiTruck className="settings__content__icons" />
          Mode d&apos;envoi
        </Link>
      </div>
      <div className="settings__content__deconexion">
        <p>
          Se déconnecter <FiLogOut />
        </p>
      </div>
    </div>
  );
};

export default Settings;

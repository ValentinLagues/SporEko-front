import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import HeaderProfil from '../layout/HeaderProfil';
import LogOut from '../layout/LogOut';

const Settings = () => {
  return (
    <div className="settings">
      <HeaderProfil />
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
      <LogOut />
    </div>
  );
};

export default Settings;

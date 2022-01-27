import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import LogoRun from '../../../../resources/LogoRun.png';

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img src={LogoRun} alt="Logo" className="header__container__logoRun" />
        </Link>
        <FiArrowLeft className="header__container__icon" />
        <h3>Texte</h3>
      </div>
    </div>
    // </div>
  );
};

export default Header;

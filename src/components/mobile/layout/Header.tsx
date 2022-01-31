import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from '../../../../resources/Logo_transparent.png';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__container">
        <FiArrowLeft onClick={() => navigate(-1)} className="header__container__icon" />
        <img src={logo} alt="LogoSporeko" className="header__container__logo" />
      </div>
    </div>
  );
};

export default Header;

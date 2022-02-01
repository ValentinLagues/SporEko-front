import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import authMenu from '../../../auth';
import menuList from '../../../menu';

const Header = () => {
  const navigate = useNavigate();

  const url = useLocation();

  return (
    <div className="header">
      <div className="header__container">
        <FiArrowLeft onClick={() => navigate(-1)} className="header__container__icon" />
        <p className="header__container__name">
          {menuList &&
            menuList
              .filter((menu) => {
                menu.path === url.pathname;
              })
              .map((menu) => menu.title)}
          {authMenu &&
            authMenu
              .filter((menu) => {
                menu.path === url.pathname;
              })
              .map((menu) => menu.title)}
        </p>
      </div>
    </div>
  );
};

export default Header;

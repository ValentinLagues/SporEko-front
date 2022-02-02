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
        {menuList.map(
          (path, index) =>
            path.path === url.pathname && (
              <div key={index} className="header__container__name">
                <p>{path.title}</p>
              </div>
            ),
        )}
        {authMenu.map(
          (path, index) =>
            path.path === url.pathname && (
              <div key={index} className="header__container__name">
                <p>{path.title}</p>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Header;

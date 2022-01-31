import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const url = document.location.href;
  console.log(url);
  return (
    <div className="header">
      <div className="header__container">
        <FiArrowLeft onClick={() => navigate(-1)} className="header__container__icon" />
        <p>{url.slice(24)}</p>
      </div>
    </div>
  );
};

export default Header;

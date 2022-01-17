import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../../contexts/CurrentUser';

const LogOut = () => {
  const { logout } = useContext(CurrentUserContext);
  const navigate: NavigateFunction = useNavigate();
  function redirectHome() {
    navigate('/');
  }
  return (
    <div className="logOut">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          logout();
          redirectHome();
        }}
        className="logOut__button"
        onClick={() => {
          logout();
          redirectHome();
        }}>
        <p>
          Se déconnecter <FiLogOut />
        </p>
      </div>
    </div>
  );
};

export default LogOut;

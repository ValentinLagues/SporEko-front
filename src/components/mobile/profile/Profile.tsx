import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiList } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiHelpCircle } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiShield } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import LogoRun from '../../../../resources/LogoRun.png';
import PhotoDefault from '../../../../resources/photoDefault.png';
import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';

const Profile = () => {
  const [user, setUser] = useState<IUserLog | any>('');
  const urlBack = 'http://localhost:8000/';

  const { id, logout } = useContext(CurrentUserContext);
  const navigate: NavigateFunction = useNavigate();
  function redirectHome() {
    navigate('/');
  }

  useEffect(() => {
    axios
      .get<IUserLog>(`${urlBack}users/${id}`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <div className="profile">
      <>
        <div className="profile__intro">
          <Link to="/">
            <img src={LogoRun} alt="Logo" className="profile__intro__logoRun" />
          </Link>
          <div className="profile__intro__photo">
            <img src={user ? user.picture : PhotoDefault} alt="Avatar" />
          </div>
          <div className="profile__intro__name">
            <h3>
              {user.firstname} {user.lastname}
            </h3>
            <Link to="/profil" className="profile__intro__name__link">
              Voir mon profil
            </Link>
          </div>
        </div>
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
            Paramètre
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
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            logout();
            redirectHome();
          }}
          className="profile__deconexion"
          onClick={() => {
            logout();
            redirectHome();
          }}>
          <p>
            Se déconnecter <FiLogOut />
          </p>
        </div>
      </>
    </div>
  );
};

export default Profile;

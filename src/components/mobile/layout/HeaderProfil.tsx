import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoRun from '../../../../resources/LogoRun.png';
import PhotoDefault from '../../../../resources/photoDefault.png';
import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';

const HeaderProfil = () => {
  const urlBack = 'http://localhost:8000/';

  const { idUser, setUser, user } = useContext(CurrentUserContext);

  useEffect(() => {
    axios
      .get<IUserLog>(`${urlBack}users/${idUser}`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="headerProfil">
      <div className="headerProfil__intro">
        <Link to="/">
          <img src={LogoRun} alt="Logo" className="headerProfil__intro__logoRun" />
        </Link>
        <div className="headerProfil__intro__photo">
          <img
            src={user.picture}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PhotoDefault;
            }}
            alt="Avatar"
          />
        </div>
        <div className="headerProfil__intro__name">
          <h3>
            {user.firstname} {user.lastname}
          </h3>
          <Link to="/profil" className="headerProfil__intro__name__link">
            Voir mon profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfil;

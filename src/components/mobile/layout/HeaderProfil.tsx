import React, { useContext } from 'react';

import PhotoDefault from '../../../../resources/photoDefault.png';
import CurrentUserContext from '../../../contexts/CurrentUser';

const HeaderProfil = () => {
  const { picture, lastname, firstname } = useContext(CurrentUserContext);

  return (
    <div className="headerProfil">
      <div className="headerProfil__intro">
        <div className="headerProfil__intro__photo">
          <img
            src={picture ? picture : PhotoDefault}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PhotoDefault;
            }}
            alt="Avatar"
          />
        </div>
        <div className="headerProfil__intro__name">
          <h3>
            {firstname} {lastname}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfil;

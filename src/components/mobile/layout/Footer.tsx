import React, { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiHome } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../../contexts/CurrentUser';

const Footer = () => {
  const { idUser } = useContext(CurrentUserContext);
  return (
    <div className="footer">
      <ul className="footer__footerContainer">
        <li>
          <Link to="/favorites">
            <FiHeart className="footer__footerContainer__footerIcons" />
            Favoris
          </Link>
        </li>
        <li>
          <Link to="/offers">
            <BsSearch className="footer__footerContainer__footerIcons" />
            Rechercher
          </Link>
        </li>
        <li id="vendre">Vendre</li>
        <li>
          <Link to="/home">
            <FiHome className="footer__footerContainer__footerIcons" />
            Home
          </Link>
        </li>
        <li>
          {idUser ? (
            <Link to="/profile">
              <CgProfile className="footer__footerContainer__footerIcons" />
              Profil
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile className="footer__footerContainer__footerIcons" />
              Compte
            </Link>
          )}
        </li>
      </ul>
      <button type="button" className="footer__button">
        <Link to="/create-offer">
          <BsPlusLg className="btn" />
        </Link>
      </button>
    </div>
  );
};

export default Footer;

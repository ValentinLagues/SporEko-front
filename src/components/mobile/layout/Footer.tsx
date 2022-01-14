import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = { userIn?: boolean };

const Footer: React.FC<Props> = ({ userIn = false }) => {
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
          <Link to="/">
            <BsSearch className="footer__footerContainer__footerIcons" />
            Rechercher
          </Link>
        </li>
        <li id="vendre">Vendre</li>
        <li>
          <Link to="/messages">
            <FiMail className="footer__footerContainer__footerIcons" />
            Messages
          </Link>
        </li>
        <li>
          {!userIn && (
            <Link to="/connection">
              <CgProfile className="footer__footerContainer__footerIcons" />
              Compte
            </Link>
          )}
          {userIn && (
            <Link to="/profil">
              <CgProfile className="footer__footerContainer__footerIcons" />
              Profil
            </Link>
          )}
        </li>
      </ul>
      <button type="button" className="footer__button">
        <Link to="/offerForm">
          <BsPlusLg className="btn" />
        </Link>
      </button>
    </div>
  );
};

export default Footer;

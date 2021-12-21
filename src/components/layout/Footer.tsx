import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { GrFavorite } from 'react-icons/gr';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__footerContainer">
        <li>
          <a href="/favorites">
            <GrFavorite className="footer__footerContainer__footerIcons" />
            Favoris
          </a>{' '}
        </li>
        <li>
          <a href="/search">
            <BsSearch className="footer__footerContainer__footerIcons" />
            Rechercher
          </a>
        </li>
        <li id="vendre">Vendre</li>
        <li>
          <a href="/messages">
            <FiMail className="footer__footerContainer__footerIcons" />
            Messages
          </a>{' '}
        </li>
        <li>
          <a href="/compte">
            <CgProfile className="footer__footerContainer__footerIcons" />
            Compte
          </a>{' '}
        </li>
      </ul>
      <button type="submit" className="btn">
        <BsPlusLg className="footer__button" />
      </button>
    </div>
  );
};

export default Footer;

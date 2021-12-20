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
          <GrFavorite className="footer__footerContainer__footerIcons" />
          <a href="/favorites">Favoris</a>{' '}
        </li>
        <li>
          <BsSearch className="footer__footerContainer__footerIcons" />
          <a href="/search">Rechercher</a>
        </li>
      </ul>
      <button className="btn">
        <BsPlusLg className="footer__button" />
      </button>
      <ul className="footer__footerContainer">
        <li>
          <FiMail className="footer__footerContainer__footerIcons" />
          <a href="/messages">Messages</a>{' '}
        </li>
        <li>
          <CgProfile className="footer__footerContainer__footerIcons" />
          <a href="/mon_compte">Mon compte</a>{' '}
        </li>
      </ul>
    </div>
  );
};

export default Footer;

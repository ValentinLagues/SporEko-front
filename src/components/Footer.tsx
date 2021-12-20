import React from 'react';
import { GrFavorite } from 'react-icons/gr';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footerContainer">
        <li>
          <GrFavorite className="footer__footerIcons" />
          <a href="/favourites">Favoris</a>{' '}
        </li>
        <li>
          <a href="/search">Rechercher</a>
        </li>
        <li>
          <a href="/mon_compte">Mon compte</a>{' '}
        </li>
      </ul>
    </div>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [titlePage, setTitlePage] = useState<string>('');
  const url = useLocation().pathname.slice(1);
  useEffect(() => {
    if (url === 'offers') {
      setTitlePage('Annonces');
    } else if (url === 'home') {
      setTitlePage('Accueil');
    } else if (url === 'login') {
      setTitlePage('Connexion');
    } else if (url === 'create-account') {
      setTitlePage('Création compte');
    } else if (url === 'offers/:id') {
      setTitlePage('Annonce');
    } else if (url === 'favorites') {
      setTitlePage('Favoris');
    } else if (url === 'create-offer') {
      setTitlePage('Créer une annonce');
    } else if (url === 'profile') {
      setTitlePage('Profil');
    } else if (url === 'settings') {
      setTitlePage('Paramétres');
    } else if (url === 'update-profile') {
      setTitlePage('Modifier votre profil');
    } else if (url === 'shipment') {
      setTitlePage('Livraison');
    } else if (url === 'update-offer/:id') {
      setTitlePage('Modifier votre annonce');
    } else if (url === 'my-dashboard') {
      setTitlePage('Mes ventes et achats');
    } else if (url === 'confirmation-order/:idOffer') {
      setTitlePage('Confirmation de commande');
    } else {
      setTitlePage('');
    }
  }, [url]);

  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__container">
        <FiArrowLeft onClick={() => navigate(-1)} className="header__container__icon" />
        <p className="header__container__name">{titlePage && titlePage}</p>
      </div>
    </div>
  );
};

export default Header;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../../../contexts/CurrentUser';
import IOffer from '../../../../interfaces/IOffer';

const OffersUser = () => {
  const [allOffersSeller, setAllOffersSeller] = useState<IOffer[]>([]);
  const [allOffersBuyer, setAllOffersBuyer] = useState<IOffer[]>([]);
  const { idUser } = useContext(CurrentUserContext);

  // useEffect offers, sports, users //
  const urlBack = import.meta.env.VITE_URL_BACK;

  useEffect(() => {
    axios
      .get(`${urlBack}/offers/${idUser}/seller`)
      .then((res) => setAllOffersSeller(res.data));
    axios
      .get(`${urlBack}/offers/${idUser}/buyer`)
      .then((res) => setAllOffersBuyer(res.data));
  }, []);

  return (
    <div className="offers">
      <h2>Mes ventes</h2>
      {allOffersSeller.map((offer: IOffer, index: number) => {
        return (
          <div key={index}>
            <p>{offer.title}</p>
            <div className={offer.is_archived ? 'offers__offer' : 'offers__isArchived'}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  sessionStorage.setItem('idOfferSell', `${offer.id_offer}`);
                }}
                onKeyPress={() => {
                  sessionStorage.setItem('idOfferSell', `${offer.id_offer}`);
                }}>
                <ul className="offers__offer__detail">
                  <Link className={offer.is_archived ? '' : 'offerSell'} to="/">
                    <li>
                      <img src={offer.picture1} alt={`annonce ${offer.id_offer}`} />
                    </li>
                    <li> Nike{offer.id_brand}</li>
                    <li>M/S{offer.id_size}</li>
                    <li>
                      <strong>{offer.price} €</strong>
                    </li>
                  </Link>
                </ul>
              </div>
              {!offer.is_archived && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    sessionStorage.setItem('idOfferSell', `${offer.id_offer}`);
                  }}
                  onKeyPress={() => {
                    sessionStorage.setItem('idOfferSell', `${offer.id_offer}`);
                  }}>
                  <Link
                    to="/modifier-votre-annonce"
                    className={offer.is_archived ? '' : 'offerSellModification'}>
                    Modifier l&apos;annonce
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <h2>Mes achats</h2>
      {allOffersBuyer.map((offer: IOffer, index: number) => (
        <div key={index}>
          <p>{offer.title}</p>
          <div
            className="offers__offer"
            role="button"
            tabIndex={0}
            onClick={() => sessionStorage.setItem('idOfferBuy', `${offer.id_offer}`)}
            onKeyPress={() => sessionStorage.setItem('idOfferBuy', `${offer.id_offer}`)}>
            <ul className="offers__offer__detail">
              <Link to="/mes_achats">
                <li>
                  <img src={offer.picture1} alt={` annonce ${offer.id_offer}`} />
                </li>
                <li> Nike{offer.id_brand}</li>
                <li>M/S{offer.id_size}</li>
                <li>
                  <strong>{offer.price} €</strong>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default OffersUser;

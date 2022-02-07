import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../../../contexts/CurrentUser';
import IOffer from '../../../../interfaces/IOffer';

const OffersUser = () => {
  const [allOffers, setAllOffers] = useState<IOffer[]>([]);
  const { idUser } = useContext(CurrentUserContext);

  // useEffect offers, sports, users //
  const urlBack = import.meta.env.VITE_URL_BACK;

  useEffect(() => {
    axios
      .get<IOffer[]>(`${urlBack}/users/${idUser}/offers`)
      .then((res) => setAllOffers(res.data));
  }, []);

  return (
    <div className="offers">
      <h2>Mes ventes</h2>
      {allOffers
        .filter((offer) => offer.id_user_seller)
        .map((offer: IOffer, index: number) => {
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
                  }}
                >
                  <ul className="offers__offer__detail">
                    <Link
                      className={offer.is_archived ? '' : 'offerSell'}
                      to={`/offer/${offer.id_offer}`}
                    >
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
                    }}
                  >
                    <Link
                      to={`/update-offer/${offer.id_offer}`}
                      className={offer.is_archived ? '' : 'offerSellModification'}
                    >
                      Modifier l&apos;annonce
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <h2>Mes achats</h2>
      {allOffers
        .filter((offer) => offer.id_user_buyer)
        .map((offer: IOffer, index: number) => (
          <div key={index}>
            <p>{offer.title}</p>
            <div
              className="offers__offer"
              role="button"
              tabIndex={0}
              onClick={() => sessionStorage.setItem('idOfferBuy', `${offer.id_offer}`)}
              onKeyPress={() => sessionStorage.setItem('idOfferBuy', `${offer.id_offer}`)}
            >
              <ul className="offers__offer__detail">
                <Link to={`/offers/${offer.id_offer}`}>
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

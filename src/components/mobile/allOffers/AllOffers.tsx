import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IFavorite from '../../../interfaces/IFavorite';
import IOffer from '../../../interfaces/IOffer';

const AllOffers = () => {
  const [allOffers, setAllOffers] = useState<IOffer[]>([]);
  const [userFavorites, setUserFavorites] = useState<IFavorite[]>([]);
  const { idUser } = useContext(CurrentUserContext);

  // add offer to favorites //

  const newID = Number(idUser);

  const addFavorite = (id: number) => {
    axios
      .post(`${urlBack}/favorites`, { id_user: newID, id_offer: id })
      .then((res) => console.log(res.data));
  };

  const deleteFavorite = (id: any) => {
    axios
      .delete(`${urlBack}/favorites`, { id_user: id })
      .then((res) => console.log(res.data));
  };

  // useEffect offers, sports, users //
  const urlBack = import.meta.env.VITE_URL_BACK;

  useEffect(() => {
    axios.get(`${urlBack}/offers`).then((res) => setAllOffers(res.data));
    idUser &&
      axios
        .get(`${urlBack}/users/${newID}/favorites`)
        .then((res) => setUserFavorites(res.data));
  }, []);

  console.log(userFavorites);

  return (
    <div className="allOffers">
      {allOffers.map((offer: IOffer, index: number) => {
        return (
          <div className="allOffers__offer" key={index}>
            <ul className="allOffers__offer__detail">
              <li className="allOffers__offer__detail__mainPicture">
                <Link
                  to={`/offers/${offer.id_offer}`}
                  className="allOffers__offer__detail__linkOfferDetails">
                  <img
                    src={offer.picture1}
                    alt={`Main Picture of ${offer.id_user_seller}`}
                  />
                </Link>
              </li>
              <li className="allOffers__offer__detail__price">
                <strong>{offer.price} €</strong>
              </li>
              {idUser && (
                <li className="allOffers__offer__detail__fav">
                  <AiOutlineHeart
                    className="inputIconEmpty"
                    onClick={() => addFavorite(Number(offer.id_offer))}
                  />
                  <AiFillHeart className="inputIconFull" />
                </li>
              )}
              <li className="allOffers__offer__detail__brand">Nike{offer.id_brand}</li>
              <li className="allOffers__offer__detail__size">M/S{offer.id_size}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AllOffers;

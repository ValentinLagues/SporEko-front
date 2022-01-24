import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import IFavorite from '../../../interfaces/IFavorites';
import IOffer from '../../../interfaces/IOffer';

const AllOffers = () => {
  const [allOffers, setAllOffers] = useState<IOffer[]>([]);
  const [isFavorite, setIsFavorite] = useState<IFavorite>();

  // add offer to favorites //

  const addFavorite = (props: any) => {};

  // useEffect offers, sports, users //
  const urlBack = import.meta.env.VITE_URL_BACK;

  useEffect(() => {
    axios.get(`${urlBack}/offers`).then((res) => setAllOffers(res.data));
    // axios.post(`${urlBack}/favorites`, {addFavorite}).then((res) => setIsFavorite(res.data));
  }, []);

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
              <li className="allOffers__offer__detail__fav">
                {isFavorite.includes(index) ? (
                  <AiFillHeart
                    className="inputIconFull"
                    onClick={() => addFavorite({ offer, index })}
                  />
                ) : (
                  <AiOutlineHeart
                    className="inputIconEmpty"
                    onClick={() => addFavorite({ offer, index })}
                  />
                )}
              </li>
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

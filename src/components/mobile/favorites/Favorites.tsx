import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IFavorite from '../../../interfaces/IFavorite';
import IOffer from '../../../interfaces/IOffer';

const Favorites = () => {
  const { idUser } = useContext(CurrentUserContext);
  const [userFavorites, setUserFavorites] = useState<IFavorite[]>([]);
  const [favOffers, setFavOffers] = useState<IOffer[]>([]);

  const addFavorite = (idOffer: number) => {
    axios
      .post(`${urlBack}/users/${idUser}/favorites`, {
        id_user: Number(idUser),
        id_offer: idOffer,
      })
      .then((res) => setUserFavorites(res.data));
  };

  const deleteFavorite = (idOffer: number) => {
    // je vais récupérer l'idFavorite correspondant au idOffer
    const idFavorite: number =
      userFavorites?.find((fav) => fav.id_offer === idOffer)?.id_favorite || 0;
    console.log(idFavorite);
    idUser &&
      axios
        .delete(`${urlBack}/users/${idUser}/favorites/${idFavorite}`)
        .then((res) => setUserFavorites(res.data));
  };

  const urlBack = import.meta.env.VITE_URL_BACK;

  // Tri des favoris parmis les offres

  const idOfferFav = userFavorites.map((fav) => fav.id_offer);
  console.log(idOfferFav);

  useEffect(() => {
    axios.get(`${urlBack}/offers/${idOfferFav}`).then((res) => setFavOffers(res.data));
  }, []);

  useEffect(() => {
    idUser &&
      axios
        .get(`${urlBack}/users/${idUser}/favorites`)
        .then((res) => setUserFavorites(res.data));

    //Pour chaque favori récupéré (res.data) je vais mapper et aller faire un axios avec l'id_offer
    // je mets ça dans un tableau et je mets ce tableau dans un state
  }, []);

  console.log(userFavorites);
  console.log(favOffers);

  return (
    <div className="favorites">
      <h1 className="favorites__title">Mes Favoris</h1>
      {userFavorites.length > 0 ? (
        favOffers.map((offer: IOffer, index: number) => {
          return (
            <div className="allOffers" key={index}>
              {userFavorites?.length &&
                userFavorites?.find((fav) => fav.id_offer === offer.id_offer) && (
                  <div className="allOffers__offer">
                    <ul className="allOffers__offer__detail">
                      <li className="allOffers__offer__detail__mainPicture">
                        <Link
                          to={`/annonces/${offer.id_offer}`}
                          className="allOffers__offer__detail__linkOfferDetails">
                          <img src={offer.picture1} alt={`profile`} />
                        </Link>
                      </li>
                      <li className="allOffers__offer__detail__price">
                        <strong>{offer.price} €</strong>
                      </li>
                      {idUser && (
                        <li className="allOffers__offer__detail__fav">
                          {userFavorites.find(
                            (fav) => fav.id_offer === offer.id_offer,
                          ) ? (
                            <AiFillHeart
                              className="inputIconFull"
                              onClick={() => deleteFavorite(Number(offer.id_offer))}
                              size={30}
                              color="red"
                            />
                          ) : (
                            <AiOutlineHeart
                              className="inputIconEmpty"
                              onClick={() => addFavorite(Number(offer.id_offer))}
                              size={30}
                            />
                          )}
                        </li>
                      )}
                      <li className="allOffers__offer__detail__brand">
                        Nike{offer.id_brand}
                      </li>
                      <li className="allOffers__offer__detail__size">
                        M/S{offer.id_size}
                      </li>
                    </ul>
                  </div>
                )}
            </div>
          );
        })
      ) : (
        <div className="favorites__empty">
          <h2>Vous n avez aucun favori</h2>
          <Link to="/annonces">
            <button type="button" className="btn">
              Consultez les offres et trouvez votre bonheur !
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUser';
import OfferContext from '../../../contexts/Offer';
import IFavorite from '../../../interfaces/IFavorites';
import IOffer from '../../../interfaces/IOffer';

const Favorites = () => {
  const { idUser } = useContext(CurrentUserContext);
  const [userFavorites, setUserFavorites] = useState<IFavorite[]>([]);
  const [offerFavorite, setOfferFavorite] = useState<IOffer[]>([]);

  const urlBack = import.meta.env.VITE_URL_BACK;

  useEffect(() => {
      axios
        .get(`${urlBack}/users/${idUser}/favorites`)
        .then((res) => setUserFavorites(res.data));
  }, []);

  console.log(userFavorites);

  return (
  <div>
      <h1>Mes Favoris</h1>
  </div>
  )
};

export default Favorites;

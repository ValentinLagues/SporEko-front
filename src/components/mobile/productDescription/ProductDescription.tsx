import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import IBrand from '../../../interfaces/IBrand';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import Ioffer from '../../../interfaces/IOffer';
import IOffer_deliverer from '../../../interfaces/IOffer_deliverer';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const ProductDescription = () => {
  const [offer, setOffer] = useState<Ioffer>([]);
  const [brand, setBrand] = useState<IBrand>();
  const [size, setSize] = useState<ISize>();
  const [condition, setCondition] = useState<ICondition>();
  const [sport, setSport] = useState<ISport>();
  const [deliverer, setDeliverer] = useState<IDeliverer[]>([]);
  const [offerDeliverer, setOfferDeliverer] = useState<IOffer_deliverer[]>([]);
  const [handDeliverer, setHandDeliverer] = useState('');
  const [color1, setColor1] = useState<IColor>();
  const [color2, setColor2] = useState<IColor>();
  const [user, setUser] = useState<IUserLog>();
  const [pictures, setPictures] = useState<Array<string>>([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${urlBack}/offers/${id}/offer_deliverers`)
      .then((res) =>
        setOfferDeliverer(res.data.map((deliverer) => deliverer.id_deliverer)),
      );

    axios
      .get(`${urlBack}/offers/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setOffer(data);
        setPictures({
          picture2: data.picture2,
          picture3: data.picture3,
          picture4: data.picture4,
          picture5: data.picture5,
          picture6: data.picture6,
          picture7: data.picture7,
          picture8: data.picture8,
          picture9: data.picture9,
          picture10: data.picture10,
          picture11: data.picture11,
          picture12: data.picture12,
          picture13: data.picture13,
          picture14: data.picture14,
          picture15: data.picture15,
          picture16: data.picture16,
          picture17: data.picture17,
          picture18: data.picture18,
          picture19: data.picture19,
          picture20: data.picture20,
        });

        data.id_brand &&
          axios
            .get(`${urlBack}/brands/${data.id_brand}`)
            .then((res) => setBrand(res.data));
        data.id_color1 &&
          axios
            .get(`${urlBack}/colors/${data.id_color1}`)
            .then((res) => setColor1(res.data));
        data.id_color2 &&
          axios
            .get(`${urlBack}/colors/${data.id_color2}`)
            .then((res) => setColor2(res.data));
        data.id_sport &&
          axios.get(`${urlBack}/sports/${data.id_sport}`).then((res) => {
            setSport(res.data);
          });
        data.id_size &&
          axios.get(`${urlBack}/sizes/${data.id_size}`).then((res) => setSize(res.data));
        axios
          .get(`${urlBack}/conditions/${data.id_condition}`)
          .then((res) => setCondition(res.data));
        axios.get(`${urlBack}/deliverers`).then((res) => setDeliverer(res.data));

        data.hand_delivery === 0
          ? setHandDeliverer(
              'La remise en main propre pour se produit n est pas disponible',
            )
          : setHandDeliverer('La remise en main propre pour se produit est disponible');

        axios
          .get(`${urlBack}/users/${data.id_user_seller}`, { withCredentials: true })
          .then((res) => setUser(res.data));
      });
  }, []);

  color1 && (color1.style = { backgroundColor: color1?.color_code });
  color2 && (color2.style = { backgroundColor: color2?.color_code });
  let images = Object.keys(pictures).map(function (key: any) {
    return [Number(key), pictures[key]];
  });
  return (
    <div className="product-description">
      <div className="product-description__container-picture">
        {/* --------------------Container photo principale----------------- */}
        <img
          className="product-description__container-picture__big-picture"
          src={offer && offer.picture1}
          alt=""
        />

        <div className="product-description__container-picture__all-picture">
          {offer &&
            images.map((picture: Array<any>, index: any) => (
              <img
                className={
                  picture[1] !== null
                    ? 'product-description__container-picture__all-picture'
                    : 'product-description__container-picture__all-picture__invisible'
                }
                key={index}
                src={picture[1]}
                alt=""
              />
            ))}
        </div>
        <div className="product-description__container-picture__favorite"></div>
      </div>
      <div className="product-description__container-text">
        <div className="product-description__container-text__container1">
          <div className="product-description__container-text__container1__title">
            <hr className="style-hr"></hr>
            <h2>{offer && offer.title}</h2>
          </div>

          <div className="product-description__container-text__container1__price">
            <span>{offer && offer.price} €</span>
          </div>
        </div>
        <div className="product-description__container-text__container2__brand">
          <h2>{brand && brand.name}</h2>
        </div>
        <div className="product-description__container-text__container3">
          <div className="product-description__container-text__container3__size">
            <h3>Taille</h3>
            <p>
              {size && size.id_size} {size && size.size_eu}
            </p>
          </div>
          <div className="product-description__container-text__container3__condition">
            <h3>Etat</h3>
            <p>{condition && condition.name}</p>
          </div>
          <div className="product-description__container-text__container3__color">
            <h3>Couleurs</h3>
            <div className="product-description__container-text__container3__color__pastille-color">
              {color1 && <div className="colorPastille" style={color1.style}></div>}
              {color2 && <div className="colorPastille" style={color2.style}></div>}
            </div>
          </div>
          <div className="product-description__container-text__container3__sport-icon">
            <h3>Sport</h3>
            <p>
              <img
                className="product-description__container-text__container3__sport-icon__img"
                src={sport && sport.icon}
                alt={sport && sport.name}
                title={sport && sport.name}
              />
            </p>
          </div>
        </div>
        <div className="product-description__container-text__container4">
          <div className="product-description__container-text__container4__detail-product">
            <h3>Description</h3>
            <p>{offer && offer.description}</p>
          </div>
        </div>
        <div className="product-description__container-text__container4">
          <div className="product-description__container-text__container4__delivery">
            <h3>Livraison</h3>
            <p>{handDeliverer && handDeliverer}</p>
            <p>Localisation du produit: {user && user.city}</p>
            <h4>Options d&apos;envois disponibles</h4>
            {offerDeliverer &&
              deliverer &&
              deliverer
                .filter((allDeliverer: any) =>
                  offerDeliverer.includes(allDeliverer.id_deliverer),
                )
                .map((delive, index) => <p key={index}>{delive.name}</p>)}
          </div>
          <div className="product-description__container-text__container4__delivery__btn">
            <Link className="btn" type="submit" to={`/confirmation-order/${id}`}>
              Acheter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;
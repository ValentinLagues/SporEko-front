import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import IBrand from '../../../interfaces/IBrand';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import IOffer from '../../../interfaces/IOffer';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const ProductDescription = () => {
  const [offer, setOffer] = useState<IOffer>();
  const [brand, setBrand] = useState<IBrand>();
  const [size, setSize] = useState<ISize>();
  const [condition, setCondition] = useState<ICondition>();
  const [sport, setSport] = useState<ISport>();
  const [deliverers, setDeliverers] = useState<IDeliverer[]>([]);
  const [color1, setColor1] = useState<IColor>();
  const [color2, setColor2] = useState<IColor>();
  const [user, setUser] = useState<IUserLog>();
  const [pictures, setPictures] = useState<Array<string>>([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${urlBack}/offers/${id}/deliverers`)
      .then((res) => setDeliverers(res.data));

    axios
      .get<IOffer>(`${urlBack}/offers/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setOffer(data);
        setPictures([
          data.picture2,
          data.picture3,
          data.picture4,
          data.picture5,
          data.picture6,
          data.picture7,
          data.picture8,
          data.picture9,
          data.picture10,
          data.picture11,
          data.picture12,
          data.picture13,
          data.picture14,
          data.picture15,
          data.picture16,
          data.picture17,
          data.picture18,
          data.picture19,
          data.picture20,
        ]);

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
          axios
            .get(`${urlBack}/sizes?id_size=${data.id_size}&id_item=${data.id_item}`)
            .then((res) => setSize(res.data[0].size));
        axios
          .get(`${urlBack}/conditions/${data.id_condition}`)
          .then((res) => setCondition(res.data));
        axios
          .get(`${urlBack}/users/${data.id_user_seller}`, { withCredentials: true })
          .then((res) => setUser(res.data));
      });
  }, []);

  color1 && (color1.style = { backgroundColor: color1?.color_code });
  color2 && (color2.style = { backgroundColor: color2?.color_code });

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
            pictures.map((picture, index) => (
              <img
                className={
                  picture !== null
                    ? 'product-description__container-picture__all-picture'
                    : 'product-description__container-picture__all-picture__invisible'
                }
                key={index}
                src={picture}
                alt={`vue n° ${index}`}
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
            <p>{size && size}</p>
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
            <p>Localisation du produit : {user && user.city}</p>
            <h4>Options d&apos;envois disponibles</h4>
            {deliverers &&
              deliverers.map((delive, index) => <p key={index}>{delive.name}</p>)}
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

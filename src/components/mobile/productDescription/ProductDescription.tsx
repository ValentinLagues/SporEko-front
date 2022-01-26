import axios from 'axios';
import React, { useEffect, useState } from 'react';

import TestImage from '../../../../resources/testFicheProduit.jpg';
import IBrand from '../../../interfaces/IBrand';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
// import OfferContext from '../../../contexts/Offer';
import Ioffer from '../../../interfaces/IOffer';
// import IColor from '../../../interfaces/IColor';
import ISize from '../../../interfaces/ISize';
// import ISport from '../../../interfaces/ISport';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

// interface IOffer {
//   id_offer: number;
// }

interface Color {
  id_color: number;
  name: string;
  color_code: string;
  style: object;
}
interface Sport {
  id_sport: number;
  name: string;
  icon: string;
}

const ProductDescription = () => {
  const [offer, setOffer] = useState<Ioffer>();
  const [brand, setBrand] = useState<IBrand>();
  const [size, setSize] = useState<ISize>();
  const [condition, setCondition] = useState<ICondition>();
  const [sport, setSport] = useState<Sport>();
  const [deliverer, setDeliverer] = useState<IDeliverer>();
  const [color, setColor] = useState<Color>();
  // const [colorList, setColorList] = useState<Color[]>([]);
  const [user, setUser] = useState<IUserLog>();

  //   const [sellerAddress, setSellerAddress] = useState();

  useEffect(() => {
    axios.get(`${urlBack}/offers/1`).then((res) => setOffer(res.data));
    // console.log = ok
    // axios.get(`${urlBack}/offers/1`).then((data) => console.log(data));
    axios.get(`${urlBack}/brands/1`).then((res) => setBrand(res.data));
    axios.get(`${urlBack}/colors/4`).then((res) => setColor(res.data));
    axios.get(`${urlBack}/sports/1`).then((res) => setSport(res.data));
    axios.get(`${urlBack}/sizes/1`).then((res) => setSize(res.data));
    axios.get(`${urlBack}/conditions/1`).then((res) => setCondition(res.data));
    axios.get(`${urlBack}/deliverers/1`).then((res) => setDeliverer(res.data));
    axios
      .get(`${urlBack}/users/1`, { withCredentials: true })
      .then((res) => setUser(res.data));
    axios.get(`${urlBack}/users/1/`);
  }, []);
  // console.log(offer)

  // colorList &&
  //   colorList.map((color) => (color.style = { backgroundColor: color.color_code }));

  return (
    <div className="product-description">
      <div className="product-description__container-picture">
        {/* --------------------Container photo principale----------------- */}
        <img
          className="product-description__container-picture__big-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={TestImage}
          alt=""
        />
        <div className="product-description__container-picture__favorite"></div>
      </div>
      <div className="product-description__container-text">
        <div className="product-description__container-text__container1">
          <div className="product-description__container-text__container1__title">
            <h2>{offer && offer.title}</h2>
          </div>

          <div className="product-description__container-text__container1__price">
            <span>{offer && offer.price} €</span>
          </div>
          {/* <div className='product-description__container-text__container1__btn-buy'>
                        <button>Acheter</button>
                    </div> */}
        </div>
        <div className="product-description__container-text__container2__brand">
          <h2>{brand && brand.name}</h2>
        </div>
        <div className="product-description__container-text__container3">
          <div className="product-description__container-text__container3__size">
            <h3>Taille</h3>
            <p>
              {size && size.size_int} {size && size.size_eu}
            </p>
          </div>
          <div className="product-description__container-text__container3__condition">
            <h3>Etat</h3>
            <p>{condition && condition.name}</p>
          </div>
          <div className="product-description__container-text__container3__color">
            <h3>Couleurs</h3>
            <p
              className="product-description__container-text__container3__color__pastille-color"
              {...(color && color.style)}
              {...(color && color.style)}></p>
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
          {/* <div className="product-description__container-text__container4__btn-guide-size">
            <button>Guide taille</button>
          </div> */}
        </div>
        <div className="product-description__container-text__container4">
          <div className="product-description__container-text__container4__delivery">
            <h3>Livraison</h3>
            <p>
              Le produit est disponible en remise en main propre.
              {offer && offer.hand_delivery}
            </p>
            <h4>Options d&apos;envoi</h4>
            <button>{deliverer && deliverer.name}</button>
            {/* <button>La poste {offer && offer.colissimo_delivery}</button> */}
            <p>{user && user.city}</p>
            <div className="product-description__container-text__container4__delivery__btn">
              <button>Acheter</button>
              <button>Favoris</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;

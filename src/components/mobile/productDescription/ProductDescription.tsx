import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import CurrentOfferContext from '../../../contexts/Offer';
import IBrand from '../../../interfaces/IBrand';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import Ioffer from '../../../interfaces/IOffer';
import ISize from '../../../interfaces/ISize';
// import ISport from '../../../interfaces/ISport';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

// interface IOffer {
//   id_offer: number;
// }

// interface Color {
//   id_color: number;
//   name: string;
//   color_code: string;
//   style: object;
// }
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
  const [color, setColor] = useState<IColor>();
  // const [colorList, setColorList] = useState<Color[]>([]);
  const [user, setUser] = useState<IUserLog>();

  //   const [sellerAddress, setSellerAddress] = useState();
  console.log(deliverer);

  // const [idSport, setIdSport] = useState<Sport>();

  const url = document.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const { setIdOffer } = useContext(CurrentOfferContext);
  setIdOffer(Number(id));

  useEffect(() => {
    axios
      .get(`${urlBack}/offers/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setOffer(data);
        // console.log = ok
        // axios.get(`${urlBack}/offers/1`).then((data) => console.log(data));
        axios.get(`${urlBack}/brands/${data.id_brand}`).then((res) => setBrand(res.data));
        axios.get(`${urlBack}/colors/${data.id_color}`).then((res) => setColor(res.data));
        axios.get(`${urlBack}/sports/${data.id_sport}`).then((res) => setSport(res.data));
        axios.get(`${urlBack}/sizes/${data.id_size}`).then((res) => setSize(res.data));
        axios
          .get(`${urlBack}/conditions/${data.id_condition}`)
          .then((res) => setCondition(res.data));
        axios
          .get(`${urlBack}/deliverers/${data.id_deliverer}`)
          .then((res) => setDeliverer(res.data));
        axios
          .get(`${urlBack}/users/${data.id_user_seller}`, { withCredentials: true })
          .then((res) => setUser(res.data));
        // axios.get(`${urlBack}/users/1/`);
      });
  }, []);
  // console.log(offer)

  // useEffect(() => {
  //   offer && offer;
  //   axios.get(`${urlBack}/sports/${idSport}`).then((res) => setIdSport(res.data));
  // }, []);
  // console.log(idSport);

  // colorList &&
  //   colorList.map((color) => (color.style = { backgroundColor: color.color_code }));

  // if (size) {
  // }

  return (
    <div className="product-description">
      <div className="product-description__container-picture">
        {/* --------------------Container photo principale----------------- */}
        <img
          className="product-description__container-picture__big-picture"
          src={offer && offer.picture1}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture2}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture3}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture4}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture5}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture6}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture7}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture8}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture9}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture10}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture11}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture12}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture13}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture14}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture15}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture16}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture17}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture18}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture19}
          alt=""
        />
        <img
          className="product-description__container-picture__all-picture"
          src={offer && offer.picture20}
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
              {size && size.id_size} {size && size.size_eu}
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
              {...(color && color.color_code)}
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
            <button>
              {/* {deliverer && deliverer.map(el, index)=> (
              <option key={index} value={el.id_deliverer}>
                {el.name}
              </option> */}
              {/* )} */}
            </button>
            {/* <button>La poste {offer && offer.colissimo_delivery}</button> */}
            <p>{user && user.city}</p>
            <div className="product-description__container-text__container4__delivery__btn">
              <Link className="btn" type="submit" to="/confirmer-achat">
                Acheter
              </Link>
              {/* <AiFillHeart
                className="inputIconFull"
                // onClick={() => deleteFavorite(Number(offer.id_offer))}
                size={30}
                color="red"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;

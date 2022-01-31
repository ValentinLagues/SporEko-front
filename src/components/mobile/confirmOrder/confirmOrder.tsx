import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BsBoxSeam, BsShield } from 'react-icons/bs';

import cards from '../../../../resources/cards.png';
import CurrentOfferContext from '../../../contexts/Offer';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import IOffer_deliverer from '../../../interfaces/IOffer_deliverer';
import IDeliverer_price from '../../../interfaces/IDeliverer_price';
import IOffer from '../../../interfaces/IOffer';
import ISize from '../../../interfaces/ISize';
import IUserLog from '../../../interfaces/IUser';
// import CurrentUserContext from '../../../contexts/CurrentUser';
// import OfferContext from '../../../contexts/Offer';

const urlBack = import.meta.env.VITE_URL_BACK;

const ConfirmOrder = () => {
  const { idOffer } = useContext(CurrentOfferContext);
  // const { id } = useContext(CurrentUserContext);
  const [confirmOrder, setConfirmOrder] = useState<IOffer>();
  const [confirmAdress, setConfirmAdress] = useState<IUserLog>();
  const [confirmDeliverer, setConfirmDeliverer] = useState<IOffer_deliverer>();
  const [confirmDelivererPrice, setConfirmDelivererPrice] = useState<IDeliverer_price>();
  const [confirmCondition, setConfirmCondition] = useState<ICondition>();
  const [deliverersList, setDeliverersList] = useState<IDeliverer[]>([]);
  const [confirmSize, setConfirmSize] = useState<ISize>();

  const [handDelivery, setHandDelivery] = useState(0);

  console.log(idOffer);
  useEffect(() => {
    axios.get(`${urlBack}/offers/${idOffer}`).then((res) => {
      setConfirmOrder(res.data);
      axios.get(`${urlBack}/sizes/1`).then((res) => setConfirmSize(res.data));
      axios.get(`${urlBack}/conditions/1`).then((res) => setConfirmCondition(res.data));
    });
    axios
      .get(`${urlBack}/users/1`, { withCredentials: true })
      .then((res) => setConfirmAdress(res.data));
    axios.get(`${urlBack}/offer_deliverers`).then((res) => {
      setConfirmDeliverer(res.data);
      axios.get(`${urlBack}/deliverers`).then((res) => setDeliverersList(res.data));
    });
    axios
      .get(`${urlBack}/deliverer_price`)
      .then((res) => setConfirmDelivererPrice(res.data));
  }, []);
  console.log(confirmDelivererPrice);
  console.log(confirmDeliverer);

  return (
    <div className="confirmOrder">
      <div className="confirmOrder__confirmOrderContainer">
        <div className="confirmOrder__confirmOrderContainer__box">
          <p
            // encadré instructions
            className="instructions">
            <BsBoxSeam /> Le mode de livraison disponible (Mondial Relay ou Colissimo) ou
            une remise en main propre
          </p>
          <p className="instructions">
            <BsShield /> La protection Acheteurs Sporeko
          </p>
          <p className="instructions">
            <AiOutlineLock /> Paiement sécurisé{' '}
            <img className="cards" src={cards} alt="cards" />
          </p>
        </div>
        <div
          // encadré recap commande
          className="confirmOrder__confirmOrderContainer__box">
          <h3>COMMANDE</h3>
          {confirmOrder && confirmSize && confirmCondition && (
            <div>
              <img src={confirmOrder.picture1} alt="picture1" />
              <h4>{confirmOrder.title}</h4>
              <p>
                {confirmSize.size_fr} {confirmCondition.name}
              </p>
              <h3>{confirmOrder.price} €</h3>
            </div>
          )}
        </div>
        <div
          // encadré recap coordonnées
          className="confirmOrder__confirmOrderContainer__box">
          <h3>VOS COORDONNEES</h3>
          {confirmAdress && (
            <div>
              <h4>
                {confirmAdress.firstname} {confirmAdress.lastname}
              </h4>
              <p>{confirmAdress.address}</p>
              <p>{confirmAdress.address_complement}</p>
              <p>
                {confirmAdress.zipcode} {confirmAdress.city}
              </p>
              <p>{confirmAdress.country}</p>
            </div>
          )}
        </div>
        <div
          // encadré selection mode de livraison (deliverers s'affiche si handDelivery est false)
          className="confirmOrder__confirmOrderContainer__box">
          <h3>OPTIONS DE LIVRAISON</h3>
          <div className="delivererList">
            <span className="confirmOrder__confirmOrderContainer__span">
              Remise en main propre
            </span>
            <label className="switch">
              <input
                checked={handDelivery ? true : false}
                onChange={() => {
                  handDelivery ? setHandDelivery(0) : setHandDelivery(1);
                }}
                type="checkbox"
                name="handDelivery"
              />
              <span className="slider round"> </span>
            </label>
          </div>
          {!handDelivery &&
            deliverersList.map((deliverer, index) => <p key={index}>{deliverer.name}</p>)}
        </div>
        <div
          // encadré résumé total prix (en cours)
          className="confirmOrder__confirmOrderContainer__box">
          <h3>Résumé de la commande</h3>
          {confirmOrder && (
            <div>
              <img src={confirmOrder.picture1} alt="picturetotal" />
              <p>Montant : {confirmOrder.price} €</p>
              <p>Frais de port : </p>
              <p>Frais de protection acheteurs : </p>
              <p>TOTAL : {confirmOrder.price} + 1 €</p>
            </div>
          )}
          <button>Payer</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

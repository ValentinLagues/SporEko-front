import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BsBoxSeam, BsShield } from 'react-icons/bs';
import { useParams } from 'react-router';

import cards from '../../../../resources/cards.png';
import CurrentUserContext from '../../../contexts/CurrentUser';
// import des interfaces
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import IDelivererPrice from '../../../interfaces/IDelivererPrice';
import IOffer from '../../../interfaces/IOffer';
import IOfferDeliverer from '../../../interfaces/IOfferDeliverer';
import ISize from '../../../interfaces/ISize';
import IUser from '../../../interfaces/IUser';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const ConfirmationOrder = () => {
  const { id } = useParams();
  const { idUser } = useContext(CurrentUserContext);
  // states pour le récap de la commande et l'adresse de l'utilisateur
  const [offerInfos, setOfferInfos] = useState<IOffer>();
  const [userInfos, setUserInfos] = useState<IUserLog>();
  const [sizeInfos, setSizeInfos] = useState<ISize>();
  const [conditionInfos, setConditionInfos] = useState<ICondition>();

  // boolean pour la remise en main propre
  const [handDelivery, setHandDelivery] = useState<number>(0);

  // states pour recuperer les infos pour les prix
  const [deliverersList, setDeliverersList] = useState<IDeliverer[]>([]);
  const [selectedDeliverer, setSelectedDeliverer] = useState<number>(0);
  const [delivererPrice, setDelivererPrice] = useState<number>(0);

  useEffect(() => {
    axios.get<IOffer>(`${urlBack}/offers/${id}`).then((res) => {
      setOfferInfos(res.data);
      axios
        .get<ISize>(`${urlBack}/sizes/${res.data.id_size}`)
        .then((res) => setSizeInfos(res.data));
      axios
        .get<ICondition>(`${urlBack}/conditions/${res.data.id_condition}`)
        .then((res) => setConditionInfos(res.data));
    });
    axios
      .get<IUser>(`${urlBack}/users/${idUser}`, { withCredentials: true })
      .then((res) => setUserInfos(res.data));
    // recuperer la liste des livreurs de l'offre et la mettre dans un tableau
    axios
      .get<IDeliverer[]>(`${urlBack}/offers/${id}/deliverers`)
      .then((res) => setDeliverersList(res.data));
  }, []);

  useEffect(() => {
    // recuperer les prix des livreurs selon le poids
    axios
      .get<IDelivererPrice[]>(
        `${urlBack}/deliverer_prices?idDeliverer=${selectedDeliverer}&weight=${offerInfos?.weight}`,
      )
      .then((res) => {
        setDelivererPrice(res.data[0].price);
      });
  }, [selectedDeliverer]);
  return (
    <div className="confirmedOrder">
      <div className="confirmedOrder__confirmedOrderContainer">
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <p className="instructions">
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
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>COMMANDE</h3>
          {offerInfos && (
            <div>
              <img src={offerInfos.picture1} alt="picture1" />
              <h4>{offerInfos.title}</h4>
              <p>Taille : {sizeInfos && sizeInfos.size_fr}</p>
              <p>Etat : {conditionInfos && conditionInfos.name}</p>
              <h3>{offerInfos.price} €</h3>
            </div>
          )}
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>VOS COORDONNEES</h3>
          {userInfos && (
            <div>
              <h4>
                {userInfos.firstname} {userInfos.lastname}
              </h4>
              <p>{userInfos.address}</p>
              <p>{userInfos.address_complement}</p>
              <p>
                {userInfos.zipcode} {userInfos.city}
              </p>
              <p>{userInfos.country}</p>
            </div>
          )}
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>OPTIONS DE LIVRAISON</h3>
          <div className="delivererList">
            <span className="confirmedOrder__confirmedOrderContainer__span">
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
            {!handDelivery &&
              deliverersList.map((deliverer, index) => (
                <div key={index}>
                  <span className="confirmedOrder__confirmedOrderContainer__span">
                    {deliverer.name}
                  </span>
                  <label className="switch">
                    <input
                      checked={selectedDeliverer === deliverer.id_deliverer}
                      onChange={() => {
                        setSelectedDeliverer(deliverer.id_deliverer);
                      }}
                      type="checkbox"
                      name={deliverer.name}
                    />
                    <span className="slider round"> </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>Résumé de la commande</h3>
          {offerInfos && (
            <div>
              <img src={offerInfos.picture1} alt="picturetotal" />
              <p className="confirmedOrder__confirmedOrderContainer__box__orderDetails">
                Montant : {offerInfos.price} €
              </p>
              <p className="confirmedOrder__confirmedOrderContainer__box__orderDetails">
                Frais de port : {delivererPrice} €
              </p>
              <p className="confirmedOrder__confirmedOrderContainer__box__orderDetails">
                Frais de protection acheteurs : 1 €
              </p>
              <h3 className="confirmedOrder__confirmedOrderContainer__box__orderTotal">
                Total : {offerInfos.price + delivererPrice + 1} €
              </h3>
            </div>
          )}
        </div>
        <button className="btn">Payer</button>
      </div>
    </div>
  );
};

export default ConfirmationOrder;

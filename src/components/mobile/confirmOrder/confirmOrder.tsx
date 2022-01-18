import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import IOffer from '../../../interfaces/IOffer';
import IUserLog from '../../../interfaces/IUser';
import OfferContext from '../../../contexts/Offer';
// import { BiPackage, BiCheckShield } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import CurrentUserContext from '../../../contexts/CurrentUser';

interface IOffer_Deliverer {
  id_offer_deliverer: number;
  id_offer: number;
  id_deliverer: number;
}

const urlBack = import.meta.env.VITE_URL_BACK;

const ConfirmOrder = () => {
  // const { id_offer } = useContext(OfferContext);
  const { id } = useContext(CurrentUserContext);
  const [confirmOrder, setConfirmOrder] = useState<IOffer>();
  const [confirmAdress, setConfirmAdress] = useState<IUserLog>();
  const [confirmDeliverer, setConfirmDeliverer] = useState<IOffer_Deliverer>();
  const [order, setOrder] = useState('');
  const [adress, setAdress] = useState('');
  const [deliverer, setDeliverer] = useState('');

  useEffect(() => {
    axios.get(`${urlBack}/offers/1`).then((res) => setConfirmOrder(res.data)),
      axios.get(`${urlBack}/users/${id}`).then((res) => setConfirmAdress(res.data));
    // axios
    //   .get(`${urlBack}/offer_deliverers`)
    //   .then((res) => setConfirmDeliverer(res.data));
  }, []);
  console.log(1);
  return (
    <div className="confirmorder">
      <div className="confirmorder__Container">
        {/* <div>
          <p>
            <BiPackage />
          </p>
          <p>
            <BiCheckShield />
          </p>
          <p>
            <AiOutlineLock />
          </p>
        </div> */}
        <div>
          <h3>COMMANDE</h3>
          {confirmOrder && (
            <div>
              {/* {confirmOrder.picture1} */}
              {confirmOrder.title}
              {/* {offer.id_size}
              {offer.id_condition}
              {offer.price} */}
            </div>
          )}
        </div>
        <div>
          <h3>VOS COORDONNEES</h3>
          {/* {confirmAdress &&
            confirmAdress.map((user, index) => (
              <div key={index}>
                {user.firstname}
                {user.lastname}
                {user.adress}
                {user.adress_complement}
                {user.zipcode}
                {user.city}
                {user.country}
              </div>
            ))} */}
        </div>
        <div>
          <h3>OPTIONS DE LIVRAISON</h3>
        </div>
        <div>
          <h3>Résumé de la commande</h3>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

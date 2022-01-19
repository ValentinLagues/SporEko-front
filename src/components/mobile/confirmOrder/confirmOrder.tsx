import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import { BiPackage, BiCheckShield } from 'react-icons/bi';
// import { AiOutlineLock } from 'react-icons/ai';
// import CurrentUserContext from '../../../contexts/CurrentUser';
// import OfferContext from '../../../contexts/Offer';
import IOffer from '../../../interfaces/IOffer';
import IUserLog from '../../../interfaces/IUser';
import ISize from '../../../interfaces/ISize';
import IDeliverer from '../../../interfaces/IDeliverer';
import ICondition from '../../../interfaces/ICondition';

interface IOffer_Deliverer {
  id_offer_deliverer: number;
  id_offer: number;
  id_deliverer: number;
}

const urlBack = import.meta.env.VITE_URL_BACK;

const ConfirmOrder = () => {
  // const { id_offer } = useContext(OfferContext);
  // const { id } = useContext(CurrentUserContext);
  const [confirmOrder, setConfirmOrder] = useState<IOffer>();
  const [confirmAdress, setConfirmAdress] = useState<IUserLog>();
  const [confirmDeliverer, setConfirmDeliverer] = useState<IOffer_Deliverer>();
  const [confirmCondition, setConfirmCondition] = useState<ICondition>();
  const [deliverersList, setDeliverersList] = useState<IDeliverer[]>([]);
  const [confirmSize, setConfirmSize] = useState<ISize>();

  const [handDelivery, setHandDelivery] = useState(0);

  useEffect(() => {
    axios.get(`${urlBack}/offers/1`).then((res) => {
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
  }, []);
  console.log(deliverersList);
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
          {confirmOrder && confirmSize && confirmCondition && (
            <div>
              <img src={confirmOrder.picture1} alt="picture1" />
              <h4>{confirmOrder.title}</h4>
              <h5>
                {confirmSize.size_fr} {confirmCondition.name}
              </h5>
              <h3>{confirmOrder.price}</h3>
            </div>
          )}
        </div>
        <div>
          <h3>VOS COORDONNEES</h3>
          {confirmAdress && (
            <div>
              <h4>
                {confirmAdress.firstname} {confirmAdress.lastname}
              </h4>
              <h5>{confirmAdress.address}</h5>
              <h5>{confirmAdress.address_complement}</h5>
              <h5>
                {confirmAdress.zipcode} {confirmAdress.city}
              </h5>
              <h5>{confirmAdress.country}</h5>
            </div>
          )}
        </div>
        <div>
          <h3>OPTIONS DE LIVRAISON</h3>
          <div className="delivererList">
            <div className="offerForm__switchContainer">
              <span className="offerForm__switchContainer__span">
                Remise en main propre:
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
                <span className="slider round"></span>
              </label>
            </div>
            {!handDelivery &&
              deliverersList.map((deliverer, index) => (
                <div key={index}>{deliverer.name}</div>
              ))}
          </div>
          <div>
            <h3>Résumé de la commande</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

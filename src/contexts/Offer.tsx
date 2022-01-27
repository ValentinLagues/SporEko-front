import React, { createContext, useEffect, useState } from 'react';

type OfferContent = {
  idOffer: number;
  setIdOffer: React.Dispatch<React.SetStateAction<number>>;
  idOfferSell: string;
  setIdOfferSell: React.Dispatch<React.SetStateAction<string>>;
  idOfferBuy: string;
  setIdOfferBuy: React.Dispatch<React.SetStateAction<string>>;
  creation_date: string;
  setCreation_date: React.Dispatch<React.SetStateAction<string>>;
  id_user_seller: number;
  setId_user_seller: React.Dispatch<React.SetStateAction<number>>;
  picture1: string;
  setPicture1: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  id_sport: number;
  setId_sport: React.Dispatch<React.SetStateAction<number>>;
  id_gender: number;
  setId_gender: React.Dispatch<React.SetStateAction<number>>;
  is_child: boolean;
  setIs_child: React.Dispatch<React.SetStateAction<boolean>>;
  id_category: number;
  setId_category: React.Dispatch<React.SetStateAction<number>>;
  id_item: number;
  setId_item: React.Dispatch<React.SetStateAction<number>>;
  id_brand: number;
  setId_brand: React.Dispatch<React.SetStateAction<number>>;
  id_textile: number;
  setId_textile: React.Dispatch<React.SetStateAction<number>>;
  id_size: number;
  setId_size: React.Dispatch<React.SetStateAction<number>>;
  id_color1: number;
  setId_color1: React.Dispatch<React.SetStateAction<number>>;
  id_color2: number;
  setId_color2: React.Dispatch<React.SetStateAction<number>>;
  id_condition: number;
  setId_condition: React.Dispatch<React.SetStateAction<number>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  weight: number;
  setIdWeight: React.Dispatch<React.SetStateAction<number>>;
  id_user_buyer: number;
  setId_user_buyer: React.Dispatch<React.SetStateAction<number>>;
  purchase_date: string;
  setPurchase_date: React.Dispatch<React.SetStateAction<string>>;
  hand_delivery: boolean;
  setHand_delivery: React.Dispatch<React.SetStateAction<boolean>>;
  is_archived: boolean;
  setIs_archived: React.Dispatch<React.SetStateAction<boolean>>;
  is_draft: boolean;
  setIs_draft: React.Dispatch<React.SetStateAction<boolean>>;
  picture2: string;
  setPicture2: React.Dispatch<React.SetStateAction<string>>;
  picture3: string;
  setPicture3: React.Dispatch<React.SetStateAction<string>>;
  picture4: string;
  setPicture4: React.Dispatch<React.SetStateAction<string>>;
  picture5: string;
  setPicture5: React.Dispatch<React.SetStateAction<string>>;
  picture6: string;
  setPicture6: React.Dispatch<React.SetStateAction<string>>;
  picture7: string;
  setPicture7: React.Dispatch<React.SetStateAction<string>>;
  picture8: string;
  setPicture8: React.Dispatch<React.SetStateAction<string>>;
  picture9: string;
  setPicture9: React.Dispatch<React.SetStateAction<string>>;
  picture10: string;
  setPicture10: React.Dispatch<React.SetStateAction<string>>;
  picture11: string;
  setPicture11: React.Dispatch<React.SetStateAction<string>>;
  picture12: string;
  setPicture12: React.Dispatch<React.SetStateAction<string>>;
  picture13: string;
  setPicture13: React.Dispatch<React.SetStateAction<string>>;
  picture14: string;
  setPicture14: React.Dispatch<React.SetStateAction<string>>;
  picture15: string;
  setPicture15: React.Dispatch<React.SetStateAction<string>>;
  picture16: string;
  setPicture16: React.Dispatch<React.SetStateAction<string>>;
  picture17: string;
  setPicture17: React.Dispatch<React.SetStateAction<string>>;
  picture18: string;
  setPicture18: React.Dispatch<React.SetStateAction<string>>;
  picture19: string;
  setPicture19: React.Dispatch<React.SetStateAction<string>>;
  picture20: string;
  setPicture20: React.Dispatch<React.SetStateAction<string>>;
};

type Props = { children: Element };

const CurrentOfferContext = createContext<OfferContent>({
  idOffer: 0,
  setIdOffer: () => {},
  idOfferSell: '',
  setIdOfferSell: () => {},
  idOfferBuy: '',
  setIdOfferBuy: () => {},
  creation_date: '',
  setCreation_date: () => {},
  id_user_seller: 1,
  setId_user_seller: () => {},
  picture1: '',
  setPicture1: () => {},
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
  id_sport: 1,
  setId_sport: () => {},
  id_gender: 1,
  setId_gender: () => {},
  is_child: false,
  setIs_child: () => {},
  id_category: 0,
  setId_category: () => {},
  id_item: 1,
  setId_item: () => {},
  id_brand: 1,
  setId_brand: () => {},
  id_textile: 1,
  setId_textile: () => {},
  id_size: 1,
  setId_size: () => {},
  id_color1: 1,
  setId_color1: () => {},
  id_color2: 1,
  setId_color2: () => {},
  id_condition: 1,
  setId_condition: () => {},
  price: 0.0,
  setPrice: () => {},
  weight: 0,
  setIdWeight: () => {},
  id_user_buyer: 0,
  setId_user_buyer: () => {},
  purchase_date: '',
  setPurchase_date: () => {},
  hand_delivery: false,
  setHand_delivery: () => {},
  is_archived: false,
  setIs_archived: () => {},
  is_draft: false,
  setIs_draft: () => {},
  picture2: '',
  setPicture2: () => {},
  picture3: '',
  setPicture3: () => {},
  picture4: '',
  setPicture4: () => {},
  picture5: '',
  setPicture5: () => {},
  picture6: '',
  setPicture6: () => {},
  picture7: '',
  setPicture7: () => {},
  picture8: '',
  setPicture8: () => {},
  picture9: '',
  setPicture9: () => {},
  picture10: '',
  setPicture10: () => {},
  picture11: '',
  setPicture11: () => {},
  picture12: '',
  setPicture12: () => {},
  picture13: '',
  setPicture13: () => {},
  picture14: '',
  setPicture14: () => {},
  picture15: '',
  setPicture15: () => {},
  picture16: '',
  setPicture16: () => {},
  picture17: '',
  setPicture17: () => {},
  picture18: '',
  setPicture18: () => {},
  picture19: '',
  setPicture19: () => {},
  picture20: '',
  setPicture20: () => {},
});

export const CurrentOfferContextProvider: React.FC<Props> = ({ children }) => {
  const [idOffer, setIdOffer] = useState<number>(0);
  const [idOfferSell, setIdOfferSell] = useState<string | any>('');
  const [idOfferBuy, setIdOfferBuy] = useState<string | any>('');
  useEffect(() => {
    setIdOfferSell(sessionStorage.getItem('idOfferSell'));
    setIdOfferBuy(sessionStorage.getItem('idOfferBuy'));
  }, [idOfferSell]);

  const [creation_date, setCreation_date] = useState<string>('');
  const [id_user_seller, setId_user_seller] = useState<number>(0);
  const [picture1, setPicture1] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [id_sport, setId_sport] = useState<number>(0);
  const [id_gender, setId_gender] = useState<number>(0);
  const [is_child, setIs_child] = useState<boolean>(false);
  const [id_category, setId_category] = useState<number>(0);
  const [id_item, setId_item] = useState<number>(0);
  const [id_brand, setId_brand] = useState<number>(0);
  const [id_textile, setId_textile] = useState<number>(0);
  const [id_size, setId_size] = useState<number>(0);
  const [id_color1, setId_color1] = useState<number>(0);
  const [id_color2, setId_color2] = useState<number>(0);
  const [id_condition, setId_condition] = useState<number>(0);
  const [price, setPrice] = useState<number>(0.0);
  const [weight, setIdWeight] = useState<number>(0);
  const [id_user_buyer, setId_user_buyer] = useState<number>(0);
  const [purchase_date, setPurchase_date] = useState<string>('');
  const [hand_delivery, setHand_delivery] = useState<boolean>(false);
  const [is_archived, setIs_archived] = useState<boolean>(false);
  const [is_draft, setIs_draft] = useState<boolean>(false);
  const [picture2, setPicture2] = useState<string>('');
  const [picture3, setPicture3] = useState<string>('');
  const [picture4, setPicture4] = useState<string>('');
  const [picture5, setPicture5] = useState<string>('');
  const [picture6, setPicture6] = useState<string>('');
  const [picture7, setPicture7] = useState<string>('');
  const [picture8, setPicture8] = useState<string>('');
  const [picture9, setPicture9] = useState<string>('');
  const [picture10, setPicture10] = useState<string>('');
  const [picture11, setPicture11] = useState<string>('');
  const [picture12, setPicture12] = useState<string>('');
  const [picture13, setPicture13] = useState<string>('');
  const [picture14, setPicture14] = useState<string>('');
  const [picture15, setPicture15] = useState<string>('');
  const [picture16, setPicture16] = useState<string>('');
  const [picture17, setPicture17] = useState<string>('');
  const [picture18, setPicture18] = useState<string>('');
  const [picture19, setPicture19] = useState<string>('');
  const [picture20, setPicture20] = useState<string>('');

  return (
    <CurrentOfferContext.Provider
      value={{
        idOffer,
        setIdOffer,
        idOfferSell,
        setIdOfferSell,
        idOfferBuy,
        setIdOfferBuy,
        creation_date,
        setCreation_date,
        id_user_seller,
        setId_user_seller,
        picture1,
        setPicture1,
        title,
        setTitle,
        description,
        setDescription,
        id_sport,
        setId_sport,
        id_gender,
        setId_gender,
        is_child,
        setIs_child,
        id_category,
        setId_category,
        id_item,
        setId_item,
        id_brand,
        setId_brand,
        id_textile,
        setId_textile,
        id_size,
        setId_size,
        id_color1,
        setId_color1,
        id_color2,
        setId_color2,
        id_condition,
        setId_condition,
        price,
        setPrice,
        weight,
        setIdWeight,
        id_user_buyer,
        setId_user_buyer,
        purchase_date,
        setPurchase_date,
        hand_delivery,
        setHand_delivery,
        is_archived,
        setIs_archived,
        is_draft,
        setIs_draft,
        picture2,
        setPicture2,
        picture3,
        setPicture3,
        picture4,
        setPicture4,
        picture5,
        setPicture5,
        picture6,
        setPicture6,
        picture7,
        setPicture7,
        picture8,
        setPicture8,
        picture9,
        setPicture9,
        picture10,
        setPicture10,
        picture11,
        setPicture11,
        picture12,
        setPicture12,
        picture13,
        setPicture13,
        picture14,
        setPicture14,
        picture15,
        setPicture15,
        picture16,
        setPicture16,
        picture17,
        setPicture17,
        picture18,
        setPicture18,
        picture19,
        setPicture19,
        picture20,
        setPicture20,
      }}>
      {children}
    </CurrentOfferContext.Provider>
  );
};

export default CurrentOfferContext;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

import CurrentUserContext from '../../../contexts/CurrentUser';
import IBrand from '../../../interfaces/IBrand';
import ICategory from '../../../interfaces/ICategory';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import IItem from '../../../interfaces/IItem';
import IOffer from '../../../interfaces/IOffer';
import IOffer_Deliverer from '../../../interfaces/IOffer_deliverer';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import ITextile from '../../../interfaces/ITextile';

const urlBack = import.meta.env.VITE_URL_BACK;

const OfferForm = () => {
  const { idUser } = useContext(CurrentUserContext);

  const [sportList, setSportList] = useState<ISport[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [itemList, setItemList] = useState<IItem[]>([]);
  const [brandList, setBrandList] = useState<IBrand[]>([]);
  const [textileList, setTextileList] = useState<ITextile[]>([]);
  const [colorList, setColorList] = useState<IColor[]>([]);
  const [conditionList, setConditionList] = useState<ICondition[]>([]);
  const [sizeList, setSizeList] = useState<ISize[]>([]);
  const [delivererList, setDelivererList] = useState<IDeliverer[]>([]);

  const [pictures, setPictures] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [itemInfos, setItemInfos] = useState<IItem>();
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [brand, setBrand] = useState('');
  const [textile, setTextile] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState<number | null>(null);
  const [weightRequired, setWeightRequired] = useState(false);
  const [handDelivery, setHandDelivery] = useState(0);
  const [chosenDeliverers, setChosenDeliverers] = useState<Array<number>>([]);
  const [isDraft, setIsDraft] = useState(0);
  const [offer, setOffer] = useState<IOffer>();
  const [deliverersArray, setDeliverersArray] = useState<Array<number>>([]);
  const [photoAdded, setPhotoAdded] = useState(false);

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}/items`).then((res) => setItemList(res.data));
    axios.get(`${urlBack}/brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}/textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}/colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}/conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}/sizes`).then((res) => setSizeList(res.data));
    axios.get(`${urlBack}/deliverers`).then((res) => setDelivererList(res.data));
  }, []);

  useEffect(() => {
    category &&
      axios.get(`${urlBack}/categories/${category}/items`).then((res) => {
        setItemList(res.data);
      });
  }, [category]);

  useEffect(() => {
    let filters = ``;
    let oneValue = false;

    if (gender) {
      filters += `?id_gender=${gender}`;
      oneValue = true;
    }
    if (genderIsChild) {
      filters += oneValue ? `&is_child=1` : `?is_child=1`;
      oneValue = true;
    }
    item
      ? axios.get(`${urlBack}/items/${item}/sizes${filters}`).then((res) => {
          setSizeList(res.data);
        })
      : category
      ? axios.get(`${urlBack}/categories/${category}/sizes${filters}`).then((res) => {
          setSizeList(res.data);
        })
      : (setSizeList([]), setShowSizes(false));
  }, [item, gender, genderIsChild, category]);

  const handleItemSelected = (id: string) => {
    axios
      .get(`${urlBack}/items/${id}`)
      .then((item) => {
        setItemInfos(item.data);
        return item.data;
      })
      .then((item) =>
        item.id_size_type === 1 ||
        item.id_size_type === 2 ||
        item.id_size_type === 3 ||
        item.id_size_type === 6
          ? setShowSizes(true)
          : setShowSizes(false),
      );
  };

  const handleChosenDeliverers = (id: number) => {
    if (deliverersArray.includes(id)) {
      setDeliverersArray(deliverersArray.filter((elem) => elem !== id));
    } else {
      setDeliverersArray(deliverersArray.concat([id]));
    }
  };

  useEffect(() => {
    if (deliverersArray.length != 0) {
      setWeightRequired(true);
    } else {
      setWeightRequired(false);
    }
  }, [deliverersArray]);

  const handleSubmit = (e: React.FormEvent) => {
    let errors = false;
    const errorsDescription = document.getElementById('errorsDescription');
    let errorsMessage = [];

    if (!photoAdded) {
      errorsMessage.push('veuillez ajouter au moins une photo');
      errors = true;
    }

    if (errors) {
      e.preventDefault();
      console.log(errorsMessage);
      errorsMessage.map((message) => errorsDescription?.append(message));
      errorsDescription?.setAttribute('display', 'bloc');
    }
    if (!errors) {
      errorsDescription?.setAttribute('display', 'none');
      setChosenDeliverers(deliverersArray);
      setDeliverersArray([]);
      const newOffer = {
        id_user_seller: Number(idUser),
        title,
        picture1: pictures[0],
        description,
        id_sport: parseInt(sport),
        id_gender: gender,
        is_child: genderIsChild ? 1 : 0,
        id_category: parseInt(category),
        id_item: parseInt(item),
        id_brand: brand ? parseInt(brand) : null,
        id_textile: textile ? parseInt(textile) : null,
        id_size: size ? parseInt(size) : null,
        id_color1: color1 ? parseInt(color1) : null,
        id_color2: color2 ? parseInt(color2) : null,
        id_condition: parseInt(condition),
        price: Number(Number(price).toFixed(2)),
        weight: Number(Number(weight).toFixed(0)),
        hand_delivery: handDelivery,
        is_archived: 0,
        is_draft: isDraft,
        picture2: pictures[1],
        picture3: pictures[2],
        picture4: pictures[3],
        picture5: pictures[4],
        picture6: pictures[5],
        picture7: pictures[6],
        picture8: pictures[7],
        picture9: pictures[8],
        picture10: pictures[9],
        picture11: pictures[10],
        picture12: pictures[11],
        picture13: pictures[12],
        picture14: pictures[13],
        picture15: pictures[14],
        picture16: pictures[15],
        picture17: pictures[16],
        picture18: pictures[17],
        picture19: pictures[18],
        picture20: pictures[19],
      } as unknown as IOffer;
      setOffer(newOffer);
    }
  };

  // Function axios to add pictures on offer.
  const handleFileInput = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    const formData = new FormData();
    const arrayFiles = Array.from(file);
    arrayFiles.map((el) => formData.append('imagesOffers', el));
    // formData.append('imagesOffers', file);

    axios
      .post(
        `${urlBack}/offers/images`,
        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => (setPictures(res.data), setPhotoAdded(true)))
      .catch((err) => console.error({ ...err }));
  };

  let images = Object.keys(pictures).map(function (key: any) {
    return [Number(key), pictures[key]];
  });

  useEffect(() => {
    offer &&
      axios
        .post<IOffer>(`${urlBack}/offers`, offer)
        .then((rep) => {
          const id_offer = rep.data.id_offer;
          chosenDeliverers.map((deliverer) => {
            const id_deliverer = deliverer;
            axios.post<IOffer_Deliverer>(`${urlBack}/offer_deliverers`, {
              id_offer,
              id_deliverer,
            });
          });
        })
        .catch((err) => console.log({ ...err }));
  }, [offer]);

  return (
    <div className="offerForm">
      <form
        encType="multipart/form-data"
        id="offerForm"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="offerForm__form"
        action=""
      >
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input
            multiple
            type="file"
            id="photo1"
            name="imagesOffers"
            onChange={(e) => handleFileInput(e)}
          />
        </div>
        <div className="photosContainer">
          {pictures &&
            images.map((image: Array<any>, index) => (
              <img
                className="image"
                key={image[0]}
                src={image[1]}
                alt={`n°${index} de l'annonce`}
              />
            ))}
        </div>
        <div>
          <label className="offerForm__label" htmlFor="title">
            <MdStarRate className="iconRequired" /> Titre
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="offerForm__input"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="description">
            <MdStarRate className="iconRequired" /> Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="offerForm__input"
            rows={5}
            id="description"
            name="description"
          />
        </div>
        <div className="offerForm__items">
          <div className="offerForm__items__asterisk">
            <MdStarRate className="iconRequired" />
          </div>
          <select
            required
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="offerForm__select"
            name="sports"
            id="sports"
          >
            <option value="" id="sport">
              Sport
            </option>
            {sportList &&
              sportList.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div className="offerForm__items">
          <div className="offerForm__items__asterisk">
            <MdStarRate className="iconRequired" />
          </div>
          <select
            required
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(true), setGender(null))
                : (setGenderIsChild(false), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="offerForm__select"
            name="genders"
            id="genders"
          >
            <option value="">Genre</option>
            <option value={1}>Femme</option>
            <option value={2}>Homme</option>
            <option value={4}>Enfant</option>
            <option value={3}>Tous</option>
          </select>
        </div>
        {genderIsChild && (
          <div>
            <select
              onChange={(e) => {
                setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
              }}
              value={Number(genderChild)}
              className="offerForm__select conditionnal"
            >
              <option value="">Tous</option>
              <option value={1}>Fille</option>
              <option value={2}>Garçon</option>
            </select>
          </div>
        )}
        <div className="offerForm__items">
          <div className="offerForm__items__asterisk">
            <MdStarRate className="iconRequired" />
          </div>
          <select
            required
            onChange={(e) => {
              setItem('');
              setCategory(e.target.value);
              // e.target.value === '' ? setItem('') : '';
              e.target.value === '1'
                ? (setCategoryIsClothes(true), setShowSizes(true))
                : setCategoryIsClothes(false);
              e.target.value === '2' ? setShowSizes(true) : '';
              e.target.value === '3' ? setShowSizes(false) : '';
            }}
            value={category}
            className="offerForm__select"
            name="categories"
            id="categories"
          >
            <option value="">Catégorie</option>
            {categoryList &&
              categoryList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="offerForm__items">
          <div className="offerForm__items__asterisk">
            <MdStarRate className="iconRequired" />
          </div>
          <select
            required
            onChange={(e) => {
              handleItemSelected(e.target.value);
              setItem(e.target.value);
              itemInfos?.id_size_type === 1 ||
              itemInfos?.id_size_type === 2 ||
              itemInfos?.id_size_type === 3 ||
              itemInfos?.id_size_type === 6
                ? setShowSizes(true)
                : setShowSizes(false);
            }}
            value={item}
            className="offerForm__select"
          >
            <option value="">Article</option>
            {itemList &&
              itemList.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {categoryIsClothes && (
          <div>
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile}
              className="offerForm__select conditionnal"
              name="textile"
              id="textile"
            >
              <option value="">Toutes matières</option>
              {textileList &&
                textileList.map((textile, index) => (
                  <option key={index} value={textile.id_textile}>
                    {textile.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="offerForm__select"
            name="brands"
            id="brands"
          >
            <option value="">Marque</option>
            {brandList &&
              brandList.map((brand, index) => (
                <option key={index} value={brand.id_brand}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {showSizes && (
          <div className="offerForm__items">
            <div className="offerForm__items__asterisk">
              <MdStarRate className="iconRequired" />
            </div>
            <select
              onChange={(e) => setSize(e.target.value)}
              value={size}
              className="offerForm__select"
              name="sizes"
              id="sizes"
            >
              <option value="">Taille</option>
              {sizeList &&
                sizeList.map((size, index) => (
                  <option key={index} value={size.id_size}>
                    {(category === '1' && genderIsChild) || itemInfos?.id_size_type === 6
                      ? `${size.age_child}`
                      : category === '1' ||
                        itemInfos?.id_size_type === 2 ||
                        itemInfos?.id_size_type === 3
                      ? size.size_int !== null
                        ? `${size.size_int}/${size.size_eu}/${size.size_uk}`
                        : `${size.age_child}`
                      : category === '2' || itemInfos?.id_size_type === 1
                      ? `${size.size_eu}`
                      : ''}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <select
            onChange={(e) => setColor1(e.target.value)}
            value={color1}
            className="offerForm__select"
            name="color1"
            id="color1"
          >
            <option value="">Couleur 1</option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setColor2(e.target.value)}
            value={color2}
            className="offerForm__select"
            name="color2"
            id="color2"
          >
            <option value="">Couleur 2</option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={color.id_color}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
        <div className="offerForm__items">
          <div className="offerForm__items__asterisk">
            <MdStarRate className="iconRequired" />
          </div>
          <select
            required
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="offerForm__select"
            name="conditions"
            id="conditions"
          >
            <option value="">État du produit</option>
            {conditionList &&
              conditionList.map((condition, index) => (
                <option key={index} value={condition.id_condition}>
                  {condition.name}
                </option>
              ))}
          </select>
        </div>
        <div className="offerForm__price">
          <label className="offerForm__label" htmlFor="price">
            <MdStarRate className="iconRequired" /> Prix hors frais de port
          </label>
          <input
            required
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={0.01}
            id="price"
            name="price"
          />
          €
        </div>
        <div className="offerForm__weight">
          <label className="offerForm__label" htmlFor="weight">
            {weightRequired && <MdStarRate className="iconRequired" />} Poids du produit
          </label>
          <input
            value={weight || ''}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={1}
            id="weight"
            name="weight"
          />
        </div>
        <div className="offerForm__deliveries">
          <span className="offerForm__switchContainer__span">
            <MdStarRate className="iconRequired" /> Modes de livraison :
          </span>
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
            {delivererList &&
              delivererList.map((deliverer) => (
                <div key={deliverer.id_deliverer} className="offerForm__switchContainer">
                  <span className="offerForm__switchContainer__span">
                    {deliverer.name}
                  </span>
                  <label className="switch">
                    <input
                      onChange={() => handleChosenDeliverers(deliverer.id_deliverer)}
                      id={deliverer.name}
                      type="checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="offerForm__switchContainer">
          <span className="offerForm__switchContainer__span">
            Enregistrer comme brouillon et mettre en vente plus tard
          </span>
          <label className="switch">
            <input
              checked={isDraft ? true : false}
              onChange={() => {
                isDraft ? setIsDraft(0) : setIsDraft(1);
              }}
              type="checkbox"
              name="isDraft"
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div id="errorsDescription" className="offerForm__errorsDescription"></div>
        <div className="offerForm__submitContainer">
          <button className="btn" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;

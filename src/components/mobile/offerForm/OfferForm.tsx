import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

import IBrand from '../../../interfaces/IBrand';
import ICategory from '../../../interfaces/ICategory';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IGender from '../../../interfaces/IGender';
import IOffer from '../../../interfaces/IOffer';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import ITextile from '../../../interfaces/ITextile';

const urlBack = import.meta.env.VITE_URL_BACK;

const OfferForm = () => {
  const [sportList, setSportList] = useState<ISport[]>([]);
  // const [genderList, setGenderList] = useState<IGender[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [brandList, setBrandList] = useState<IBrand[]>([]);
  const [textileList, setTextileList] = useState<ITextile[]>([]);
  const [colorList, setColorList] = useState<IColor[]>([]);
  const [conditionList, setConditionList] = useState<ICondition[]>([]);
  const [sizeList, setSizeList] = useState<ISize[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  // const [child, setChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  // const [clothes, setClothes] = useState<number | null>(null);
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  // const [shoe, setShoe] = useState<number | null>(null);
  // const [categoryIsShoe, setCategoryIsShoe] = useState(false);
  // const [accessory, setAccessory] = useState<number | null>(null);
  // const [categoryIsAccessory, setCategoryIsAccessory] = useState(false);
  const [brand, setBrand] = useState('');
  const [textile, setTextile] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState(0);
  const [handDelivery, setHandDelivery] = useState(0);
  const [isDraft, setIsDraft] = useState(0);
  const [offer, setOffer] = useState<IOffer>();

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    // axios.get(`${urlBack}/genders`).then((res) => setGenderList(res.data));
    // axios.get(`${urlBack}/children`).then((res) => setChildList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
    // axios.get(`${urlBack}/clothes`).then((res) => setClothesList(res.data));
    // axios.get(`${urlBack}/shoes`).then((res) => setShoeList(res.data));
    // axios.get(`${urlBack}/accessories`).then((res) => setAccessoryList(res.data));
    axios.get(`${urlBack}/brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}/textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}/colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}/conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}/sizes`).then((res) => setSizeList(res.data));
    // axios.get(`${urlBack}/weights`).then((res) => setWeightList(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer = {
      id_user_seller: 1,
      picture1: 'adresse interne de la photo',
      title,
      description,
      id_sport: parseInt(sport),
      id_gender: gender,
      ischild: genderIsChild ? 1 : 0,
      id_category: parseInt(category),
      // id_clothes: clothes ? Number(clothes) : null,
      // id_shoe: shoe ? Number(shoe) : null,
      // id_accessory: accessory ? Number(accessory) : null,
      id_brand: brand ? parseInt(brand) : null,
      id_textile: textile ? parseInt(textile) : null,
      id_size: size ? parseInt(size) : null,
      id_color1: color1 ? parseInt(color1) : null,
      id_color2: color2 ? parseInt(color2) : null,
      id_condition: parseInt(condition),
      price: Number(price),
      weight: Number(weight),
      hand_delivery: handDelivery,
      // colissimo_delivery: 0,
      // mondial_relay_delivery: 0,
      isarchived: 0,
      isdraft: isDraft,
      picture2: 'adresse interne de la photo',
      picture3: 'adresse interne de la photo',
      picture4: 'adresse interne de la photo',
      picture5: 'adresse interne de la photo',
      picture6: 'adresse interne de la photo',
      picture7: 'adresse interne de la photo',
      picture8: 'adresse interne de la photo',
      picture9: 'adresse interne de la photo',
      picture10: 'adresse interne de la photo',
      picture11: 'adresse interne de la photo',
      picture12: 'adresse interne de la photo',
      picture13: 'adresse interne de la photo',
      picture14: 'adresse interne de la photo',
      picture15: 'adresse interne de la photo',
      picture16: 'adresse interne de la photo',
      picture17: 'adresse interne de la photo',
      picture18: 'adresse interne de la photo',
      picture19: 'adresse interne de la photo',
      picture20: 'adresse interne de la photo',
    } as IOffer;
    setOffer(newOffer);
  };

  useEffect(() => {
    offer &&
      axios.post<IOffer>(`${urlBack}/offers`, offer).then((rep) => console.log(rep));
  }, [offer]);

  return (
    <div className="offerForm">
      <form
        id="offerForm"
        onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        className="offerForm__form"
        action="">
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input type="file" id="photo1" name="photo1" />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="title">
            Titre <MdStarRate className="iconRequired" />
          </label>
          <input
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
            Description <MdStarRate className="iconRequired" />
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="offerForm__input"
            rows={5}
            id="description"
            name="description"
          />
        </div>
        <div>
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="offerForm__select"
            name="sports"
            id="sports">
            <option value="">Sport</option>
            {sportList &&
              sportList.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(true), setGender(null))
                : (setGenderIsChild(false), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="offerForm__select"
            name="genders"
            id="genders">
            <option value="">Genre</option>
            <option value={1}>Femme</option>
            <option value={2}>Homme</option>
            <option value={4}>Enfant</option>
            <option value={3}>Tous</option>
            {/* {genderList &&
              genderList.map((gender, index) => (
                <option key={index} value={gender.id_gender}>
                  {gender.adult_name}
                </option>
              ))} */}
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
              name="children"
              id="children">
              <option value="">Tous</option>
              <option value={1}>Fille</option>
              <option value={2}>Garçon</option>
              {/* {childList &&
                childList.map((child, index) => (
                  <option key={index} value={child.id_child}>
                    {child.name}
                  </option>
                ))} */}
            </select>
          </div>
        )}
        <div className="filterMenu__item">
          {/* <label htmlFor="categories">Catégorie</label> */}
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              e.target.value === '1'
                ? setCategoryIsClothes(true)
                : setCategoryIsClothes(false);
            }}
            value={category}
            className="offerForm__select"
            name="categories"
            id="categories">
            <option value="">Catégorie</option>
            {categoryList &&
              categoryList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {categoryIsClothes && (
          <div className="filterMenu__item--right">
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile}
              className=""
              name="textile"
              id="textile">
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
        {/* <div>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              e.target.value === '2'
                ? (setCategoryIsClothes(true), setClothes(1))
                : setCategoryIsClothes(false);
              e.target.value === '3'
                ? (setCategoryIsShoe(true), setShoe(1))
                : setCategoryIsShoe(false);
              e.target.value === '4'
                ? (setCategoryIsAccessory(true), setAccessory(1))
                : setCategoryIsAccessory(false);
            }}
            value={category}
            className="offerForm__select"
            name="categories"
            id="categories">
            <option value="">Catégorie</option>
            {categoryList &&
              categoryList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div> */}
        {/* {categoryIsClothes && (
          <div>
            <select
              onChange={(e) => setClothes(Number(e.target.value))}
              value={clothes === null ? '' : clothes}
              className="offerForm__select conditionnal"
              name="clothes"
              id="clothes">
              {clothesList &&
                clothesList.map((clothes, index) => (
                  <option key={index} value={clothes.id_clothes}>
                    {clothes.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {categoryIsShoe && (
          <div>
            <select
              onChange={(e) => setShoe(Number(e.target.value))}
              value={shoe === null ? '' : shoe}
              className="offerForm__select conditionnal"
              name="shoe"
              id="shoe">
              {shoeList &&
                shoeList.map((shoe, index) => (
                  <option key={index} value={shoe.id_shoe}>
                    {shoe.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {categoryIsAccessory && (
          <div>
            <select
              onChange={(e) => setAccessory(Number(e.target.value))}
              value={accessory === null ? '' : accessory}
              className="offerForm__select conditionnal"
              name="accessory"
              id="accessory">
              {accessoryList &&
                accessoryList.map((accessory, index) => (
                  <option key={index} value={accessory.id_accessory}>
                    {accessory.name}
                  </option>
                ))}
            </select>
          </div>
        )} */}
        <div>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="offerForm__select"
            name="brands"
            id="brands">
            <option value="">Marque</option>
            {brandList &&
              brandList.map((brand, index) => (
                <option key={index} value={brand.id_brand}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {/* {categoryIsClothes && (
          <div>
            <select
              onChange={(e) => setTextile(e.target.value)}
              value={textile}
              className="offerForm__select"
              name="textile"
              id="textile">
              <option value="">Matière</option>
              {textileList &&
                textileList.map((textile, index) => (
                  <option key={index} value={textile.id_textile}>
                    {textile.name}
                  </option>
                ))}
            </select>
          </div>
        )} */}
        <div>
          <select
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="offerForm__select"
            name="sizes"
            id="sizes">
            <option value="">Taille</option>
            {sizeList &&
              sizeList.map((size, index) => (
                <option key={index} value={size.id_size}>
                  {size.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setColor1(e.target.value)}
            value={color1}
            className="offerForm__select"
            name="color1"
            id="color1">
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
            id="color2">
            <option value="">Couleur 2</option>
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
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="offerForm__select"
            name="conditions"
            id="conditions">
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
            Prix hors frais de port <MdStarRate className="iconRequired" />
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={0.01}
            id="price"
            name="price"
          />
          €
        </div>
        <div>
          <label className="offerForm__label" htmlFor="weight">
            Poids du produit <MdStarRate className="iconRequired" />
          </label>
          <input
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="offerForm__input"
            type="number"
            step={1}
            id="weight"
            name="weight"
          />
          grammes
          {/* <select
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
            className="offerForm__select"
            name="weight"
            id="weight">
            <option value="">Poids du produit</option>
            {weightList &&
              weightList.map((weight, index) => (
                <option key={index} value={weight.id_weight}>
                  {weight.name}
                </option>
              ))}
          </select> */}
        </div>
        <div className="offerForm__switchContainer">
          <span className="offerForm__switchContainer__span">
            Autoriser la remise en main propre
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

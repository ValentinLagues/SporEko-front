import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

const urlBack = 'http://localhost:8000/';

const OfferForm = () => {
  const [sportList, setSportList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [colissimoList, setColissimoList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('');
  const [colissimo, setColissimo] = useState('');
  const [byHand, setByHand] = useState(false);
  const [draft, setDraft] = useState(false);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    axios.get(`${urlBack}sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}genders`).then((res) => setGenderList(res.data));
    axios.get(`${urlBack}categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}sizes`).then((res) => setSizeList(res.data));
    axios.get(`${urlBack}colissimos`).then((res) => setColissimoList(res.data));
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setOffer(
      ((offer.title = title),
      (offer.description = description),
      (offer.price = price),
      (offer.id_sport = sport),
      (offer.id_size = size),
      (offer.id_condition = condition),
      (offer.id_brand = brand),
      (offer.id_category = category),
      (offer.id_color = color),
      (offer.id_textile = 1),
      (offer.id_user_seller = 1)),
    );
    console.log(offer);
  };

  return (
    <div className="offerForm">
      <form
        id="offerForm"
        onSubmit={(e) => handleSubmit(e)}
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
                <option key={index} value={index + 1}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="offerForm__select"
            name="genders"
            id="genders">
            <option value="">Genre</option>
            {genderList &&
              genderList.map((gender, index) => (
                <option key={index} value={index + 1}>
                  {gender.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="offerForm__select"
            name="categories"
            id="categories">
            <option value="">Catégorie</option>
            {categoryList &&
              categoryList.map((category, index) => (
                <option key={index} value={index + 1}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
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
                <option key={index} value={index + 1}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
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
                <option key={index} value={index + 1}>
                  {size.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className="offerForm__select"
            name="colors"
            id="colors">
            <option value="">Couleur</option>
            {colorList &&
              colorList.map((color, index) => (
                <option key={index} value={index + 1}>
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
                <option key={index} value={index + 1}>
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
            onChange={(e) => setPrice(e.target.value)}
            className="offerForm__input"
            type="number"
            step={0.01}
            id="price"
            name="price"
          />
          €
        </div>
        <div>
          <select
            onChange={(e) => setColissimo(e.target.value)}
            value={colissimo}
            className="offerForm__select"
            name="colissimos"
            id="colissimos">
            <option value="">Format du produit</option>
            {colissimoList &&
              colissimoList.map((colissimo, index) => (
                <option key={index} value={index + 1}>
                  {colissimo.name}
                </option>
              ))}
          </select>
        </div>
        <div className="offerForm__switchContainer">
          <span className="offerForm__switchContainer__span">
            Autoriser la remise en main propre
          </span>
          <label className="switch">
            <input
              checked={byHand}
              onChange={() => setByHand(!byHand)}
              type="checkbox"
              name="byHand"
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
              checked={draft}
              onChange={() => setDraft(!draft)}
              type="checkbox"
              name="draft"
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

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

const urlBack = 'http://localhost:8000/';

const OfferForm = () => {
  const [sportList, setSportList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [childList, setChildList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [clothesList, setClothesList] = useState([]);
  const [shoeList, setShoeList] = useState([]);
  const [accessoryList, setAccessoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [textileList, setTextileList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [weightList, setWeightList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState('');
  const [child, setChild] = useState('');
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [clothes, setClothes] = useState('');
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [shoe, setShoe] = useState('');
  const [categoryIsShoe, setCategoryIsShoe] = useState(false);
  const [accessory, setAccessory] = useState('');
  const [categoryIsAccessory, setCategoryIsAccessory] = useState(false);
  const [brand, setBrand] = useState('');
  const [textile, setTextile] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [handDelivery, setHandDelivery] = useState(0);
  const [isDraft, setIsDraft] = useState(0);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    axios.get(`${urlBack}sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}genders`).then((res) => setGenderList(res.data));
    axios.get(`${urlBack}children`).then((res) => setChildList(res.data));
    axios.get(`${urlBack}categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}clothes`).then((res) => setClothesList(res.data));
    axios.get(`${urlBack}shoes`).then((res) => setShoeList(res.data));
    axios.get(`${urlBack}accessories`).then((res) => setAccessoryList(res.data));
    axios.get(`${urlBack}brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}sizes`).then((res) => setSizeList(res.data));
    axios.get(`${urlBack}weights`).then((res) => setWeightList(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOffer(
      ((offer.id_user_seller = 1),
      (offer.picture1 = 'adresse interne de la photo'),
      (offer.title = title),
      (offer.description = description),
      (offer.id_sport = parseInt(sport)),
      (offer.id_gender = parseInt(gender)),
      child && (offer.id_child = parseInt(child)),
      (offer.id_category = parseInt(category)),
      clothes && (offer.id_clothes = parseInt(clothes)),
      shoe && (offer.id_shoe = parseInt(shoe)),
      accessory && (offer.id_accessory = parseInt(accessory)),
      brand && (offer.id_brand = parseInt(brand)),
      textile && (offer.id_textile = parseInt(textile)),
      size && (offer.id_size = parseInt(size)),
      color1 && (offer.id_color1 = parseInt(color1)),
      color2 && (offer.id_color2 = parseInt(color2)),
      (offer.id_condition = parseInt(condition)),
      (offer.price = parseFloat(price)),
      (offer.id_weight = parseInt(weight)),
      (offer.hand_delivery = handDelivery),
      (offer.colissimo_delivery = 0),
      (offer.mondial_relay_delivery = 0),
      (offer.isarchived = 0),
      (offer.isdraft = isDraft),
      (offer.picture2 = 'adresse interne de la photo'),
      (offer.picture3 = 'adresse interne de la photo'),
      (offer.picture4 = 'adresse interne de la photo'),
      (offer.picture5 = 'adresse interne de la photo'),
      (offer.picture6 = 'adresse interne de la photo'),
      (offer.picture7 = 'adresse interne de la photo'),
      (offer.picture8 = 'adresse interne de la photo'),
      (offer.picture9 = 'adresse interne de la photo'),
      (offer.picture10 = 'adresse interne de la photo'),
      (offer.picture11 = 'adresse interne de la photo'),
      (offer.picture12 = 'adresse interne de la photo'),
      (offer.picture13 = 'adresse interne de la photo'),
      (offer.picture14 = 'adresse interne de la photo'),
      (offer.picture15 = 'adresse interne de la photo'),
      (offer.picture16 = 'adresse interne de la photo'),
      (offer.picture17 = 'adresse interne de la photo'),
      (offer.picture18 = 'adresse interne de la photo'),
      (offer.picture19 = 'adresse interne de la photo')),
    );
    console.log(offer);
    axios({
      method: 'post',
      url: `${urlBack}offers`,
      data: offer,
    }).then((rep) => console.log(rep));
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
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setGender(e.target.value);
              e.target.value === '4'
                ? (setGenderIsChild(true), setChild(1))
                : setGenderIsChild(false);
            }}
            value={gender}
            className="offerForm__select"
            name="genders"
            id="genders">
            <option value="">Genre</option>
            {genderList &&
              genderList.map((gender, index) => (
                <option key={index} value={gender.id_gender}>
                  {gender.name}
                </option>
              ))}
          </select>
        </div>
        {genderIsChild && (
          <div>
            <select
              onChange={(e) => setChild(e.target.value)}
              value={child}
              className="offerForm__select conditionnal"
              name="children"
              id="children">
              {childList &&
                childList.map((child, index) => (
                  <option key={index} value={child.id_child}>
                    {child.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
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
        </div>
        {categoryIsClothes && (
          <div>
            <select
              onChange={(e) => setClothes(e.target.value)}
              value={clothes}
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
              onChange={(e) => setShoe(e.target.value)}
              value={shoe}
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
              onChange={(e) => setAccessory(e.target.value)}
              value={accessory}
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
        )}
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
        {categoryIsClothes && (
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
        )}
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
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            className="offerForm__select"
            name="weight"
            id="weight">
            <option value="">Format du produit</option>
            {weightList &&
              weightList.map((weight, index) => (
                <option key={index} value={weight.id_weight}>
                  {weight.name}
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
              checked={handDelivery}
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
              checked={isDraft}
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

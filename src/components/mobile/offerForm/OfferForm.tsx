import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdStarRate } from 'react-icons/md';

interface Offer {
  id_user_seller: number;
  picture1: string;
  title: string;
  description: string;
  id_sport: number;
  id_gender: number;
  id_child: number | null;
  id_category: number;
  id_clothes: number;
  id_shoe: number;
  id_accessory: number;
  id_brand: number;
  id_textile: number;
  id_size: number;
  id_color1: number;
  id_color2: number;
  id_condition: number;
  price: number;
  id_weight: number;
  hand_delivery: number;
  colissimo_delivery: number;
  mondial_relay_delivery: number;
  isarchived: number;
  isdraft: number;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  picture6: string;
  picture7: string;
  picture8: string;
  picture9: string;
  picture10: string;
  picture11: string;
  picture12: string;
  picture13: string;
  picture14: string;
  picture15: string;
  picture16: string;
  picture17: string;
  picture18: string;
  picture19: string;
}

interface Sport {
  id_sport: number;
  name: string;
}

interface Gender {
  id_gender: number;
  name: string;
}

interface Child {
  id_child: number;
  name: string;
}

interface Category {
  id_category: number;
  name: string;
}

interface Clothes {
  id_clothes: number;
  name: string;
}

interface Shoe {
  id_shoe: number;
  name: string;
}

interface Accessory {
  id_accessory: number;
  name: string;
}

interface Brand {
  id_brand: number;
  name: string;
}

interface Textile {
  id_textile: number;
  name: string;
}

interface Color {
  id_color: number;
  name: string;
}

interface Condition {
  id_condition: number;
  name: string;
}

interface Size {
  id_size: number;
  name: string;
}

interface Weight {
  id_weight: number;
  name: string;
}

const urlBack = import.meta.env.VITE_URL_BACK;

const OfferForm = () => {
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [genderList, setGenderList] = useState<Gender[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [clothesList, setClothesList] = useState<Clothes[]>([]);
  const [shoeList, setShoeList] = useState<Shoe[]>([]);
  const [accessoryList, setAccessoryList] = useState<Accessory[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [textileList, setTextileList] = useState<Textile[]>([]);
  const [colorList, setColorList] = useState<Color[]>([]);
  const [conditionList, setConditionList] = useState<Condition[]>([]);
  const [sizeList, setSizeList] = useState<Size[]>([]);
  const [weightList, setWeightList] = useState<Weight[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [gender, setGender] = useState('');
  const [child, setChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [clothes, setClothes] = useState<number | null>(null);
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [shoe, setShoe] = useState<number | null>(null);
  const [categoryIsShoe, setCategoryIsShoe] = useState(false);
  const [accessory, setAccessory] = useState<number | null>(null);
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
  const [offer, setOffer] = useState<Offer>();

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}/genders`).then((res) => setGenderList(res.data));
    axios.get(`${urlBack}/children`).then((res) => setChildList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}/clothes`).then((res) => setClothesList(res.data));
    axios.get(`${urlBack}/shoes`).then((res) => setShoeList(res.data));
    axios.get(`${urlBack}/accessories`).then((res) => setAccessoryList(res.data));
    axios.get(`${urlBack}/brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}/textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}/colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}/conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}/sizes`).then((res) => setSizeList(res.data));
    axios.get(`${urlBack}/weights`).then((res) => setWeightList(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer = {
      id_user_seller: 1,
      picture1: 'adresse interne de la photo',
      title,
      description,
      id_sport: parseInt(sport),
      id_gender: parseInt(gender),
      id_child: child ? Number(child) : null,
      id_category: parseInt(category),
      id_clothes: clothes ? Number(clothes) : null,
      id_shoe: shoe ? Number(shoe) : null,
      id_accessory: accessory ? Number(accessory) : null,
      id_brand: brand ? parseInt(brand) : null,
      id_textile: textile ? parseInt(textile) : null,
      id_size: size ? parseInt(size) : null,
      id_color1: color1 ? parseInt(color1) : null,
      id_color2: color2 ? parseInt(color2) : null,
      id_condition: parseInt(condition),
      price: Number(price),
      id_weight: parseInt(weight),
      hand_delivery: handDelivery,
      colissimo_delivery: 0,
      mondial_relay_delivery: 0,
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
    } as Offer;
    setOffer(newOffer);
  };

  useEffect(() => {
    offer &&
      axios.post<Offer>(`${urlBack}/offers`, offer).then((rep) => console.log(rep));
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
              onChange={(e) => setChild(Number(e.target.value))}
              value={child === null ? '' : child}
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

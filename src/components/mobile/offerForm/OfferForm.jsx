import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaRunning } from 'react-icons/fa';
import { FaWalking } from 'react-icons/fa';
import { IoFitness } from 'react-icons/io5';
import { MdDirectionsBike } from 'react-icons/md';

const OfferForm = () => {
  const [sportsList, setSportsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [textileList, setTextileList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [textile, setTextile] = useState('');
  const [condition, setCondition] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    axios.get('http://localhost:7000/sports').then((res) => setSportsList(res.data));
    axios
      .get('http://localhost:7000/categories')
      .then((res) => setCategoryList(res.data));
    axios.get('http://localhost:7000/brands').then((res) => setBrandList(res.data));
    axios.get('http://localhost:7000/textiles').then((res) => setTextileList(res.data));
    axios
      .get('http://localhost:7000/conditions')
      .then((res) => setConditionList(res.data));
    axios.get('http://localhost:7000/colors').then((res) => setColorList(res.data));
  }, []);

  return (
    <div className="offerForm">
      <form className="offerForm__form" action="">
        <div>
          {sportsList &&
            sportsList.map((sport, index) => <span key={index}>{sport.name}</span>)}
        </div>
        <div className="offerForm__sportIcons">
          <FaRunning className="offerForm__sportIcons__icon" />
          <MdDirectionsBike className="offerForm__sportIcons__icon" />
          <FaWalking className="offerForm__sportIcons__icon" />
          <IoFitness className="offerForm__sportIcons__icon" />
        </div>
        <div id="addPhotoContainer">
          <label id="labelPhoto1" htmlFor="photo1">
            <BsPlusLg /> AJOUTER PHOTOS
          </label>
          <input type="file" id="photo1" />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="title">
            Titre
          </label>
          <input className="offerForm__input" type="text" id="title" />
        </div>
        <div>
          <label className="offerForm__label" htmlFor="description">
            Description
          </label>
          <textarea className="offerForm__input" rows={5} id="description" />
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
            name="brand"
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
            onChange={(e) => setTextile(e.target.value)}
            value={textile}
            className="offerForm__select"
            name="textile"
            id="textiles">
            <option value="">Matière</option>
            {textileList &&
              textileList.map((textile, index) => (
                <option key={index} value={index + 1}>
                  {textile.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            className="offerForm__select"
            name="condition"
            id="conditions">
            <option value="">État</option>
            {conditionList &&
              conditionList.map((condition, index) => (
                <option key={index} value={index + 1}>
                  {condition.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className="offerForm__select"
            name="color"
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
      </form>
    </div>
  );
};

export default OfferForm;

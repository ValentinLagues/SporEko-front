import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

import IBrand from '../../../interfaces/IBrand';
import ICategory from '../../../interfaces/ICategory';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IItem from '../../../interfaces/IItem';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import ITextile from '../../../interfaces/ITextile';

const urlBack = import.meta.env.VITE_URL_BACK;

const FilterMenu = () => {
  const [sportList, setSportList] = useState<ISport[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [itemList, setItemList] = useState<IItem[]>([]);
  const [conditionList, setConditionList] = useState<ICondition[]>([]);
  const [textileList, setTextileList] = useState<ITextile[]>([]);
  const [colorList, setColorList] = useState<IColor[]>([]);
  const [brandList, setBrandList] = useState<IBrand[]>([]);
  const [sizeList, setSizeList] = useState<ISize[]>([]);

  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [itemInfos, setItemInfos] = useState<IItem>();
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [condition, setCondition] = useState('');
  const [textile, setTextile] = useState('');
  const [colorListShow, setColorListShow] = useState(false);
  const [color1, setColor1] = useState<number | null>(null);
  const [colorName, setColorName] = useState('');
  const [brand, setBrand] = useState('');
  const [showSizes, setShowSizes] = useState(false);
  const [size, setSize] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}/conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}/textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}/colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}/brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}/sizes`).then((res) => setSizeList(res.data));
  }, []);

  // if a category is chosen, itemList is 'filtered' by category
  //else itemList contains all items
  useEffect(() => {
    category
      ? axios.get(`${urlBack}/categories/${category}/items`).then((res) => {
          setItemList(res.data);
        })
      : axios.get(`${urlBack}/items`).then((res) => setItemList(res.data));
  }, [category]);

  //if category is clothes or shoes, or if item is a shoe or a clothes, sizeList is shown with appropriate sizes
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

  const handleReset = () => {
    setSport('');
    setGender(null);
    setGenderAdult(null);
    setGenderChild(null);
    setGenderIsChild(false);
    setCategory('');
    setItem('');
    setCategoryIsClothes(false);
    setCondition('');
    setTextile('');
    setColorListShow(false);
    setColor1(null);
    setColorName('');
    setBrand('');
    setSize('');
    setPrice(null);
    setOrderBy('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let filters = ``;
    let oneValue = false;

    if (sport) {
      filters += `?id_sport=${sport}`;
      oneValue = true;
    }
    if (gender) {
      filters += oneValue ? `&id_gender=${gender}` : `?id_gender=${gender}`;
      oneValue = true;
    }
    if (genderIsChild) {
      filters += oneValue ? `&ischild=${1}` : `?ischild=${1}`;
      oneValue = true;
    }
    if (category) {
      filters += oneValue ? `&id_category=${category}` : `?id_category=${category}`;
      oneValue = true;
    }
    if (item) {
      filters += oneValue ? `&id_item=${item}` : `?id_item=${item}`;
      oneValue = true;
    }
    if (condition) {
      filters += oneValue ? `&id_condition=${condition}` : `?id_condition=${condition}`;
      oneValue = true;
    }
    if (textile) {
      filters += oneValue ? `&id_textile=${textile}` : `?id_textile=${textile}`;
      oneValue = true;
    }
    if (color1) {
      filters += oneValue ? `&id_color1=${color1}` : `?id_color1=${color1}`;
      oneValue = true;
    }
    if (brand) {
      filters += oneValue ? `&id_brand=${brand}` : `?id_brand=${brand}`;
      oneValue = true;
    }
    if (size) {
      filters += oneValue ? `&id_size=${size}` : `?id_size=${size}`;
      oneValue = true;
    }
    if (price) {
      if (price === 100) {
        filters += oneValue ? `&minPrice=${price}` : `?minPrice=${price}`;
        oneValue = true;
      } else if (price > 50) {
        filters += oneValue
          ? `&minPrice=50&maxPrice=${price}`
          : `?&minPrice=50&maxPrice=${price}`;
        oneValue = true;
      } else {
        filters += oneValue
          ? `&minPrice=0&maxPrice=${price}`
          : `?&minPrice=0&maxPrice=${price}`;
        oneValue = true;
      }
    }
    if (orderBy) {
      const sort = orderBy;
      filters += oneValue ? `&sort=${sort}` : `?sort=${sort}`;
      oneValue = true;
    }
    axios.get(`${urlBack}/offers${filters}`).then((rep) => console.log(rep.data));
  };

  colorList &&
    colorList.map((color) => (color.style = { backgroundColor: color.color_code }));

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="filterMenu" id="filterMenuMobile">
      <div className="filterMenu__item">
        <h2>FILTRES</h2>
        <button onClick={() => handleReset()} id="resetBtn" type="reset">
          ANNULER FILTRES
        </button>
      </div>
      <div className="filterMenu__item">
        <label htmlFor="sports">Sport</label>
        <select
          onChange={(e) => setSport(e.target.value)}
          value={sport}
          className=""
          name="sports"
          id="sports">
          <option value="">Tous</option>
          {sportList &&
            sportList.map((sport, index) => (
              <option key={index} value={sport.id_sport}>
                {sport.name}
              </option>
            ))}
        </select>
      </div>
      <div className="filterMenu__item">
        <label htmlFor="genders">Genre</label>
        <select
          onChange={(e) => {
            setGenderAdult(Number(e.target.value));
            e.target.value === '4'
              ? (setGenderIsChild(true), setGender(null), setGenderChild(null))
              : (setGenderIsChild(false), setGender(Number(e.target.value)));
          }}
          value={Number(genderAdult)}
          name=""
          id="">
          <option value={''}>Tous</option>
          <option value={1}>Femme</option>
          <option value={2}>Homme</option>
          <option value={4}>Enfant</option>
        </select>
      </div>
      {genderIsChild && (
        <div className="filterMenu__item--right">
          <select
            onChange={(e) => {
              setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
            }}
            value={Number(genderChild)}
            name=""
            id="">
            <option value="">Tous</option>
            <option value={1}>Fille</option>
            <option value={2}>Garçon</option>
          </select>
        </div>
      )}
      <div className="filterMenu__item">
        <label htmlFor="categories">Catégorie</label>
        <select
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
          className=""
          name="categories"
          id="categories">
          <option value="">Toutes</option>
          {categoryList &&
            categoryList.map((category, index) => (
              <option key={index} value={category.id_category}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="filterMenu__item">
        <label htmlFor="items">Article</label>
        <select
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
          className=""
          name="items"
          id="items">
          <option value="">Tous</option>
          {itemList &&
            itemList.map((item, index) => (
              <option key={index} value={item.id_item}>
                {item.name}
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
      <div className="filterMenu__item">
        <label htmlFor="conditions">Etat</label>
        <select
          onChange={(e) => setCondition(e.target.value)}
          value={condition}
          className=""
          name="conditions"
          id="conditions">
          <option value="">Tous</option>
          {conditionList &&
            conditionList.map((condition, index) => (
              <option key={index} value={condition.id_condition}>
                {condition.name}
              </option>
            ))}
        </select>
      </div>
      <div
        onKeyPress={() => setColorListShow(!colorListShow)}
        role="button"
        tabIndex={0}
        className="filterMenu__item"
        onClick={() => setColorListShow(!colorListShow)}
        id="colors">
        <span>Couleur</span>
        <div className="iconChevronDownContainer">
          {color1 ? colorName : 'Toutes'}{' '}
          <HiChevronDown className="iconChevronDownContainer__icon" />
        </div>
        {colorListShow && (
          <div className="colorList">
            {colorList.map((color, index) => (
              <div
                onKeyPress={() => (setColor1(color.id_color), setColorName(color.name))}
                role="button"
                tabIndex={0}
                onClick={() => (setColor1(color.id_color), setColorName(color.name))}
                key={index}
                className="colorList__item">
                <div>{color.name}</div>
                <div className="colorList__item__colorShip" style={color.style}></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="filterMenu__item">
        <label htmlFor="textile">Marque</label>
        <select
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          className=""
          name="brands"
          id="brands">
          <option value="">Toutes</option>
          {brandList &&
            brandList.map((brand, index) => (
              <option key={index} value={brand.id_brand}>
                {brand.name}
              </option>
            ))}
        </select>
      </div>
      {showSizes && (
        <div className="filterMenu__item">
          <label htmlFor="textile">Taille</label>
          <select
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className=""
            name="sizes"
            id="sizes">
            <option value="">Toutes</option>
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
      <div className="filterMenu__item price">
        <div className="filterMenu__item price__label">
          <label htmlFor="price">Prix</label>
          <span className="priceText">
            {price
              ? price < 50
                ? `Moins de ${price}€`
                : price < 100
                ? `Entre 50 et ${price}€`
                : `Plus de ${price}€`
              : 'Tous'}
          </span>
        </div>
        <input
          type="range"
          value={Number(price)}
          onChange={(e) => {
            e.target.value === '0' ? setPrice(null) : setPrice(Number(e.target.value));
          }}
        />
      </div>
      <div className="filterMenu__item">
        <label htmlFor="orderBy">Classer par</label>
        <select
          onChange={(e) => setOrderBy(e.target.value)}
          value={orderBy}
          name="orderBy"
          id="orderBy">
          <option value="price ASC">prix croissant</option>
          <option value="price DESC">prix décroissant</option>
          <option value="">le plus récent</option>
          <option value="creation_date ASC">le moins récent</option>
        </select>
      </div>
      <div className="filterMenu__submitContainer">
        <button className="btn" type="submit">
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default FilterMenu;

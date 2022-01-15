import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface Sport {
  id_sport: number;
  name: string;
}

interface Category {
  id_category: number;
  name: string;
}

interface Item {
  id_item: number;
  name: string;
  id_category: number;
}

interface Condition {
  id_condition: number;
  name: string;
}

interface Textile {
  id_textile: number;
  name: string;
}

interface Color {
  id_color: number;
  name: string;
  color_code: string;
  style: object;
}

interface Brand {
  id_brand: number;
  name: string;
}

interface Size {
  id_size: number;
  name: string;
}

const urlBack = 'http://localhost:8000/';

const FilterMenu = () => {
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [conditionList, setConditionList] = useState<Condition[]>([]);
  const [textileList, setTextileList] = useState<Textile[]>([]);
  const [colorList, setColorList] = useState<Color[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [sizeList, setSizeList] = useState<Size[]>([]);

  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [condition, setCondition] = useState('');
  const [textile, setTextile] = useState('');
  const [colorListShow, setColorListShow] = useState(false);
  const [color1, setColor1] = useState<number | null>(null);
  const [colorName, setColorName] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    axios.get(`${urlBack}sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}items`).then((res) => setItemList(res.data));
    axios.get(`${urlBack}conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}sizes`).then((res) => setSizeList(res.data));
  }, []);

  useEffect(() => {
    category &&
      axios.get(`${urlBack}categories/${category}/items`).then((res) => {
        setItemList(res.data);
      });
  }, [category]);

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
      console.log(price);
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
    console.log(filters);
    axios.get(`${urlBack}offers${filters}`).then((rep) => console.log(rep.data));
  };

  colorList &&
    colorList.map((color) => (color.style = { backgroundColor: color.color_code }));

  console.log(category);
  console.log(typeof category);

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
              ? (setGenderIsChild(true), setGender(null))
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
            setCategory(e.target.value);
            e.target.value === '1'
              ? setCategoryIsClothes(true)
              : setCategoryIsClothes(false);
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
          onChange={(e) => setItem(e.target.value)}
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
                {size.name}
              </option>
            ))}
        </select>
      </div>
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

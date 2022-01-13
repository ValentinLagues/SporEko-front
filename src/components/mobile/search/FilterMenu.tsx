import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

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
  const [genderList, setGenderList] = useState<Gender[]>([]);
  const [childList, setChildList] = useState<Child[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [clothesList, setClothesList] = useState<Clothes[]>([]);
  const [shoeList, setShoeList] = useState<Shoe[]>([]);
  const [accessoryList, setAccessoryList] = useState<Accessory[]>([]);
  const [conditionList, setConditionList] = useState<Condition[]>([]);
  const [textileList, setTextileList] = useState<Textile[]>([]);
  const [colorList, setColorList] = useState<Color[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [sizeList, setSizeList] = useState<Size[]>([]);

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
    axios.get(`${urlBack}genders`).then((res) => setGenderList(res.data));
    axios.get(`${urlBack}children`).then((res) => setChildList(res.data));
    axios.get(`${urlBack}categories`).then((res) => setCategoryList(res.data));
    axios.get(`${urlBack}clothes`).then((res) => setClothesList(res.data));
    axios.get(`${urlBack}shoes`).then((res) => setShoeList(res.data));
    axios.get(`${urlBack}accessories`).then((res) => setAccessoryList(res.data));
    axios.get(`${urlBack}conditions`).then((res) => setConditionList(res.data));
    axios.get(`${urlBack}textiles`).then((res) => setTextileList(res.data));
    axios.get(`${urlBack}colors`).then((res) => setColorList(res.data));
    axios.get(`${urlBack}brands`).then((res) => setBrandList(res.data));
    axios.get(`${urlBack}sizes`).then((res) => setSizeList(res.data));
  }, []);

  const handleReset = () => {
    setSport('');
    setGender('');
    setChild(null);
    setGenderIsChild(false);
    setCategory('');
    setClothes(null);
    setCategoryIsClothes(false);
    setShoe(null);
    setCategoryIsShoe(false);
    setAccessory(null);
    setCategoryIsAccessory(false);
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
    if (child) {
      filters += oneValue ? `&id_child=${child}` : `?id_child=${child}`;
      oneValue = true;
    }
    if (category) {
      filters += oneValue ? `&id_category=${category}` : `?id_category=${category}`;
      oneValue = true;
    }
    if (clothes) {
      filters += oneValue ? `&id_clothes=${clothes}` : `?id_clothes=${clothes}`;
      oneValue = true;
    }
    if (shoe) {
      filters += oneValue ? `&id_shoe=${shoe}` : `?id_shoe=${shoe}`;
      oneValue = true;
    }
    if (accessory) {
      filters += oneValue ? `&id_accessory=${accessory}` : `?id_accessory=${accessory}`;
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
      } else {
        filters += oneValue
          ? `&minPrice=${0}&maxPrice=${price}`
          : `?0=${0}&maxPrice=${price}`;
        oneValue = true;
      }

      // const prices = price.split(' ');
      // const minPrice = prices[0];
      // const maxPrice = prices[1];
      // if (maxPrice === '+') {
      //   filters += oneValue ? `&minPrice=${minPrice}` : `?minPrice=${minPrice}`;
      //   oneValue = true;
      // } else {
      //   filters += oneValue
      //     ? `&minPrice=${minPrice}&maxPrice=${maxPrice}`
      //     : `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
      //   oneValue = true;
      // }
    }
    if (orderBy) {
      const sort = orderBy;
      filters += oneValue ? `&sort=${sort}` : `?sort=${sort}`;
      oneValue = true;
    }
    axios.get(`${urlBack}offers${filters}`).then((rep) => console.log(rep.data));
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
            setGender(e.target.value);
            e.target.value === '3'
              ? (setGenderIsChild(true), setChild(1))
              : setGenderIsChild(false);
          }}
          value={gender}
          className=""
          name="genders"
          id="genders">
          {genderList &&
            genderList.map((gender, index) => (
              <option key={index} value={gender.id_gender}>
                {gender.name}
              </option>
            ))}
        </select>
      </div>
      {genderIsChild && (
        <div className="filterMenu__item--right">
          <select
            onChange={(e) => setChild(Number(e.target.value))}
            value={child === null ? '' : child}
            className=""
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
      <div className="filterMenu__item">
        <label htmlFor="categories">Catégorie</label>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
            e.target.value === '1'
              ? (setCategoryIsClothes(true), setClothes(1))
              : setCategoryIsClothes(false);
            e.target.value === '2'
              ? (setCategoryIsShoe(true), setShoe(1))
              : setCategoryIsShoe(false);
            e.target.value === '3'
              ? (setCategoryIsAccessory(true), setAccessory(1))
              : setCategoryIsAccessory(false);
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
      {categoryIsClothes && (
        <>
          <div className="filterMenu__item--right">
            <select
              onChange={(e) => setClothes(Number(e.target.value))}
              value={clothes === null ? '' : clothes}
              className=""
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
        </>
      )}
      {categoryIsShoe && (
        <div className="filterMenu__item--right">
          <select
            onChange={(e) => setShoe(Number(e.target.value))}
            value={shoe === null ? '' : shoe}
            className=""
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
        <div className="filterMenu__item--right">
          <select
            onChange={(e) => setAccessory(Number(e.target.value))}
            value={accessory === null ? '' : accessory}
            className=""
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
            {price ? (price < 100 ? `Moins de ${price}€` : `Plus de ${price}€`) : 'Tous'}
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

import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

import IBrand from '../../../interfaces/IBrand';
import ICategory from '../../../interfaces/ICategory';
import IColor from '../../../interfaces/IColor';
import ICondition from '../../../interfaces/ICondition';
import IItem from '../../../interfaces/IItem';
import ISize from '../../../interfaces/ISize';
import ISport from '../../../interfaces/ISport';
import ITextile from '../../../interfaces/ITextile';

interface Props {
  itemInfos: IItem | undefined;
  categoryIsClothes: boolean;
  setCategoryIsClothes: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  showSizes: boolean;
  setShowSizes: React.Dispatch<React.SetStateAction<boolean>>;
  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
  textile: string;
  setTextile: React.Dispatch<React.SetStateAction<string>>;
  color1: number;
  setColor1: React.Dispatch<React.SetStateAction<number>>;
  colorName: string;
  setColorName: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  colors: IColor[];
  showColors: boolean;
  setShowColors: React.Dispatch<React.SetStateAction<boolean>>;
  conditions: ICondition[];
  brands: IBrand[];
  sizes: ISize[];
  textiles: ITextile[];
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sport: string;
  setSport: React.Dispatch<React.SetStateAction<string>>;
  genderIsChild: boolean;
  setGenderIsChild: React.Dispatch<React.SetStateAction<boolean>>;
  genderAdult: number;
  setGenderAdult: React.Dispatch<React.SetStateAction<number>>;
  genderChild: number;
  setGenderChild: React.Dispatch<React.SetStateAction<number>>;
  setGender: React.Dispatch<React.SetStateAction<number>>;
  categories: ICategory[];
  items: IItem[];
  sports: ISport[];
  handleSubmit: () => void;
  handleItemSelected: (_e: string) => void;
  handleReset: () => void;
}

const FilterMenu: React.FC<Props> = ({
  item,
  setItem,
  itemInfos,
  category,
  setCategory,
  categoryIsClothes,
  setCategoryIsClothes,
  sport,
  setSport,
  price,
  setPrice,
  size,
  setSize,
  showSizes,
  setShowSizes,
  brand,
  setBrand,
  condition,
  setCondition,
  textile,
  setTextile,
  color1,
  setColor1,
  colorName,
  setColorName,
  orderBy,
  setOrderBy,
  genderIsChild,
  setGenderIsChild,
  genderAdult,
  setGenderAdult,
  genderChild,
  setGenderChild,
  setGender,
  categories,
  colors,
  showColors,
  setShowColors,
  conditions,
  brands,
  sizes,
  textiles,
  items,
  sports,
  handleReset,
  handleSubmit,
  handleItemSelected,
}) => {
  colors && colors.map((color) => (color.style = { backgroundColor: color.color_code }));

  return (
    <form onSubmit={() => handleSubmit()} className="filterMenu" id="filterMenuMobile">
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
          {sports &&
            sports.map((sport, index) => (
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
              ? (setGenderIsChild(true), setGender(0), setGenderChild(0))
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
          {categories &&
            categories.map((category, index) => (
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
          className="filterMenu__itemList"
          name="items"
          id="items">
          <option value="">Tous</option>
          {items &&
            items.map((item, index) => (
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
            {textiles &&
              textiles.map((textile, index) => (
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
          {conditions &&
            conditions.map((condition, index) => (
              <option key={index} value={condition.id_condition}>
                {condition.name}
              </option>
            ))}
        </select>
      </div>
      <div
        onKeyPress={() => setShowColors(!showColors)}
        role="button"
        tabIndex={0}
        className="filterMenu__item"
        onClick={() => setShowColors(!showColors)}
        id="colors">
        <span>Couleur</span>
        <div className="iconChevronDownContainer">
          {color1 ? colorName : 'Toutes'}{' '}
          <HiChevronDown className="iconChevronDownContainer__icon" />
        </div>
        {showColors && (
          <div className="colorList">
            {colors.map((color, index) => (
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
          {brands &&
            brands.map((brand, index) => (
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
            {sizes &&
              sizes.map((size, index) => (
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
            e.target.value === '0' ? setPrice(0) : setPrice(Number(e.target.value));
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

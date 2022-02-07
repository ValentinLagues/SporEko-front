import React from 'react';

import ICategory from '../../../interfaces/ICategory';
import IItem from '../../../interfaces/IItem';
import ISport from '../../../interfaces/ISport';

interface Props {
  hideFilters: boolean;
  setHideFilters: React.Dispatch<React.SetStateAction<boolean>>;
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
}

const Search: React.FC<Props> = ({
  hideFilters,
  setHideFilters,
  item,
  setItem,
  category,
  setCategory,
  sport,
  setSport,
  genderIsChild,
  setGenderIsChild,
  genderAdult,
  setGenderAdult,
  genderChild,
  setGenderChild,
  setGender,
  categories,
  items,
  sports,
  handleSubmit,
  handleItemSelected,
}) => {
  return (
    <div className="search">
      <form onSubmit={() => handleSubmit()} className="search__menu">
        <div className="search__menu__item">
          <label htmlFor="sports">Quel sport recherchez-vous ?</label>
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="search__menu__item__select"
            name="sports"
          >
            <option value="">Tous</option>
            {sports &&
              sports.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div className="search__menu__item">
          <label htmlFor="genders">Genre</label>
          <select
            onChange={(e) => {
              setGenderAdult(Number(e.target.value));
              e.target.value === '4'
                ? (setGenderIsChild(true), setGender(0))
                : (setGenderIsChild(false), setGender(Number(e.target.value)));
            }}
            value={Number(genderAdult)}
            className="search__menu__item__select"
            id=""
          >
            <option value={''}>Tous</option>
            <option value={1}>Femme</option>
            <option value={2}>Homme</option>
            <option value={4}>Enfant</option>
          </select>
        </div>
        {genderIsChild && (
          <div className="search__menu__item">
            <select
              onChange={(e) => {
                setGenderChild(Number(e.target.value)), setGender(Number(e.target.value));
              }}
              value={Number(genderChild)}
              className="search__menu__item__select"
              id=""
            >
              <option value="">Tous</option>
              <option value={1}>Fille</option>
              <option value={2}>Garçon</option>
            </select>
          </div>
        )}
        <div className="search__menu__item">
          <label htmlFor="categories">Catégories</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            className="search__menu__item__select"
            name="categories"
            id="categories"
          >
            <option value="">Toutes</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="search__menu__item">
          <label htmlFor="items">Articles</label>
          <select
            onChange={(e) => {
              handleItemSelected(e.target.value);
              setItem(e.target.value);
            }}
            value={item}
            className="search__menu__item__select"
            name="items"
            id="items"
          >
            <option value="">Tous</option>
            {items &&
              items.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </form>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setHideFilters(!hideFilters);
          handleSubmit();
        }}
      >
        Rechercher
      </button>
    </div>
  );
};

export default Search;

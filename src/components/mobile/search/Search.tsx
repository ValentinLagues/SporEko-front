import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Sport {
  id_sport: number;
  name: string;
}

interface Category {
  id_category: number;
  name: string;
}

const urlBack = import.meta.env.VITE_URL_BACK;

const Search = () => {
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [sport, setSport] = useState('');
  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryIsClothes, setCategoryIsClothes] = useState(false);
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoryList(res.data));
  }, []);

  const handleReset = () => {
    setSport('');
    setGender(null);
    setGenderAdult(null);
    setGenderChild(null);
    setGenderIsChild(false);
    setCategory('');
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
    axios.get(`${urlBack}/offers${filters}`).then((rep) => console.log(rep.data));
  };

  return (
    <div>
      <form>
        <input className="btn" type="text" placeholder="Recherchez sur SPOREKO" />
      </form>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="filterMenu"
        id="filterMenuMobile">
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
    </div>
  );
};

export default Search;

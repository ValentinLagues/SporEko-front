import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgGenderFemale, CgGenderMale, CgGym } from 'react-icons/cg';
import { FcSportsMode } from 'react-icons/fc';
import { GiClothes, GiRunningShoe, GiTennisRacket } from 'react-icons/gi';

import IItem from '../../../interfaces/IItem';
import IOffer from '../../../interfaces/IOffer';
import AllOffers from '../allOffers/AllOffers';
import SearchBar from './SearchBar';
import FilterMenu from './FilterMenu';

interface Sport {
  id_sport: number;
  name: string;
}

interface Category {
  id_category: number;
  name: string;
}

const urlBack = import.meta.env.VITE_URL_BACK;

type Props = {setAllOffers : () => {}}

const Search : React.FC<Props> = ({setAllOffers}) => {
  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [itemsList, setItemsList] = useState<IItem[]>([]);

  const [gender, setGender] = useState<number | null>(null);
  const [genderAdult, setGenderAdult] = useState<number | null>(null);
  const [genderChild, setGenderChild] = useState<number | null>(null);
  const [genderIsChild, setGenderIsChild] = useState(false);
  const [sport, setSport] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [itemInfos, setItemInfos] = useState<IItem>();
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${urlBack}/sports`).then((res) => setSportsList(res.data));
    axios.get(`${urlBack}/categories`).then((res) => setCategoriesList(res.data));
  }, []);

  useEffect(() => {
    category
      ? axios.get(`${urlBack}/categories/${category}/items`).then((res) => {
          setItemsList(res.data);
        })
      : axios.get(`${urlBack}/items`).then((res) => setItemsList(res.data));
  }, [category]);

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
    axios.get(`${urlBack}/offers${filters}`).then((rep) => setAllOffers(rep.data));

    const search = document.getElementById('filterMenu')
    search?.classList.add('invisible')
  };

  const handleItemSelected = (id: string) => {
    axios.get(`${urlBack}/items/${id}`).then((item) => {
      setItemInfos(item.data);
      return item.data;
    });
  };

  return (
    <div className="search" >
      <SearchBar setShowFilterMenu={setShowFilterMenu} showFilterMenu={showFilterMenu}/>
      { showFilterMenu &&
      <FilterMenu setAllOffers={setAllOffers} setShowFilterMenu={setShowFilterMenu}/>
      }
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="search__menu"
        id="filterMenu">
        <div
          // filtre sports
          className="search__menu__item">
          <label htmlFor="sports">
            <FcSportsMode /> Quel sport recherchez-vous ? <FcSportsMode />
          </label>
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className=""
            name="sports"
            id="sports">
            <option value="">Tous</option>
            {sportsList &&
              sportsList.map((sport, index) => (
                <option key={index} value={sport.id_sport}>
                  {sport.name}
                </option>
              ))}
          </select>
        </div>
        <div
          // filtre genre
          className="search__menu__item">
          <label htmlFor="genders">
            <CgGenderMale /> Genre <CgGenderFemale />
          </label>
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
          <div
            // filtre genre enfants
            className="search__menu__item--right">
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
        <div
          // filtre categories
          className="search__menu__item">
          <label htmlFor="categories">
            <GiClothes /> Catégorie <GiRunningShoe />
          </label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            className=""
            name="categories"
            id="categories">
            <option value="">Toutes</option>
            {categoriesList &&
              categoriesList.map((category, index) => (
                <option key={index} value={category.id_category}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div
          // filtre articles
          className="search__menu__item">
          <label htmlFor="items">
            <CgGym /> Articles <GiTennisRacket />
          </label>
          <select
            onChange={(e) => {
              handleItemSelected(e.target.value);
              setItem(e.target.value);
            }}
            value={item}
            className=""
            name="items"
            id="items">
            <option value="">Tous</option>
            {itemsList &&
              itemsList.map((item, index) => (
                <option key={index} value={item.id_item}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* <button
          className=""
          onClick={
            search !== '' &&
            offersList.filter((searchResults) =>
              console.log(searchResults.title.includes({ search })),
            )
          }>
          Recherche
        </button> */}
        <button type='button' className='btn' onClick={(e) => handleSubmit(e)}>Rechercher</button>
      </form>
    </div>
  );
};

export default Search;

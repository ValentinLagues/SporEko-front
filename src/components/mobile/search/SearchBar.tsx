import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IoFilter } from 'react-icons/io5';
import CurrentOfferContext from '../../../contexts/Offer';

const urlBack = import.meta.env.VITE_URL_BACK;

const SearchBar = ({ setShowFilterMenu, showFilterMenu }) => {
  const { title } = useContext(CurrentOfferContext);
  const [search, setSearch] = useState('');
  console.log(search);

  useEffect(() => {
    axios.get(`${urlBack}/offers/${title}`).then((res) => setSearch(res.data));
  }, []);

  return (
    <div>
      <form className="search__bar">
        <input
          className="btn"
          type="text"
          placeholder="Entrez votre recherche"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoFilter
          className="filterIcon"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          size={30}
        />
      </form>
    </div>
  );
};

export default SearchBar;

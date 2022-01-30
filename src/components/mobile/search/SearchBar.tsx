import React, { useState } from 'react';
import { IoFilter } from 'react-icons/io5';

const SearchBar = ({ setShowFilterMenu, showFilterMenu }) => {
  const [search, setSearch] = useState('');
  console.log(search);

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

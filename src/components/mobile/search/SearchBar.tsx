import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
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
      </form>
    </div>
  );
};

export default SearchBar;

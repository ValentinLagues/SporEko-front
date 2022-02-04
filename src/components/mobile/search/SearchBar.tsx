import React from 'react';
import { IoFilter } from 'react-icons/io5';

interface Props {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ setShowFilterMenu, showFilterMenu, setSearch }) => {
  return (
    <div>
      <form className="search__bar">
        <input
          className="btn"
          type="text"
          placeholder="Entrez votre recherche"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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

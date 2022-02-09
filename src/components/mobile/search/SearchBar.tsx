import React from 'react';
import { IoFilter } from 'react-icons/io5';

interface Props {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const SearchBar: React.FC<Props> = ({   handleSubmit, setShowFilterMenu, showFilterMenu, setSearch }) => {
  return (
    <div>
      <form className="search__bar" onSubmit={(e) => {
        e.preventDefault()
          handleSubmit();
        }}>
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

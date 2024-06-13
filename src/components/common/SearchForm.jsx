import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function SearchForm({ searchKeyword, onSearch, resetSearch }) {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    resetSearch();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center border-2 rounded-xl px-1"
    >
      <button type="submit" className="p-2 rounded-lg bg-card1">
        <FaSearch className="text-white" />
      </button>
      <input
        type="text"
        value={searchKeyword}
        onChange={onSearch}
        placeholder="Search Word..."
        className="bg-card1 text-text p-2 rounded-lg focus:outline-none max-w-[90%] md:max-w-full"
      />
    </form>
  );
}

SearchForm.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

export default SearchForm;

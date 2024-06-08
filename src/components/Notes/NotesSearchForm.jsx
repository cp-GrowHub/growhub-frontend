import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function NotesSearchForm({ searchKeyword, onSearch, resetSearch }) {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(searchKeyword); // placeholder
    resetSearch();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center border-2 rounded-xl px-1"
    >
      <button type="submit" className="ml-2 p-2 rounded-lg bg-card1">
        <FaSearch className="text-white" />
      </button>
      <input
        type="text"
        value={searchKeyword}
        onChange={onSearch}
        placeholder="Search Word..."
        className="bg-card1 text-text p-2 rounded-lg focus:outline-none"
      />
    </form>
  );
}

NotesSearchForm.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

export default NotesSearchForm;

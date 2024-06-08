import React from 'react';
import { FaSearch } from 'react-icons/fa';
import useInput from '../../hooks/useInput';

function NotesSearchForm() {
  const [search, onSearchHandler, resetSearch] = useInput('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(search); // placeholder
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
        value={search}
        onChange={onSearchHandler}
        placeholder="Search Word..."
        className="bg-card1 text-text p-2 rounded-lg focus:outline-none"
      />
    </form>
  );
}

export default NotesSearchForm;

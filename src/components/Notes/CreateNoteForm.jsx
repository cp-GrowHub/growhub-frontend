import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function CreateNoteForm({ onSubmit }) {
  const [title, handleTitleChange, resetTitle] = useInput('');
  const [body, handleBodyChange, resetBody] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, body);
    resetTitle();
    resetBody();
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 px-32 flex flex-col gap-4 ">
      <div>
        <label htmlFor="noteTitle" className="flex flex-col">
          Note Title
          <input
            type="text"
            id="noteTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl"
          />
        </label>
      </div>
      <div>
        <label htmlFor="noteBody" className="flex flex-col">
          Note Body
          <textarea
            id="noteBody"
            value={body}
            onChange={handleBodyChange}
            className="text-text h-52 bg-card1"
          />
        </label>
      </div>
      <button type="submit" className="bg-text text-bekgron p-2 rounded-3xl">
        Create new note
      </button>
    </form>
  );
}

CreateNoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

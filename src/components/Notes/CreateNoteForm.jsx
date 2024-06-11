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
      <div className=' flex flex-col'>
          <label htmlFor="noteTitle" className="flex flex-col">Note Title</label>
          <input
            type="text"
            id="noteTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl outline-none px-4 py-2 rounded-xl"
          />
      </div>
      <div className=' flex flex-col'>
        <label htmlFor="noteBody" className="flex flex-col">Note Body</label>
          <textarea
            id="noteBody"
            value={body}
            onChange={handleBodyChange}
            className="text-text h-52 bg-card2 px-4 py-2 outline-none rounded-xl"
          />
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

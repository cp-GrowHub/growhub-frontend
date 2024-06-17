import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function CreateNoteForm({ onSubmit }) {
  const [title, handleTitleChange, resetTitle] = useInput('');
  const bodyRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyHTML = bodyRef.current.innerHTML;
    onSubmit(title, bodyHTML);
    resetTitle();
    bodyRef.current.innerHTML = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 px-32 flex flex-col gap-4 ">
      <div className=" flex flex-col">
        <label htmlFor="noteTitle" className="flex flex-col">
          Note Title
          <input
            type="text"
            id="noteTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl outline-none px-4 py-2 rounded-xl"
          />
        </label>
      </div>
      <div className=" flex flex-col">
        <div id="noteBodyLabel" className="flex flex-col">
          Note Body
        </div>
        <div
          aria-labelledby="noteBodyLabel"
          id="noteBody"
          ref={bodyRef}
          contentEditable
          className="text-text bg-card2 px-4 py-2 outline-none rounded-xl overflow-y-auto"
          style={{
            minHeight: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
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

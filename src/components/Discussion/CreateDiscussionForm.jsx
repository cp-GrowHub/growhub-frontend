import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function CreateDiscussionForm({ onSubmit }) {
  const [title, handleTitleChange, resetTitle] = useInput('', 60);
  const [tags, handleTagsChange, resetTags] = useInput('');
  const bodyRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags
      .trim()
      .split(' ')
      .filter((tag) => tag);
    const bodyHTML = bodyRef.current.innerHTML.trim(); // Trim whitespace
    if (!title || !bodyHTML || !tags) {
      alert('Title, Tag, and Body are required');
      return;
    }
    onSubmit(title, tagsArray, bodyHTML);
    resetTitle();
    resetTags();
    bodyRef.current.innerHTML = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:p-10 md:px-32 flex flex-col md:gap-4 gap-2"
    >
      <div className=" flex flex-col">
        <label htmlFor="discussionTitle" className="flex flex-col">
          Discussion Title
          <input
            type="text"
            id="discussionTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl px-4 py-2 rounded-xl outline-none"
            maxLength="60"
          />
          <span>{60 - title.length} characters remaining</span>
        </label>
      </div>
      <div className=" flex flex-col">
        <label htmlFor="discussionTags" className="flex flex-col">
          Discussion Category (tags)
          <input
            type="text"
            id="discussionTags"
            value={tags}
            onChange={handleTagsChange}
            className="text-text bg-card2 text-xl px-4 py-2 rounded-xl outline-none"
          />
        </label>
      </div>
      <div>
        <div id="discussionBodyLabel" className="flex flex-col">
          Discussion Body
        </div>
        <div
          aria-labelledby="discussionBodyLabel"
          id="discussionBody"
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
        Create new discussion
      </button>
    </form>
  );
}

CreateDiscussionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

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
    const bodyHTML = bodyRef.current.innerHTML;
    onSubmit(title, tagsArray, bodyHTML);
    resetTitle();
    resetTags();
    bodyRef.current.innerHTML = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 px-32 flex flex-col gap-4 ">
      <div>
        <label htmlFor="discussionTitle" className="flex flex-col">
          Discussion Title
          <input
            type="text"
            id="discussionTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl"
            maxLength="60"
          />
          <span>{60 - title.length} characters remaining</span>
        </label>
      </div>
      <div>
        <label htmlFor="discussionTags" className="flex flex-col">
          Discussion Category (tags)
          <input
            type="text"
            id="discussionTags"
            value={tags}
            onChange={handleTagsChange}
            className="text-text bg-card2 text-xl"
          />
        </label>
      </div>
      <div>
        <div id="discussionBodyLabel" className="flex flex-col">
          Discussion Body
          <div
            aria-labelledby="discussionBodyLabel"
            id="discussionBody"
            ref={bodyRef}
            contentEditable
            className="text-text h-52 bg-card1 p-2 rounded"
            style={{ minHeight: '200px', border: '1px solid #ccc' }}
          />
        </div>
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

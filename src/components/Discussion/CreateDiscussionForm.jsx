import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function CreateDiscussionForm({ onSubmit }) {
  const [title, handleTitleChange, resetTitle] = useInput('');
  const [tags, handleTagsChange, resetTags] = useInput('');
  const [body, handleBodyChange, resetBody] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags
      .trim()
      .split(' ')
      .filter((tag) => tag);
    onSubmit(title, tagsArray, body);
    resetTitle();
    resetTags();
    resetBody();
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
          />
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
        <label htmlFor="discussionBody" className="flex flex-col">
          Discussion Body
          <textarea
            id="discussionBody"
            value={body}
            onChange={handleBodyChange}
            className="text-text h-52 bg-card1"
          />
        </label>
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

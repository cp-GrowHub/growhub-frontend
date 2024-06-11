import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

export default function CreateBlogForm({ onSubmit }) {
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
      <div className=' flex flex-col'>
        <label htmlFor="blogTitle" className="flex flex-col">Blog Title</label>
        <input
            type="text"
            id="blogTitle"
            value={title}
            onChange={handleTitleChange}
            className="text-text bg-card2 text-xl outline-none px-4 py-2 rounded-xl"
            maxLength="60"
        />
        <span>{60 - title.length} characters remaining</span>
      </div>
      <div className=' flex flex-col'>
        <label htmlFor="blogTags" className="flex flex-col">Blog Category (tags)</label>
          <input
            type="text"
            id="blogTags"
            value={tags}
            onChange={handleTagsChange}
            className="text-text bg-card2 text-xl px-4 py-2 rounded-xl outline-none"
          />
      </div>
      <div>
        <div id="blogBodyLabel" className="flex flex-col">Blog Content</div>
          <div
            aria-labelledby="blogBodyLabel"
            id="discussionBody"
            ref={bodyRef}
            contentEditable
            className="text-text h-52 bg-card2 px-4 py-2 rounded-xl outline-none"
            style={{ minHeight: '200px' }}
          />
      </div>
      <button type="submit" className="bg-text text-bekgron p-2 rounded-3xl">
        Create new discussion
      </button>
    </form>
  );
}

CreateBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

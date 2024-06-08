import React from 'react';
import PropTypes from 'prop-types';

function NotesItemCard({ title, content, date }) {
  return (
    <div className="bg-card1 text-text px-6 py-4 mb-2 rounded-lg cursor-pointer">
      <p className="text-sm text-gray-400">{date}</p>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm">
        {content.length > 100 ? `${content.substring(0, 100)}...` : content}
      </p>
    </div>
  );
}

NotesItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NotesItemCard;

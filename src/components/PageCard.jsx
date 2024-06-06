import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function PageCard({ to, title, color, content }) {
  const backgroundColorClass = `bg-${color}`;

  return (
    <NavLink
      to={to}
      className={`p-4 rounded-3xl shadow-md flex flex-col justify-between text-text hover:bg-opacity-80 ${backgroundColorClass}`}
    >
      <div className="flex flex-col items-start p-4">
        <h2 className="pt-6 text-2xl font-semibold">{title}</h2>
        <p className="mt-2">{content}</p>
      </div>
    </NavLink>
  );
}

PageCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  content: PropTypes.string,
};

PageCard.defaultProps = {
  color: 'card4', // Default color class
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // Default content
};

export default PageCard;

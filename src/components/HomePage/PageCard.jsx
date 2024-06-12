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
      <div className="flex flex-col items-start p-2 md:p-4 h-full">
        <h2 className="pt-2 md:pt-6 text-xl lg:text-2xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm lg:text-base">{content}</p>
      </div>
    </NavLink>
  );
}

PageCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PageCard;

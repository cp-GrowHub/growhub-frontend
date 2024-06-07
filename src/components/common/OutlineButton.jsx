import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OutlineButton({
  type = 'button',
  text,
  to,
  href,
  isActive,
  ...props
}) {
  const buttonClassName = `w-full px-4 py-2 border-2 text-text rounded-md focus:outline-none ${
    isActive ? 'bg-text text-bekgron' : 'border-text hover:bg-card4'
  }`;

  if (to) {
    return (
      <Link to={to} className="block">
        <button type={type} className={buttonClassName} {...props}>
          {text}
        </button>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-max"
      >
        <button type={type} className={buttonClassName} {...props}>
          {text}
        </button>
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...props}>
      {text}
    </button>
  );
}

OutlineButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OutlineButton;

import React from 'react';
import PropTypes from 'prop-types';

function OutlineButton({ type = 'button', text, to, href, ...props }) {
  const buttonClassName =
    'w-full px-4 py-2 border-2 border-text text-text rounded-md hover:bg-card4 focus:outline-none';

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
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default OutlineButton;

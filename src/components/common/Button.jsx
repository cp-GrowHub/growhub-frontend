import React from 'react';
import PropTypes from 'prop-types';

function Button({ type = 'button', text, onClick }) {
  return (
    <button
      type={type}
      className="w-full px-4 py-2 mt-4 text-text border border-white font-bold rounded-md hover:bg-card4 focus:outline-none focus:bg-card4"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;

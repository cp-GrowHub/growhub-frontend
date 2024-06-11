import React from 'react';
import PropTypes from 'prop-types';

function FormInput({ label, type = 'text', id, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-text">
        {label}
        <input
          id={id}
          type={type}
          className="w-full px-4 py-2 mt-2 text-white bg-card2 rounded-md focus:outline-none focus:ring-1 focus:ring-card4"
          {...props}
        />
      </label>
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default FormInput;

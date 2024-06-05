import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormInput({ label, type = 'text', id, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-text">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-4 py-2 mt-2 border border-card4 rounded-md focus:outline-none focus:ring-1 focus:ring-card4"
        {...props}
      />
    </div>
  );
}
/* eslint-enable react/jsx-props-no-spreading */

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default FormInput;

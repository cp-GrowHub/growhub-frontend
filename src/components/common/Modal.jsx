import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({
  text,
  isVisible,
  onClose,
  color = 'bg-green-500',
}) {
  useEffect(() => {
    let timer = null;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-5 right-0 ${color} text-white px-4 py-2 rounded transition-transform transform ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {text}
    </div>
  );
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  color: PropTypes.string,
};

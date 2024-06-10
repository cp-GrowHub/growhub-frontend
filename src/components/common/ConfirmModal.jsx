import React from 'react';
import PropTypes from 'prop-types';

function ConfirmModal({ isVisible, message, onClose, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-text p-8 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Confirmation</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="py-2 px-4 bg-card4 text-text rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-green-500 text-bekgron rounded-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;

import React from 'react';
import PropTypes from 'prop-types';

export default function ConfirmDeleteModal({ isVisible, onCancel, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-text p-8 rounded-lg shadow-lg text-bekgron">
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="py-2 px-4 bg-card4 text-text rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-text rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDeleteModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

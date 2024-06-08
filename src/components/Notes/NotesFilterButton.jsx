import React from 'react';
import PropTypes from 'prop-types';
import OutlineButton from '../common/OutlineButton';

function NotesFilterButton({ currentFilter, setFilter }) {
  return (
    <div className="flex flex-row gap-4">
      <OutlineButton
        text="Archived"
        onClick={() => setFilter('Archived')}
        isActive={currentFilter === 'Archived'}
      />
      <OutlineButton
        text="Unarchived"
        onClick={() => setFilter('Unarchived')}
        isActive={currentFilter === 'Unarchived'}
      />
    </div>
  );
}

NotesFilterButton.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default NotesFilterButton;

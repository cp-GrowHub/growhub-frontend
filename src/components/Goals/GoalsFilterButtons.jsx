import React from 'react';
import PropTypes from 'prop-types';
import OutlineButton from '../common/OutlineButton';

function GoalsFilterButtons({ currentFilter, setFilter }) {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-2 sm:gap-4">
      <OutlineButton
        text="Show All"
        onClick={() => setFilter('all')}
        isActive={currentFilter === 'all'}
      />
      <OutlineButton
        text="Completed"
        onClick={() => setFilter('completed')}
        isActive={currentFilter === 'completed'}
      />
      <OutlineButton
        text="Uncompleted"
        onClick={() => setFilter('uncompleted')}
        isActive={currentFilter === 'uncompleted'}
      />
      <OutlineButton
        text="Expired"
        onClick={() => setFilter('expired')}
        isActive={currentFilter === 'expired'}
      />
    </div>
  );
}

GoalsFilterButtons.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default GoalsFilterButtons;

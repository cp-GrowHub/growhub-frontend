import React from 'react';
import PropTypes from 'prop-types';

function ToDoListCard({ todo, onToggle, onStatusChange }) {
  const priorityLabel = todo.highPriority
    ? 'High Priority'
    : todo.priority
      ? 'Priority'
      : '';

  const handleChange = (event) => {
    onToggle();
    onStatusChange(todo.name, event.target.checked);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-card4 bg-card1 rounded-lg">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.finished}
          onChange={handleChange}
        />
        <span className="text-text">{todo.name}</span>
      </div>
      {priorityLabel && (
        <span
          className={`px-2 py-1 rounded ${priorityLabel === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'}`}
        >
          {priorityLabel}
        </span>
      )}
    </div>
  );
}

ToDoListCard.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    highPriority: PropTypes.bool.isRequired,
    priority: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default ToDoListCard;

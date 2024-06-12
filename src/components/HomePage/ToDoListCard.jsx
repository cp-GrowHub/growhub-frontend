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
    <div className="flex flex-row items-center justify-between py-3 px-4 border-card4 bg-card1 rounded-lg">
      <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
        <label
          htmlFor={`checkbox-${todo.name}`}
          className={`w-5 h-5 border-2 rounded-sm relative cursor-pointer mr-2 ${
            todo.finished ? 'border-green-500' : 'border-text'
          }`}
        >
          <input
            type="checkbox"
            id={`checkbox-${todo.name}`}
            className="hidden"
            checked={todo.finished}
            onChange={handleChange}
          />
          <span
            className={`absolute w-1.5 h-3 border-r-2 border-b-2 top-[0.05rem] left-[0.35rem] transform rotate-45 ${
              todo.finished ? 'block border-green-500' : 'hidden'
            }`}
          />
        </label>
        <span className="text-text">{todo.name}</span>
      </div>
      {priorityLabel && (
        <span
          className={`px-2 py-1 rounded max-w-xs truncate ${
            priorityLabel === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'
          }`}
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

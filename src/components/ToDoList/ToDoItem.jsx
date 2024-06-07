import React from 'react';
import PropTypes from 'prop-types';
import { TiDeleteOutline } from 'react-icons/ti';

function ToDoItem({ todo, onToggleUpdate, onToggleDelete }) {
  const priorityLabel = todo.highPriority
    ? 'High Priority'
    : todo.priority
      ? 'Priority'
      : '';

  return (
    <div className="relative flex justify-between items-center text-text p-2 bg-card2 mb-2 rounded transition-all duration-200 hover:bg-card3">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.finished}
          onChange={onToggleUpdate}
        />
        <span>{todo.name}</span>
      </div>
      <div className="flex items-center">
        {priorityLabel && (
          <span
            className={`px-2 py-1 rounded mr-2 ${priorityLabel === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'}`}
          >
            {priorityLabel}
          </span>
        )}
        <div className="relative group flex items-center justify-center">
          <button onClick={onToggleDelete} className="relative z-10">
            <TiDeleteOutline className="text-red-500 text-3xl transition-transform duration-200 transform group-hover:scale-125" />
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-auto p-2 min-w-max rounded-md shadow-md bg-gray-900 text-white text-xs font-bold transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Delete Task
          </div>
        </div>
      </div>
    </div>
  );
}

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    highPriority: PropTypes.bool,
    priority: PropTypes.bool,
    finished: PropTypes.bool,
  }).isRequired,
  onToggleUpdate: PropTypes.func.isRequired,
  onToggleDelete: PropTypes.func.isRequired,
};

export default ToDoItem;

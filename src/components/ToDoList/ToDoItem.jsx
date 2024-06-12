import React from 'react';
import PropTypes from 'prop-types';
import { TiDeleteOutline } from 'react-icons/ti';

function ToDoItem({ todo, onToggleUpdate, onToggleDelete, onStatusChange }) {
  const priorityLabel = todo.highPriority
    ? 'High Priority'
    : todo.priority
      ? 'Priority'
      : '';

  const handleChange = (event) => {
    onToggleUpdate();
    onStatusChange(todo.name, event.target.checked);
  };

  return (
    <div className="relative flex flex-row justify-between items-center text-text p-3 bg-card2 mb-2 rounded transition-all duration-200 hover:bg-card3">
      <div className="flex items-center">
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
            className={`absolute w-1.5 h-3 border-r-2 border-b-2 top-[0.05rem] left-[0.32rem] transform rotate-45 ${
              todo.finished ? 'block border-green-500' : 'hidden'
            }`}
          />
        </label>
        <span>{todo.name}</span>
      </div>
      <div className="flex items-center max-w-[40%] md:max-w-full">
        {priorityLabel && (
          <span
            className={`px-2 py-1 rounded mr-2 max-w-xs truncate ${
              priorityLabel === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'
            }`}
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
  onStatusChange: PropTypes.func.isRequired,
};

export default ToDoItem;

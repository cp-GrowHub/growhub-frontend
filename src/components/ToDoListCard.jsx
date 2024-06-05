import React from 'react';
import PropTypes from 'prop-types';

function ToDoListCard({ task, priority, onToggle }) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-card4 bg-card1 rounded-lg">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={task.completed}
          onChange={onToggle}
        />
        <span className="text-text">{task.title}</span>
      </div>
      <span
        className={`px-2 py-1 rounded ${priority === 'High Priority' ? 'bg-red-500' : 'bg-yellow-500'}`}
      >
        {priority}
      </span>
    </div>
  );
}

ToDoListCard.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  priority: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToDoListCard;

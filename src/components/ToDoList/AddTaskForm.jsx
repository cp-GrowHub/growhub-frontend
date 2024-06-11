import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddTaskForm({ onSubmitCreate }) {
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState(false);
  const [highPriority, setHighPriority] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  const handlePriorityChange = (priorityType) => {
    if (priorityType === 'priority') {
      if (priority) {
        setPriority(false);
      } else {
        setPriority(true);
        setHighPriority(false);
      }
    } else if (priorityType === 'highPriority') {
      if (highPriority) {
        setHighPriority(false);
      } else {
        setPriority(false);
        setHighPriority(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo) {
      setError('You must add name for new task!');
      return;
    }
    onSubmitCreate({ name: newTodo, priority, highPriority });
    setNewTodo('');
    setPriority(false);
    setHighPriority(false);
  };

  return (
    <>
      <div className="flex flex-row justify-end">
        {error && (
          <span className="text-text font-semibold text-lg bg-card1 border inline-block p-2 px-10 rounded-2xl">
            {error}
          </span>
        )}
      </div>
      <form className="flex items-center mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Create new task"
          className="flex-1 px-4 py-2 rounded mr-2 outline-none"
        />
        <button
          type="button"
          onClick={() => handlePriorityChange('priority')}
          className={`p-2 rounded text-white border border-transparent ${priority ? 'bg-card1 border border-green-500' : 'bg-gray-500'}`}
        >
          Priority
        </button>
        <button
          type="button"
          onClick={() => handlePriorityChange('highPriority')}
          className={`p-2 rounded text-white border border-transparent ml-2 ${highPriority ? 'bg-card1 border border-green-500' : 'bg-gray-500'}`}
        >
          High Priority
        </button>
        <button
          type="submit"
          className="p-2 bg-green-500 rounded text-white ml-2"
        >
          Add Task
        </button>
      </form>
    </>
  );
}

AddTaskForm.propTypes = {
  onSubmitCreate: PropTypes.func.isRequired,
};

export default AddTaskForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddTaskForm({ onSubmitCreate }) {
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState(false);
  const [highPriority, setHighPriority] = useState(false);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handlePriorityChange = (priorityType) => {
    if (priorityType === 'priority') {
      setPriority(true);
      setHighPriority(false);
    } else if (priorityType === 'highPriority') {
      setPriority(false);
      setHighPriority(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitCreate({ name: newTodo, priority, highPriority });
    setNewTodo(''); // Reset input setelah submit
    setPriority(false);
    setHighPriority(false);
  };

  return (
    <form className="flex items-center mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Create new task"
        className="flex-1 p-2 rounded mr-2"
      />
      <button
        type="button"
        onClick={() => handlePriorityChange('priority')}
        className={`p-2 rounded text-white ${priority ? 'bg-card1' : 'bg-gray-500'}`}
      >
        Priority
      </button>
      <button
        type="button"
        onClick={() => handlePriorityChange('highPriority')}
        className={`p-2 rounded text-white ml-2 ${highPriority ? 'bg-card1' : 'bg-gray-500'}`}
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
  );
}

AddTaskForm.propTypes = {
  onSubmitCreate: PropTypes.func.isRequired,
};

export default AddTaskForm;

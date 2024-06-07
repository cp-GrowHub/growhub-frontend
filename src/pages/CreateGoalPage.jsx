import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateGoal } from '../states/goals/thunk';
import Header from '../components/common/Header';

function CreateGoalPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(asyncCreateGoal({ name, deadline }));
    setName('');
    setDeadline('');
    navigate('/goals');
  };

  return (
    <div className="flex flex-col">
      <div className=" flex-1 pt-40 px-40">
        <Header className="border-b-2 pb-3">Create your new Goal!</Header>
      </div>
      <div className=" bg-bekgron text-text flex flex-col items-center justify-center p-6">
        <form onSubmit={onSubmitHandler} className="w-full px-64">
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="goal-name"
            >
              What is your goal?
              <input
                id="goal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter goal name"
                className="w-full px-3 py-2 border rounded bg-card1 text-text placeholder-gray-500"
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="goal-deadline"
            >
              What is your deadline for this goal?
              <input
                id="goal-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-card1 text-text placeholder-gray-500"
                required
              />
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-text text-bekgron rounded-3xl py-2 px-4 w-full focus:outline-none focus:shadow-outline"
            >
              Create new goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGoalPage;

import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useGoals from '../hooks/useGoals';
import UpcomingGoalCard from '../components/HomePage/UpcomingGoalCard';
import GoalsFilterButtons from '../components/Goals/GoalsFilterButtons';

function GoalsPage() {
  const { upcomingGoals, sortedGoals, toggleGoalHandler } = useGoals();
  const authUser = useSelector((state) => state.authUser);
  const [filter, setFilter] = useState('all');

  const filteredGoals = sortedGoals.filter((goal) => {
    if (filter === 'completed') return goal.finished;
    if (filter === 'uncompleted') return !goal.finished;
    return true;
  });

  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="text-text">
        <p className="text-lg">Welcome {authUser.name.split(' ')[0]},</p>
        <h1 className="text-3xl font-bold">Goals dashboard</h1>
      </header>
      <section className="bg-card4 bg-opacity-60 px-6 py-4 rounded-xl">
        <h2 className="text-2xl font-bold text-text pb-6">Upcoming goals</h2>
        <div className="grid grid-cols-3 gap-4">
          {upcomingGoals.map((goal) => (
            <UpcomingGoalCard
              key={goal.id}
              title={goal.name}
              daysLeft={
                (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
              }
              isFinished={goal.finished}
              onToggleFinish={() => toggleGoalHandler(goal.id)}
            />
          ))}
        </div>
      </section>
      <section className="p-4 rounded-xl">
        <div className="flex flex-row justify-between pb-4">
          <GoalsFilterButtons currentFilter={filter} setFilter={setFilter} />
          <button className="text-text font-bold">+ Create new goal</button>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-80">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-card2 p-2 rounded-lg shadow-md text-text flex flex-col"
            >
              <button
                onClick={() => toggleGoalHandler(goal.id)}
                className="text-2xl self-start py-2"
              >
                {goal.finished ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </button>
              <p>
                {Math.round(
                  (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
                )}{' '}
                days left
              </p>
              <p className="h">{goal.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GoalsPage;

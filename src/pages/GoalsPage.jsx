import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useGoals from '../hooks/useGoals';
import UpcomingGoalCard from '../components/HomePage/UpcomingGoalCard';
import GoalsFilterButtons from '../components/Goals/GoalsFilterButtons';
import useConfirmModal from '../hooks/useConfirmModal';
import ConfirmModal from '../components/common/ConfirmModal';

function GoalsPage() {
  const { upcomingGoals, sortedGoals, toggleGoalHandler } = useGoals();
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredGoals = sortedGoals.filter((goal) => {
    const daysLeft =
      (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24);
    if (filter === 'completed') return goal.finished;
    if (filter === 'uncompleted') return !goal.finished && daysLeft >= 0;
    if (filter === 'expired') return daysLeft < 0;
    if (filter === 'all') return daysLeft >= 0;
    return true;
  });

  const {
    isConfirmModalVisible,
    confirmMessage,
    showConfirmModal,
    closeConfirmModal,
    confirm,
  } = useConfirmModal();

  const handleGoalToggle = (goalId) => {
    const goalFromUpcoming = upcomingGoals.find((goal) => goal.id === goalId);
    const goalFromFiltered = filteredGoals.find((goal) => goal.id === goalId);

    if (goalFromUpcoming) {
      return showConfirmModal(
        `Are you sure you already achieved "${goalFromUpcoming.name}"?`,
        () => toggleGoalHandler(goalId)
      );
    }

    if (goalFromFiltered) {
      if (goalFromFiltered.finished) {
        return showConfirmModal(
          `Do you want to undo the completion of "${goalFromFiltered.name}"?`,
          () => toggleGoalHandler(goalId)
        );
      }
      return showConfirmModal(
        `Are you sure you already achieved "${goalFromFiltered.name}"?`,
        () => toggleGoalHandler(goalId)
      );
    }

    return null;
  };

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
              onToggleFinish={() => handleGoalToggle(goal.id)}
            />
          ))}
        </div>
      </section>
      <section className="p-4 rounded-xl">
        <div className="flex flex-row justify-between pb-4">
          <GoalsFilterButtons currentFilter={filter} setFilter={setFilter} />
          <button
            className="text-bekgron bg-text px-6 rounded-3xl hover:text-text hover:bg-bekgron hover:border-2"
            onClick={() => {
              navigate('/goals/createGoal');
            }}
          >
            + Create new goal
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-80">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-card2 p-3 px-6 rounded-lg shadow-md text-text flex flex-col"
            >
              <button
                onClick={() => handleGoalToggle(goal.id)}
                className="text-2xl self-start py-2"
              >
                {goal.finished ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </button>
              <p className="text-sm">
                {(() => {
                  const daysLeft = Math.round(
                    (new Date(goal.deadline) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return daysLeft >= 0
                    ? `${daysLeft} days left`
                    : `${Math.abs(daysLeft)} days overdue`;
                })()}
              </p>
              <p className="font-semibold text-lg">{goal.name}</p>
            </div>
          ))}
        </div>
      </section>
      <ConfirmModal
        isVisible={isConfirmModalVisible}
        message={confirmMessage}
        onClose={closeConfirmModal}
        onConfirm={confirm}
      />
    </div>
  );
}

export default GoalsPage;

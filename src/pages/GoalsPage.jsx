import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegFrownOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useGoals from '../hooks/useGoals';
import UpcomingGoalCard from '../components/HomePage/UpcomingGoalCard';
import GoalsFilterButtons from '../components/Goals/GoalsFilterButtons';
import useConfirmModal from '../hooks/useConfirmModal';
import ConfirmModal from '../components/common/ConfirmModal';
import Modal from '../components/common/Modal';

function GoalsPage() {
  const { upcomingGoals, sortedGoals, toggleGoalHandler } = useGoals();
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    const goal = sortedGoals.find((goal) => goal.id === goalId);

    if (goal) {
      if (goal.finished) {
        return showConfirmModal(
          `Do you want to undo the completion of "${goal.name}"?`,
          () => {
            toggleGoalHandler(goalId);
            setSuccessMessage(`Successfully undone the goal: "${goal.name}"`);
            setIsSuccessModalVisible(true);
          }
        );
      }
      return showConfirmModal(
        `Are you sure you already achieved "${goal.name}"?`,
        () => {
          toggleGoalHandler(goalId);
          setSuccessMessage(`Successfully achieved the goal: "${goal.name}"`);
          setIsSuccessModalVisible(true);
        }
      );
    }

    return null;
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };

  return (
    <div className="pl-4 pt-1 md:p-10 flex flex-col gap-4 md:gap-8">
      <header className="text-text">
        <p className="text-md md:text-lg">
          Welcome {authUser.name.split(' ')[0]},
        </p>
        <h1 className="text-2xl md:text-3xl font-bold">Goals dashboard</h1>
      </header>
      <section className="bg-card4 bg-opacity-60 px-4 py-4 md:px-6 md:py-4 rounded-xl">
        <h2 className="text-xl md:text-2xl font-bold text-text pb-4 md:pb-6">
          Upcoming goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingGoals.length === 0 ? (
            <div className="col-span-full py-4 text-center text-text bg-card1 rounded-xl font-semibold md:text-xl flex flex-col items-center">
              <FaRegFrownOpen className="text-4xl mb-2" />
              No goals found!
            </div>
          ) : (
            upcomingGoals.map((goal) => (
              <UpcomingGoalCard
                key={goal.id}
                title={goal.name}
                daysLeft={
                  (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
                }
                isFinished={goal.finished}
                onToggleFinish={() => handleGoalToggle(goal.id)}
              />
            ))
          )}
        </div>
      </section>
      <section className="p-4 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between pb-4 gap-4">
          <GoalsFilterButtons currentFilter={filter} setFilter={setFilter} />
          <button
            className="text-bekgron bg-text p-1 rounded-lg md:px-6 md:rounded-3xl hover:text-text hover:bg-bekgron hover:border-2"
            onClick={() => {
              navigate('/goals/createGoal');
            }}
          >
            + Create new goal
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto max-h-80">
          {filteredGoals.length === 0 ? (
            <div className="col-span-full py-4 text-center text-text bg-card1 rounded-xl font-semibold md:text-xl flex flex-col items-center">
              <FaRegFrownOpen className="text-4xl mb-2" />
              No goals found!
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-card2 p-3 md:px-6 rounded-lg shadow-md text-text flex flex-col"
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
            ))
          )}
        </div>
      </section>
      <ConfirmModal
        isVisible={isConfirmModalVisible}
        message={confirmMessage}
        onClose={closeConfirmModal}
        onConfirm={confirm}
      />
      <Modal
        text={successMessage}
        isVisible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
        color="bg-green-500"
      />
    </div>
  );
}

export default GoalsPage;

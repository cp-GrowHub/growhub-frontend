import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegFrownOpen } from 'react-icons/fa';
import PageCard from '../components/HomePage/PageCard';
import UpcomingGoalCard from '../components/HomePage/UpcomingGoalCard';
import ToDoListCard from '../components/HomePage/ToDoListCard';
import OutlineButton from '../components/common/OutlineButton';
import useGoals from '../hooks/useGoals';
import useQuote from '../hooks/useQuotes';
import useTodos from '../hooks/useTodos';
import useToggleTodo from '../hooks/useToggleTodo';
import useConfirmModal from '../hooks/useConfirmModal';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';

function HomePage() {
  const { quote, author } = useQuote();
  const { upcomingGoals, toggleGoalHandler } = useGoals();
  const { todos, toggleTodoHandler } = useTodos();
  const authUser = useSelector((state) => state.authUser);

  const {
    isModalVisible,
    modalMessage,
    modalColor,
    handleToggleTodo,
    closeModal,
  } = useToggleTodo();

  const {
    isConfirmModalVisible,
    confirmMessage,
    showConfirmModal,
    closeConfirmModal,
    confirm,
  } = useConfirmModal();

  const handleGoalToggle = (goalId) => {
    showConfirmModal(
      `Are you sure you already achieved "${upcomingGoals.find((upcoming) => upcoming.id === goalId).name}" ?`,
      () => toggleGoalHandler(goalId)
    );
  };

  return (
    <div className="pl-4 md:p-4 flex flex-col gap-10">
      <section className="flex flex-col lg:flex-row gap-3 xl:max-h-[27rem] sm:max-h-[32rem]">
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-card3 rounded-xl px-6 py-4 lg:px-10 lg:py-6 flex items-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-text">
              Hello, {authUser.name}!
            </h2>
          </div>
          <div className="bg-card1 px-6 py-4 lg:px-10 lg:py-10 rounded-xl flex flex-col gap-3 h-full flex-grow justify-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-text">
              GrowHub
            </h2>
            <p className="text-text text-sm md:text-base pb-3">
              GrowHub adalah aplikasi manajemen yang dirancang untuk membantu
              Anda mengelola kehidupan sehari-hari dengan lebih efektif.
              Aplikasi ini memungkinkan Anda untuk membuat dan melacak to-do
              list, menetapkan dan mencapai tujuan pribadi, mencatat ide-ide
              penting, dan berbagi pengalaman melalui blog.
            </p>
            <OutlineButton
              text="Our Repository"
              href="https://github.com/cp-GrowHub"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-text p-4">
            Your Path to Productivity
          </h2>
          <div className="p-3 rounded-xl overflow-y-auto space-y-2 h-full flex-grow max-h-[50vh]">
            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 bg-card1 p-5 ">
                <FaRegFrownOpen className="h-12 w-12 text-text" />
                <span className="text-center text-text font-bold md:text-xl">
                  No tasks found!
                </span>
              </div>
            ) : (
              todos.map((todo) => (
                <ToDoListCard
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodoHandler(todo.id)}
                  onStatusChange={handleToggleTodo}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-card4 bg-opacity-60 px-4 py-4 lg:px-6 lg:py-4 rounded-xl">
        <h2 className="text-2xl font-bold text-text pb-4 lg:pb-6">
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

      <section>
        <h2 className="text-text text-2xl font-bold mb-4">
          Be the best version!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PageCard
            to="/notes"
            title="Notes"
            color="card1"
            content="Catat ide-ide penting dan informasi berharga yang Anda temui sehari-hari."
          />
          <PageCard
            to="/todos"
            title="To-Do List"
            color="card2"
            content="Kelola daftar tugas Anda dengan mudah dan tetap produktif setiap hari."
          />
          <PageCard
            to="/goals"
            title="Goals"
            color="card3"
            content="Tetapkan tujuan pribadi Anda dan lacak kemajuan untuk mencapainya."
          />
        </div>
      </section>

      <section className="border rounded-3xl p-6 lg:p-10 lg:px-16 bg-card3">
        <blockquote className="text-text flex flex-col items-start">
          <p className="text-text">&quot;{quote}&quot;</p>
          <footer className="text-right text-text italic">- {author}</footer>
        </blockquote>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <PageCard
          to="/discussion"
          title="Discussions"
          color="card2"
          content="Ikuti diskusi dan bagikan pandangan Anda dengan komunitas."
        />
        <PageCard
          to="/blog"
          title="Blogs"
          color="card3"
          content="Baca artikel dan tulisan inspiratif dari berbagai penulis."
        />
      </section>

      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
        color={modalColor}
      />
      <ConfirmModal
        isVisible={isConfirmModalVisible}
        message={confirmMessage}
        onClose={closeConfirmModal}
        onConfirm={confirm}
      />
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageCard from '../components/PageCard';
import UpcomingGoalCard from '../components/UpcomingGoalCard';
import ToDoListCard from '../components/ToDoListCard';
import OutlineButton from '../components/OutlineButton';
import { asyncReceiveTodos } from '../states/todos/thunk';
import { initialGoals, dummyTodos } from '../utils/dummyData';

function HomePage() {
  const [goals, setGoals] = useState(initialGoals);
  const [localTodos, setLocalTodos] = useState(dummyTodos);
  const authUser = useSelector((state) => state.authUser);
  // const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTodos());
  }, [dispatch]);

  const toggleGoalFinish = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, finished: !goal.finished } : goal
      )
    );
  };

  const handleToggleTodo = (id) => {
    setLocalTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const sortedTodos = [...localTodos].sort((a, b) => {
    if (a.priority === 'High Priority' && b.priority !== 'High Priority') {
      return -1;
    }
    if (a.priority !== 'High Priority' && b.priority === 'High Priority') {
      return 1;
    }
    if (a.priority === 'Priority' && b.priority !== 'Priority') {
      return -1;
    }
    if (a.priority !== 'Priority' && b.priority === 'Priority') {
      return 1;
    }
    return 0;
  });

  const sortedGoals = [...goals]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="p-4 flex flex-col gap-10">
      <section className="flex gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-card3 rounded-xl px-10 py-6 flex items-center">
            <h2 className="text-3xl font-semibold text-text">
              Hello, {authUser.name}
            </h2>
          </div>
          <div className="bg-card1 px-10 py-10 rounded-xl flex flex-col gap-3 h-full flex-grow justify-center">
            <h2 className="text-3xl font-bold text-text">GrowHub</h2>
            <p className="text-text pb-3">
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
          <h2 className="text-3xl font-bold text-text p-4">
            Your Path to Productivity
          </h2>
          <div className="bg-card2 p-4 rounded-xl max-h-80 overflow-y-auto space-y-4 h-full flex-grow">
            {sortedTodos.map((todo) => (
              <ToDoListCard
                key={todo.id}
                task={todo}
                priority={todo.priority}
                onToggle={() => handleToggleTodo(todo.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 bg-card4 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-text pb-6">Upcoming goals</h2>
        <div className="grid grid-cols-3 gap-4">
          {sortedGoals.map((goal) => (
            <UpcomingGoalCard
              key={goal.id}
              title={goal.name}
              daysLeft={
                (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
              }
              isFinished={goal.finished}
              onToggleFinish={() => toggleGoalFinish(goal.id)}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <PageCard
          to="/notes"
          title="Notes"
          color="card1"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <PageCard
          to="/todos"
          title="To-Do List"
          color="card2"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <PageCard
          to="/goals"
          title="Goals"
          color="card3"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </section>
    </div>
  );
}

export default HomePage;
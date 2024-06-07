import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageCard from '../components/HomePage/PageCard';
import UpcomingGoalCard from '../components/HomePage/UpcomingGoalCard';
import ToDoListCard from '../components/HomePage/ToDoListCard';
import OutlineButton from '../components/common/OutlineButton';
import { asyncReceiveTodos, asyncUpdateTodo } from '../states/todos/thunk';
import api from '../utils/api';
import { asyncGetGoalsByUser, asyncUpdateGoal } from '../states/goals/thunk';

function HomePage() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const authUser = useSelector((state) => state.authUser);
  const todos = useSelector((state) =>
    Array.isArray(state.todos) ? state.todos : []
  );
  const goals = useSelector((state) =>
    Array.isArray(state.goals) ? state.goals : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTodos());
    dispatch(asyncGetGoalsByUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { author, quote } = await api.getQuote();
        setQuote(quote);
        setAuthor(author);
      } catch (err) {
        alert(`Failed to fetch quote: ${err}`);
      }
    };

    fetchQuote();
  }, []);

  const toggleGoalHandler = (id) => {
    const selectedGoal = goals.find((goal) => goal.id === id);
    if (selectedGoal) {
      dispatch(
        asyncUpdateGoal({ goalId: id, finished: !selectedGoal.finished })
      );
    }
  };

  const toggleTodoHandler = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      dispatch(
        asyncUpdateTodo({
          finished: !selectedTodo.finished,
          todoId: id,
        })
      );
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.highPriority && !b.highPriority) return -1;
    if (!a.highPriority && b.highPriority) return 1;
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return 0;
  });

  const sortedGoals = [...goals]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="p-4 flex flex-col gap-10">
      <section className="flex gap-3 xl:max-h-[27rem] sm:max-h-[32rem]">
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-card3 rounded-xl px-10 py-6 flex items-center">
            <h2 className="text-3xl font-semibold text-text">
              Hello, {authUser.name}!
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
        <div className="flex-1 flex flex-col gap-3 ">
          <h2 className="text-3xl font-bold text-text p-4">
            Your Path to Productivity
          </h2>
          <div className="bg-card2 p-4 rounded-xl overflow-y-auto space-y-4 h-full flex-grow">
            {sortedTodos.map((todo) => (
              <ToDoListCard
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodoHandler(todo.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className=" bg-card4 bg-opacity-60 p-6 rounded-xl">
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
              onToggleFinish={() => toggleGoalHandler(goal.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-text text-2xl font-bold mb-4">
          Be the best version!
        </h2>
        <div className="grid grid-cols-3 gap-6">
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

      <section className="border rounded-3xl p-10 px-16 bg-card3">
        <blockquote className="text-text flex flex-col items-start">
          <p className="text-text">&quot;{quote}&quot;</p>
          <footer className="text-right text-text italic">- {author}</footer>
        </blockquote>
      </section>

      <section className="grid grid-cols-3 gap-6 mb-10">
        <PageCard
          to="/discussions"
          title="Discussions"
          color="card2"
          content="Ikuti diskusi dan bagikan pandangan Anda dengan komunitas."
        />
        <PageCard
          to="/blogs"
          title="Blogs"
          color="card3"
          content="Baca artikel dan tulisan inspiratif dari berbagai penulis."
        />
      </section>
    </div>
  );
}

export default HomePage;

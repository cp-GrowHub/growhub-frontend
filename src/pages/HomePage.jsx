import React, { useState } from 'react';
import UpcomingGoalCard from '../components/UpcomingGoalCard';

const initialGoals = [
  {
    id: 1,
    title: 'Course Belajar Membuat Aplikasi Back-End untuk Pemula',
    daysLeft: 8,
    isFinished: false,
  },
  {
    id: 2,
    title: 'Course Belajar Membuat Aplikasi Back-End untuk Pemula',
    daysLeft: 8,
    isFinished: true,
  },
  {
    id: 3,
    title: 'Course Belajar Membuat Aplikasi Back-End untuk Pemula',
    daysLeft: 8,
    isFinished: false,
  },
];

function HomePage() {
  const [goals, setGoals] = useState(initialGoals);

  const toggleGoalFinish = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, isFinished: !goal.isFinished } : goal
      )
    );
  };

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-text">
          Hello, &lt;Your Name&gt;!
        </h1>
        <p className="text-xl text-text">GrowHub</p>
        <p className="text-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <button className="mt-4 bg-text text-bekgron px-4 py-2 rounded">
          About Us
        </button>
      </header>
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-text">Upcoming goals</h2>
        <div className="grid grid-cols-3 gap-4">
          {goals.map((goal) => (
            <UpcomingGoalCard
              key={goal.id}
              title={goal.title}
              daysLeft={goal.daysLeft}
              isFinished={goal.isFinished}
              onToggleFinish={() => toggleGoalFinish(goal.id)}
            />
          ))}
        </div>
      </section>
      {/* Other sections like To-Do List, Notes, Discussion, etc. */}
    </div>
  );
}

export default HomePage;

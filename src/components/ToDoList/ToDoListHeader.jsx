import React from 'react';
import { getTime } from '../../utils/index';

function ToDoListHeader() {
  const currentDate = getTime();
  return (
    <header className="text-white">
      <h1 className="text-3xl font-bold">
        Good {currentDate.timeStatus}, Asep!
      </h1>
      <p className="text-lg">Today, {currentDate.date}</p>
    </header>
  );
}

export default ToDoListHeader;

import React from 'react';
import { getTime } from '../../utils/index';
import { useSelector } from 'react-redux';

function ToDoListHeader() {
  const currentDate = getTime();
  const authUser = useSelector((states) => states.authUser);
  return (
    <header className="text-white">
      <h1 className="text-3xl font-bold">
        Good {currentDate.timeStatus}, {authUser.name}
      </h1>
      <p className="text-lg">Today, {currentDate.date}</p>
    </header>
  );
}

export default ToDoListHeader;

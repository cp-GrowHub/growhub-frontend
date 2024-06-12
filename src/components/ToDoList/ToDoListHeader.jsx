import React from 'react';
import { useSelector } from 'react-redux';
import { getTime } from '../../utils/index';

function ToDoListHeader() {
  const currentDate = getTime();
  const authUser = useSelector((states) => states.authUser);
  return (
    <header className="text-white p-2">
      <h1 className="text-xl md:text-3xl font-bold">
        Good {currentDate.timeStatus}, {authUser.name}
      </h1>
      <p className=" text-sm md:text-lg">Today, {currentDate.date}</p>
    </header>
  );
}

export default ToDoListHeader;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveTodos,
  asyncCreateTodo,
  asyncDeleteTodo,
  asyncUpdateTodo,
} from '../states/todos/thunk';

function ToDoListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">To-Do List Page</h1>
    </div>
  );
}

export default ToDoListPage;

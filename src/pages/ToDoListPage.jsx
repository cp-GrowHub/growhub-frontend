import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveTodos,
  asyncCreateTodo,
  asyncDeleteTodo,
  asyncUpdateTodo,
} from '../states/todos/thunk';
import ToDoListHeader from '../components/ToDoList/ToDoListHeader';
import ToDoItem from '../components/ToDoList/ToDoItem';
import AddTaskForm from '../components/ToDoList/AddTaskForm';
import { sortTodos } from '../utils';

function ToDoListPage() {
  const todos = useSelector((state) =>
    Array.isArray(state.todos) ? state.todos : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveTodos());
  }, [dispatch]);

  const createTodoHandler = (newTodo) => {
    dispatch(
      asyncCreateTodo({
        name: newTodo.name,
        highPriority: newTodo.highPriority,
        priority: newTodo.priority,
      })
    );
  };

  const toggleTodoUpdateHandler = (id) => {
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

  const toggleTodoDeleteHandler = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      dispatch(asyncDeleteTodo({ todoId: id }));
    }
  };

  const sortedTodos = sortTodos(todos);

  return (
    <section className="p-20">
      <ToDoListHeader />
      <div className="mt-4">
        {sortedTodos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggleUpdate={() => toggleTodoUpdateHandler(todo.id)}
            onToggleDelete={() => toggleTodoDeleteHandler(todo.id)}
          />
        ))}
      </div>
      <AddTaskForm onSubmitCreate={createTodoHandler} />
    </section>
  );
}

export default ToDoListPage;

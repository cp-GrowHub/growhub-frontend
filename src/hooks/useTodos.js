import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveTodos, asyncUpdateTodo } from '../states/todos/thunk';
import { sortTodos } from '../utils';

const useTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    Array.isArray(state.todos) ? state.todos : []
  );

  useEffect(() => {
    dispatch(asyncReceiveTodos());
  }, [dispatch]);

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

  return {
    todos: sortTodos(todos),
    toggleTodoHandler,
  };
};

export default useTodos;

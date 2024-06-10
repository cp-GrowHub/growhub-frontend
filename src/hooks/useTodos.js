import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveTodos,
  asyncCreateTodo,
  asyncDeleteTodo,
  asyncUpdateTodo,
} from '../states/todos/thunk';
import { sortTodos } from '../utils';

const useTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    Array.isArray(state.todos) ? state.todos : []
  );

  useEffect(() => {
    dispatch(asyncReceiveTodos());
  }, [dispatch]);

  const createTodo = useCallback(
    (newTodo) => {
      dispatch(
        asyncCreateTodo({
          name: newTodo.name,
          highPriority: newTodo.highPriority,
          priority: newTodo.priority,
        })
      );
    },
    [dispatch]
  );

  const toggleTodoHandler = useCallback(
    (id) => {
      const selectedTodo = todos.find((todo) => todo.id === id);
      if (selectedTodo) {
        dispatch(
          asyncUpdateTodo({
            finished: !selectedTodo.finished,
            todoId: id,
          })
        );
      }
    },
    [dispatch, todos]
  );

  const deleteTodo = useCallback(
    (id) => {
      dispatch(asyncDeleteTodo({ todoId: id }));
    },
    [dispatch]
  );

  return {
    todos: sortTodos(todos),
    createTodo,
    toggleTodoHandler,
    deleteTodo,
  };
};

export default useTodos;

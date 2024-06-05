import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  receiveTodosByUserActionCreator,
  createTodoActionCreator,
  updateTodoActionCreator,
  deleteTodoActionCreator,
} from './action';
import api from '../../utils/api';

function asyncReceiveTodos() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const todos = await api.getTodosByUser();
      dispatch(receiveTodosByUserActionCreator(todos));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateTodo({ name, highPriority, priority }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const todo = await api.createTodo({ name, highPriority, priority });
      dispatch(createTodoActionCreator(todo));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateTodo({ highPriority, priority, finished, todoId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const todo = await api.updateTodo({
        highPriority,
        priority,
        finished,
        todoId,
      });
      dispatch(updateTodoActionCreator(todo));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteTodo({ todoId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteTodo({ todoId });
      dispatch(deleteTodoActionCreator({ todoId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncReceiveTodos, asyncCreateTodo, asyncUpdateTodo, asyncDeleteTodo };

const ActionType = {
  RECEIVE_TODOS: 'todos/RECEIVE_TODOS',
  CREATE_TODO: 'todos/CREATE_TODO',
  UPDATE_TODO: 'todos/UPDATE_TODO',
  DELETE_TODO: 'todos/DELETE_TODO',
};

function receiveTodosByUserActionCreator(todos) {
  return {
    type: ActionType.RECEIVE_TODOS,
    payload: {
      todos,
    },
  };
}

function createTodoActionCreator(todo) {
  return {
    type: ActionType.CREATE_TODO,
    payload: {
      todo,
    },
  };
}

function updateTodoActionCreator(todo) {
  return {
    type: ActionType.UPDATE_TODO,
    payload: {
      todo,
    },
  };
}

function deleteTodoActionCreator({ todoId }) {
  return {
    type: ActionType.DELETE_TODO,
    payload: {
      todoId,
    },
  };
}

export {
  ActionType,
  receiveTodosByUserActionCreator,
  createTodoActionCreator,
  updateTodoActionCreator,
  deleteTodoActionCreator,
};

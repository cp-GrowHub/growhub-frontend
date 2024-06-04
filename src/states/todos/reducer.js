import { ActionType } from './action';

const todosReducer = (todos = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_TODOS:
      return action.payload.todos;
    case ActionType.CREATE_TODO:
      return [...todos, action.payload.todo];
    case ActionType.UPDATE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.todo.id) {
          return {
            ...todo,
            highPriority: action.payload.todo.highPriority,
            priority: action.payload.todo.priority,
            finished: action.payload.todo.finished,
          };
        }
        return todo;
      });
    case ActionType.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.todoId);
    default:
      return todos;
  }
};

export default todosReducer;

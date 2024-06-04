import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import todosReducer from './todos/reducer';
import notesReducer from './notes/reducer';
import goalsReducer from './goals/reducer';
import blogsReducer from './blogs/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    todos: todosReducer,
    notes: notesReducer,
    goals: goalsReducer,
    blogs: blogsReducer,
  },
});

export default store;

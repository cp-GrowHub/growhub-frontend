import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import todosReducer from './todos/reducer';
import notesReducer from './notes/reducer';
import goalsReducer from './goals/reducer';
import blogsReducer from './blogs/reducer';
import discussionsReducer from './discussions/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    todos: todosReducer,
    notes: notesReducer,
    goals: goalsReducer,
    blogs: blogsReducer,
    discussions: discussionsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;

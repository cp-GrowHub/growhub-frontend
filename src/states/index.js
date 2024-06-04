import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export default store;

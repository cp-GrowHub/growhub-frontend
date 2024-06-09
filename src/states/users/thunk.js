import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  receiveUsersActionCreator,
  updateProfileActionCreator,
} from './action';
import api from '../../utils/api';

function asyncRegisterUser({ firstName, lastName, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ firstName, lastName, email, password });
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateUser({ firstName, lastName, bio, email }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const user = await api.updateOwnProfile({
        firstName,
        lastName,
        bio,
        email,
      });
      dispatch(updateProfileActionCreator(user));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncRegisterUser, asyncUpdateUser, asyncReceiveUsers };

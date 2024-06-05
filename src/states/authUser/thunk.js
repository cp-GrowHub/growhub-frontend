import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';

// thunks
function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.login({ email, password });
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.clearAccessToken();
  };
}

export { asyncSetAuthUser, asyncUnsetAuthUser };

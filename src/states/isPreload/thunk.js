import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setIsPreloadActionCreator } from './action';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export { asyncPreloadProcess };

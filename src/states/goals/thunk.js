import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createGoalActionCreator,
  updateGoalActionCreator,
  deleteGoalActionCreator,
  receiveGoalsByUserActionCreator,
} from './action';
import api from '../../utils/api';

function asyncCreateGoal({ name, deadline }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const goal = await api.createGoal({ name, deadline });
      dispatch(createGoalActionCreator(goal));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateGoal({ finished, goalId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const goal = await api.updateGoal({
        finished,
        goalId,
      });
      dispatch(updateGoalActionCreator(goal));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteGoal({ goalId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteGoal({ goalId });
      dispatch(deleteGoalActionCreator({ goalId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetGoalsByUser() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const goals = await api.getGoalsByUser();
      dispatch(receiveGoalsByUserActionCreator(goals));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncCreateGoal,
  asyncUpdateGoal,
  asyncDeleteGoal,
  asyncGetGoalsByUser,
};

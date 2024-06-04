const ActionType = {
  RECEIVE_GOALS: 'goals/RECEIVE_GOALS',
  CREATE_GOAL: 'goals/CREATE_GOAL',
  UPDATE_GOAL: 'goals/UPDATE_GOAL',
  DELETE_GOAL: 'goals/DELETE_GOAL',
};

function receiveGoalsByUserActionCreator(goals) {
  return {
    type: ActionType.RECEIVE_GOALS,
    payload: {
      goals,
    },
  };
}

function createGoalActionCreator(goal) {
  return {
    type: ActionType.CREATE_GOAL,
    payload: {
      goal,
    },
  };
}

function updateGoalActionCreator(goal) {
  return {
    type: ActionType.UPDATE_GOAL,
    payload: {
      goal,
    },
  };
}

function deleteGoalActionCreator({ goalId }) {
  return {
    type: ActionType.DELETE_GOAL,
    payload: {
      goalId,
    },
  };
}

export {
  ActionType,
  receiveGoalsByUserActionCreator,
  createGoalActionCreator,
  updateGoalActionCreator,
  deleteGoalActionCreator,
};

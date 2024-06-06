import { ActionType } from './action';

const goalsReducer = (goals = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_GOALS:
      return Array.isArray(action.payload.goals) ? action.payload.goals : [];
    case ActionType.CREATE_GOAL:
      return [...goals, action.payload.goal];
    case ActionType.UPDATE_GOAL:
      return goals.map((goal) =>
        goal.id === action.payload.goal.id
          ? { ...goal, ...action.payload.goal }
          : goal
      );
    case ActionType.DELETE_GOAL:
      return goals.filter((goal) => goal.id !== action.payload.goalId);
    default:
      return goals;
  }
};

export default goalsReducer;

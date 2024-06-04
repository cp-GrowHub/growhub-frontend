import { ActionType } from './action';

const initialState = {
  goals: [],
};

const goalsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_GOALS:
      return {
        ...state,
        goals: action.payload.goals,
      };
    case ActionType.CREATE_GOAL:
      return {
        ...state,
        goals: [...state.goals, action.payload.goal],
      };
    case ActionType.UPDATE_GOAL:
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.goal.id ? action.payload.goal : goal
        ),
      };
    case ActionType.DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload.goalId),
      };
    default:
      return state;
  }
};

export default goalsReducer;

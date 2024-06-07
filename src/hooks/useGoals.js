import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetGoalsByUser, asyncUpdateGoal } from '../states/goals/thunk';
import { sortGoals } from '../utils';

const useGoals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) =>
    Array.isArray(state.goals) ? state.goals : []
  );

  useEffect(() => {
    dispatch(asyncGetGoalsByUser());
  }, [dispatch]);

  const toggleGoalHandler = (id) => {
    const selectedGoal = goals.find((goal) => goal.id === id);
    if (selectedGoal) {
      dispatch(
        asyncUpdateGoal({ goalId: id, finished: !selectedGoal.finished })
      );
    }
  };

  return {
    goals: sortGoals(goals),
    toggleGoalHandler,
  };
};

export default useGoals;

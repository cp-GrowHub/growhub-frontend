import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncReceiveUsers } from '../states/users/thunk';

const useAuthUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentUser = users.find((user) => user.isAuthenticated); // Assuming `isAuthenticated` flag

  useEffect(() => {
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  return currentUser;
};

export default useAuthUser;

import { ActionType } from './action';

export default function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    case ActionType.UPDATE_PROFILE:
      return users.map((user) => {
        if (user.id === action.payload.user.id) {
          return {
            ...user,
            name: `${action.payload.user.firstName} ${action.payload.user.lastName}`,
            bio: action.payload.user.bio,
            email: action.payload.user.email,
          };
        }
        return user;
      });
    default:
      return users;
  }
}

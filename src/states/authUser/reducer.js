import { ActionType } from './action';

export default function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.SET_AUTH_USER;
    case ActionType.UNSET_AUTH_USER:
      return action.payload.UNSET_AUTH_USER;
    default:
      return authUser;
  }
}

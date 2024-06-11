const ActionType = {
  RECEIVE_USERS: 'users/RECEIVE_USERS',
  UPDATE_PROFILE: 'users/UPDATE_PROFILE',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function updateProfileActionCreator(user) {
  return {
    type: ActionType.UPDATE_PROFILE,
    payload: {
      user,
    },
  };
}

export { ActionType, receiveUsersActionCreator, updateProfileActionCreator };

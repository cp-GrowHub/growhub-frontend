// action.js

const ActionType = {
  RECEIVE_USERS: 'users/RECEIVE_USERS',
  UPDATE_PROFILE: 'users/UPDATE_PROFILE',
  UPDATE_USER: 'users/UPDATE_USER', // Menambahkan ActionType untuk updateUser
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

// Menambahkan fungsi actionCreator untuk updateUser
function updateUser(userData) {
  return {
    type: ActionType.UPDATE_USER,
    payload: userData,
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  updateProfileActionCreator,
  updateUser,
}; // Menambahkan updateUser ke dalam ekspor

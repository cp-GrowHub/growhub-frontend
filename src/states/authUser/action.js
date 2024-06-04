const ActionType = {
  SET_AUTH_USER: 'authUser/SET_AUTH_USER',
  UNSET_AUTH_USER: 'authUser/UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export { ActionType, setAuthUserActionCreator, unsetAuthUserActionCreator };

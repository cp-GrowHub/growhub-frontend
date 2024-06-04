const ActionType = {
  SET_IS_PRELOAD: 'isPreload/SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export { ActionType, setIsPreloadActionCreator };

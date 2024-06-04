const ActionType = {
  RECEIVE_NOTES: 'notes/RECEIVE_NOTES',
  CREATE_NOTE: 'notes/CREATE_NOTE',
  UPDATE_NOTE: 'notes/UPDATE_NOTE',
  DELETE_NOTE: 'notes/DELETE_NOTE',
  RECEIVE_DETAIL_NOTE: 'notes/RECEIVE_DETAIL_NOTE',
};

function receiveNotesByUserActionCreator(notes) {
  return {
    type: ActionType.RECEIVE_NOTES,
    payload: {
      notes,
    },
  };
}

function createNoteActionCreator(note) {
  return {
    type: ActionType.CREATE_NOTE,
    payload: {
      note,
    },
  };
}

function updateNoteActionCreator(note) {
  return {
    type: ActionType.UPDATE_NOTE,
    payload: {
      note,
    },
  };
}

function deleteNoteActionCreator({ noteId }) {
  return {
    type: ActionType.DELETE_NOTE,
    payload: {
      noteId,
    },
  };
}

function receiveDetailNoteActionCreator(note) {
  return {
    type: ActionType.RECEIVE_DETAIL_NOTE,
    payload: {
      note,
    },
  };
}

export {
  ActionType,
  receiveNotesByUserActionCreator,
  createNoteActionCreator,
  updateNoteActionCreator,
  deleteNoteActionCreator,
  receiveDetailNoteActionCreator,
};

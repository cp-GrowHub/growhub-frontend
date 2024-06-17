import { ActionType } from './action';

const initialState = {
  notes: [],
  detailNote: null,
};

const notesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case ActionType.CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload.note],
      };
    case ActionType.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.note.id ? action.payload.note : note
        ),
      };
    case ActionType.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.noteId),
      };
    case ActionType.RECEIVE_DETAIL_NOTE:
      return {
        ...state,
        detailNote: action.payload.note,
      };
    case ActionType.CLEAR_DETAIL_NOTE:
      return {
        ...state,
        detailNote: null,
      };
    default:
      return state;
  }
};

export default notesReducer;

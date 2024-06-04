import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createNoteActionCreator,
  updateNoteActionCreator,
  deleteNoteActionCreator,
  receiveDetailNoteActionCreator,
} from './action';
import api from '../../utils/api';

function asyncCreateNote({ title, body, archived }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.createNote({ title, body, archived });
      dispatch(createNoteActionCreator(note));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateNote({ title, body, archived, noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.updateNote({
        title,
        body,
        archived,
        noteId,
      });
      dispatch(updateNoteActionCreator(note));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteNote({ noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteNote({ noteId });
      dispatch(deleteNoteActionCreator({ noteId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDetailNote({ noteId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const note = await api.getDetailNote({ noteId });
      dispatch(receiveDetailNoteActionCreator(note));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncCreateNote,
  asyncUpdateNote,
  asyncDeleteNote,
  asyncGetDetailNote,
};

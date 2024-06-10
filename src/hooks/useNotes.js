import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveNotes,
  asyncGetDetailNote,
  asyncUpdateNote,
} from '../states/notes/thunk';

const useNotes = (keyword) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const notes = useSelector((state) => state.notes.notes);
  const detailNote = useSelector((state) => state.notes.detailNote);

  useEffect(() => {
    dispatch(asyncReceiveNotes());
  }, [dispatch]);

  const filteredNotes = useMemo(() => {
    let filtered = [...notes];

    if (filter === 'Unarchived') {
      filtered = filtered.filter((note) => !note.archived);
    } else if (filter === 'Archived') {
      filtered = filtered.filter((note) => note.archived);
    }

    if (keyword) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(keyword.toLowerCase()) ||
          note.body.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [notes, keyword, filter]);

  useEffect(() => {
    if (filteredNotes.length > 0 && keyword.length > 0) {
      dispatch(asyncGetDetailNote({ noteId: filteredNotes[0].id }));
    }
  }, [keyword, dispatch, filteredNotes]);

  const handleNoteClick = useCallback(
    (noteId) => {
      dispatch(asyncGetDetailNote({ noteId }));
    },
    [dispatch]
  );

  const handleToggleArchive = useCallback(
    (note) => {
      const updatedNote = {
        ...note,
        archived: !note.archived,
      };
      dispatch(
        asyncUpdateNote({
          title: updatedNote.title,
          body: updatedNote.body,
          archived: updatedNote.archived,
          noteId: updatedNote.id,
        })
      );
    },
    [dispatch]
  );

  return {
    filteredNotes,
    detailNote,
    filter,
    setFilter,
    handleNoteClick,
    handleToggleArchive,
  };
};

export default useNotes;

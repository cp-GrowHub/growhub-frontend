import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  asyncReceiveNotes,
  asyncUpdateNote,
  asyncGetDetailNote,
} from '../states/notes/thunk';
import NotesFilterButton from '../components/Notes/NotesFilterButton';
import SearchForm from '../components/common/SearchForm';
import NotesItemCard from '../components/Notes/NotesItemCard';
import { postedAt } from '../utils';
import useInput from '../hooks/useInput';

function NotesPage() {
  const [keyword, onKeywordChange, resetKeyword] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleNoteClick = (noteId) => {
    dispatch(asyncGetDetailNote({ noteId }));
  };

  const handleToggleArchive = (note) => {
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
  };

  return (
    <div className="flex flex-col min-h-[90vh]">
      <header className="bg-card1 flex flex-row p-3 px-10 justify-between items-center">
        <div className="flex items-center">
          <NotesFilterButton currentFilter={filter} setFilter={setFilter} />
        </div>
        <SearchForm
          searchKeyword={keyword}
          onSearch={onKeywordChange}
          resetSearch={resetKeyword}
        />
      </header>
      <div className="flex flex-row gap-5 p-5 flex-1">
        <div className="flex flex-col flex-[1] rounded-lg max-h-[75vh]">
          <div className="overflow-y-auto flex-grow flex flex-col gap-1">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                className="text-left w-full"
              >
                <NotesItemCard
                  title={note.title}
                  archived={note.archived}
                  content={note.body}
                  date={postedAt(note.createdAt)}
                />
              </button>
            ))}
          </div>
          <button
            className="mt-2 py-2 bg-text text-bekgron rounded-lg"
            onClick={() => navigate('./createNote')}
          >
            New Note
          </button>
        </div>
        {detailNote && (
          <div className="flex-[2] bg-card3 rounded-lg max-h-[80vh]">
            <div className="flex flex-col justify-between p-10 h-full">
              <div>
                <h2 className="text-2xl font-bold text-text">
                  {detailNote.title}
                </h2>
                <p className="text-text">{postedAt(detailNote.createdAt)}</p>
                <p className="text-text">{detailNote.body}</p>
              </div>
              <div className="mt-4 flex flex-row gap-5">
                <button
                  className="py-2 px-4 bg-black text-text rounded-lg hover:bg-text hover:text-bekgron"
                  onClick={() => navigate(`/notes/${detailNote.id}`)}
                >
                  Detail Note
                </button>
                <button
                  className="py-2 px-4 bg-black text-text rounded-lg hover:bg-text hover:text-bekgron"
                  onClick={() => handleToggleArchive(detailNote)}
                >
                  {detailNote.archived ? 'Unarchive' : 'Archive'} Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;

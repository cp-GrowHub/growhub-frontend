import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveNotes, asyncUpdateNote } from '../states/notes/thunk';
import NotesFilterButton from '../components/Notes/NotesFilterButton';
import NotesSearchForm from '../components/Notes/NotesSearchForm';
import NotesItemCard from '../components/Notes/NotesItemCard';
import { postedAt } from '../utils';
import useInput from '../hooks/useInput';

function NotesPage() {
  const [keyword, onKeywordChange, resetKeyword] = useInput();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    dispatch(asyncReceiveNotes());
  }, [dispatch]);

  const filteredNotes = useMemo(() => {
    let filtered = notes;

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

    return filtered;
  }, [notes, keyword, filter]);

  const [selectedNote, setSelectedNote] = useState(filteredNotes[0]);
  const selectedNoteDate = postedAt(selectedNote?.createdAt);

  useEffect(() => {
    if (filteredNotes.length > 0) {
      setSelectedNote(filteredNotes[0]);
    } else {
      setSelectedNote(null);
    }
  }, [filteredNotes]);

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

  useEffect(() => {
    if (selectedNote) {
      const updatedNote = notes.find((note) => note.id === selectedNote.id);
      setSelectedNote(updatedNote);
    }
  }, [notes, selectedNote]);

  return (
    <div className="flex flex-col min-h-[90vh]">
      <header className="bg-card1 flex flex-row p-3 px-10 justify-between items-center">
        <div className="flex items-center">
          <NotesFilterButton currentFilter={filter} setFilter={setFilter} />
        </div>
        <NotesSearchForm
          searchKeyword={keyword}
          onSearch={onKeywordChange}
          resetSearch={resetKeyword}
        />
      </header>
      <div className="flex flex-row gap-5 p-5 flex-1">
        <div className="flex flex-col flex-[1] rounded-lg max-h-[75vh]">
          <div className="overflow-y-auto flex-grow flex flex-col gap-1">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onKeyDown={() => setSelectedNote(note)}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedNote(note)}
              >
                <NotesItemCard
                  title={note.title}
                  archived={note.archived}
                  content={note.body}
                  date={postedAt(note.createdAt)}
                />
              </div>
            ))}
          </div>
          <button className="mt-2 py-2 bg-text text-bekgron rounded-lg">
            New Note
          </button>
        </div>
        {selectedNote && (
          <div className="flex-[2] bg-card3 rounded-lg max-h-[80vh]">
            <div className="flex flex-col justify-between p-10 h-full">
              <div>
                <h2 className="text-2xl font-bold text-text">
                  {selectedNote.title}
                </h2>
                <p className="text-text">{selectedNoteDate}</p>
                <p className="text-text">{selectedNote.body}</p>
              </div>
              <div className="mt-4 flex flex-row gap-5">
                <button className="py-2 px-4 bg-black text-text rounded-lg">
                  Detail Note
                </button>
                <button
                  className="py-2 px-4 bg-black text-text rounded-lg"
                  onClick={() => handleToggleArchive(selectedNote)}
                >
                  {selectedNote.archived ? 'Unarchive' : 'Archive'} Note
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

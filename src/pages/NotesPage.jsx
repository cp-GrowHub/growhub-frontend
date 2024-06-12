import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotesFilterButton from '../components/Notes/NotesFilterButton';
import SearchForm from '../components/common/SearchForm';
import NotesItemCard from '../components/Notes/NotesItemCard';
import { postedAt } from '../utils';
import useInput from '../hooks/useInput';
import useNotes from '../hooks/useNotes';

function NotesPage() {
  const [keyword, onKeywordChange, resetKeyword] = useInput('');
  const navigate = useNavigate();
  const {
    filteredNotes,
    detailNote,
    filter,
    setFilter,
    handleNoteClick,
    handleToggleArchive,
  } = useNotes(keyword);

  return (
    <div className="flex flex-col min-h-[90vh]">
      <header className="p-3 md:px-10 md:bg-card1">
        <div className=" bg-card1 flex flex-col md:flex-row justify-between items-center rounded-lg gap-2">
          <div className="flex items-center">
            <NotesFilterButton currentFilter={filter} setFilter={setFilter} />
          </div>
          <SearchForm
            searchKeyword={keyword}
            onSearch={onKeywordChange}
            resetSearch={resetKeyword}
          />
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-5 p-4 md:p-5 flex-1">
        <div className="order-2 md:order-1 flex flex-col flex-[1] rounded-lg max-h-[75vh]">
          <div className="overflow-y-auto flex-grow flex flex-col gap-2">
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
          <div className="order-1 md:order-2 flex-[2] bg-card3 rounded-lg max-h-[80vh] p-4 md:p-10">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-text">
                  {detailNote.title}
                </h2>
                <p className="text-text text-xs mb-2 md:text-base">
                  {postedAt(detailNote.createdAt)}
                </p>
                <p className="text-text text-sm md:text-base">
                  {detailNote.body}
                </p>
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

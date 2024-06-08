import React, { useState } from 'react';
import NotesFilterButton from '../components/Notes/NotesFilterButton';
import NotesSearchForm from '../components/Notes/NotesSearchForm';

function NotesPage() {
  const [filter, setFilter] = useState('Unarchived');

  return (
    <div>
      <header className="bg-card1 flex flex-row p-3 px-10 justify-between items-center">
        <div className="flex items-center">
          <NotesFilterButton currentFilter={filter} setFilter={setFilter} />
        </div>
        <NotesSearchForm />
      </header>
      <h1 className="text-2xl font-bold text-text">Notes Page</h1>
    </div>
  );
}

export default NotesPage;

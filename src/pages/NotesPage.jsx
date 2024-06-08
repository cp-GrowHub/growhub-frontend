import React, { useState } from 'react';
import NotesFilterButton from '../components/Notes/NotesFilterButton';

function NotesPage() {
  const [filter, setFilter] = useState('Unarchived');

  return (
    <div>
      <header className="bg-card1 flex flex-row p-3 px-10">
        <NotesFilterButton currentFilter={filter} setFilter={setFilter} />
      </header>
      <h1 className="text-2xl font-bold text-text">Notes Page</h1>
    </div>
  );
}

export default NotesPage;

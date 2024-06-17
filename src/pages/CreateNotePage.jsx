import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import CreateNoteForm from '../components/Notes/CreateNoteForm';
import { asyncCreateNote } from '../states/notes/thunk';

export default function CreateNotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (title, body) => {
    dispatch(asyncCreateNote({ title, body }));
    navigate('/notes');
  };

  return (
    <div className="text-text flex flex-col pt-16 px-10">
      <div className="flex-1">
        <Header className="border-b-2 pb-3">Create your new Note!</Header>
      </div>
      <div>
        <CreateNoteForm onSubmit={onSubmitHandler} />
      </div>
    </div>
  );
}

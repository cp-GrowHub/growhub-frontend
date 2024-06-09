import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateDiscussionForm from '../components/Discussion/CreateDiscussionForm';
import { asyncCreateDiscussion } from '../states/discussions/thunk';
import Header from '../components/common/Header';

export default function CreateDiscussionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (title, tags, body) => {
    dispatch(asyncCreateDiscussion({ title, body, tags }));
    navigate('/discussion');
  };
  return (
    <div className="text-text flex flex-col pt-16 px-10">
      <div className="flex-1">
        <Header className="border-b-2 pb-3">Start new Discussion!</Header>
      </div>
      <div>
        <CreateDiscussionForm onSubmit={onSubmitHandler} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateDiscussionForm from '../components/Discussion/CreateDiscussionForm';
import { asyncCreateDiscussion } from '../states/discussions/thunk';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

export default function CreateDiscussionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onSubmitHandler = (title, tags, body) => {
    dispatch(asyncCreateDiscussion({ title, body, tags }));
    setModalMessage('Discussion created successfully!');
    setIsModalVisible(true);
    setTimeout(() => {
      navigate('/discussion');
    }, 3000);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="text-text flex flex-col pt-2 pl-4 md:pt-16 md:px-10 max-w-[40vh] md:max-w-full gap-4">
      <div className="flex-1">
        <Header className="border-b-2 pb-3">Start new Discussion!</Header>
      </div>
      <CreateDiscussionForm onSubmit={onSubmitHandler} />
      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
}

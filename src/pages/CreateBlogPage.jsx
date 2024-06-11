import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateBlogForm from '../components/Blog/CreateBlogForm';
import { asyncCreateBlog } from '../states/blogs/thunk';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';

export default function CreateBlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onSubmitHandler = (title, tags, body) => {
    dispatch(asyncCreateBlog({ title, body, tags }));
    setModalMessage('Blog created successfully!');
    setIsModalVisible(true);
    setTimeout(() => {
      navigate('/blog');
    }, 3000);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="text-text flex flex-col pt-16 px-10">
      <div className="flex-1">
        <Header className="border-b-2 pb-3">Share your Knowledge!</Header>
      </div>
      <div>
        <CreateBlogForm onSubmit={onSubmitHandler} />
      </div>
      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
}

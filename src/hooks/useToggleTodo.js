import { useState } from 'react';

export default function useToggleTodo() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('bg-green-500');

  const handleToggleTodo = (todoName, isChecked) => {
    setIsModalVisible(true);
    setModalMessage(
      `"${todoName}" has been ${isChecked ? 'checked' : 'unchecked'}!`
    );
    setModalColor(isChecked ? 'bg-green-500' : 'bg-red-500');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    modalMessage,
    modalColor,
    handleToggleTodo,
    closeModal,
  };
}

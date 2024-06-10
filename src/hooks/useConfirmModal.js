import { useState } from 'react';

export default function useConfirmModal() {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);

  const showConfirmModal = (message, onConfirmCallback) => {
    setConfirmMessage(message);
    setOnConfirm(() => onConfirmCallback);
    setIsConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalVisible(false);
  };

  const confirm = () => {
    if (onConfirm) onConfirm();
    closeConfirmModal();
  };

  return {
    isConfirmModalVisible,
    confirmMessage,
    showConfirmModal,
    closeConfirmModal,
    confirm,
  };
}

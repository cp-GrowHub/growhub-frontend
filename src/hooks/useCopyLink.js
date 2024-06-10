import { useState } from 'react';

export default function useCopyLink(id, basePath) {
  const [isCopiedModalVisible, setIsCopiedModalVisible] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/shared/${basePath}/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsCopiedModalVisible(true);
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };

  return {
    isCopiedModalVisible,
    setIsCopiedModalVisible,
    handleCopyLink,
  };
}

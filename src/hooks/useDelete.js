import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useDelete(id, thunk, paramName, redirectPath) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    dispatch(thunk({ [paramName]: id }));
    navigate(redirectPath);
  };

  return {
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    handleDelete,
  };
}

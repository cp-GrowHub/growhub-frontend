import React, { useState } from 'react';
import ToDoListHeader from '../components/ToDoList/ToDoListHeader';
import ToDoItem from '../components/ToDoList/ToDoItem';
import AddTaskForm from '../components/ToDoList/AddTaskForm';
import Modal from '../components/common/Modal';
import useTodos from '../hooks/useTodos';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';
import useToggleTodo from '../hooks/useToggleTodo';

function ToDoListPage() {
  const { todos, createTodo, toggleTodoHandler, deleteTodo } = useTodos();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const {
    isModalVisible,
    modalMessage,
    modalColor,
    handleToggleTodo,
    closeModal,
  } = useToggleTodo();

  const handleDeleteRequest = (id) => {
    setTodoToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    deleteTodo(todoToDelete);
    setIsDeleteModalVisible(false);
    setTodoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setTodoToDelete(null);
  };

  const handleCreateTodo = (newTodo) => {
    createTodo(newTodo);
    setIsSuccessModalVisible(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };

  return (
    <section className="p-20">
      <ToDoListHeader />
      <div className="mt-4 overflow-y-auto p-5 px-10 max-h-[28rem]">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggleUpdate={() => toggleTodoHandler(todo.id)}
            onToggleDelete={() => handleDeleteRequest(todo.id)}
            onStatusChange={handleToggleTodo}
          />
        ))}
      </div>
      <div className="p-4">
        <AddTaskForm onSubmitCreate={handleCreateTodo} />
      </div>
      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <Modal
        text="Task added successfully!"
        isVisible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
        color="bg-green-500"
      />
      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
        color={modalColor}
      />
    </section>
  );
}

export default ToDoListPage;

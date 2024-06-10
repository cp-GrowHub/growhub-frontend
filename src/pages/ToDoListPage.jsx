import React, { useState } from 'react';
import ToDoListHeader from '../components/ToDoList/ToDoListHeader';
import ToDoItem from '../components/ToDoList/ToDoItem';
import AddTaskForm from '../components/ToDoList/AddTaskForm';
import useTodos from '../hooks/useTodos';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';

function ToDoListPage() {
  const { todos, createTodo, toggleTodoHandler, deleteTodo } = useTodos();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

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

  return (
    <section className="p-20">
      <ToDoListHeader />
      <div className="mt-4 overflow-y-auto p-5 max-h-[28rem]">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggleUpdate={() => toggleTodoHandler(todo.id)}
            onToggleDelete={() => handleDeleteRequest(todo.id)}
          />
        ))}
      </div>
      <div className="p-4">
        <AddTaskForm onSubmitCreate={createTodo} />
      </div>
      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}

export default ToDoListPage;

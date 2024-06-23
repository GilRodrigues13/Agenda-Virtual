import React from 'react';
import './Todo.css';

const Todo = ({ todo, removeTodo, completeTodo }) => {
  const handleCompleteClick = () => {
    completeTodo(todo.id);
  };

  const handleRemoveClick = () => {
    removeTodo(todo.id);
  };

  return (
    <div className="todo" style={{ backgroundColor: todo.color }}>
      <div>{todo.title}</div>
      <div className="actions">
       
        <button className="remove" onClick={handleRemoveClick}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default Todo;

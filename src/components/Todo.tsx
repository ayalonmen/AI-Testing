import React from 'react';

interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="todo-checkbox"
      />
      <span
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          marginLeft: '10px',
        }}
      >
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default Todo; 
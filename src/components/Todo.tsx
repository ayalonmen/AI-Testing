import React from 'react';

export type Priority = 'high' | 'medium' | 'low';
export type AgentStatus = 'DISCONNECTED' | 'VALIDATING' | 'BUILDING' | 'CONNECTED';

interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  agentStatus: AgentStatus;
  dueDate: Date | null;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onDueDateChange: (id: number, date: Date | null) => void;
}

const priorityColors = {
  high: '#ffebee',
  medium: '#fff3e0',
  low: '#f1f8e9'
};

const statusColors = {
  DISCONNECTED: '#ff4444',
  VALIDATING: '#ffeb3b',
  BUILDING: '#ffc107',
  CONNECTED: '#4caf50'
};

const Todo: React.FC<TodoProps> = ({ 
  id, 
  text, 
  completed, 
  priority,
  agentStatus,
  dueDate,
  onToggle, 
  onDelete,
  onPriorityChange,
  onDueDateChange
}) => {
  return (
    <div 
      className="todo-item"
      style={{ backgroundColor: priorityColors[priority] }}
    >
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
          color: 'black',
        }}
      >
        {text}
      </span>
      <div className="status-badge" style={{ backgroundColor: statusColors[agentStatus] }}>
        {agentStatus}
      </div>
      <input
        type="date"
        value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : null;
          onDueDateChange(id, date);
        }}
        className="due-date-input"
      />
      <select
        value={priority}
        onChange={(e) => onPriorityChange(id, e.target.value as Priority)}
        className="priority-select"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
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
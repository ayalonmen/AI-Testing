import { useState } from 'react'
import Todo, { Priority, AgentStatus } from './components/Todo'
import './App.css'

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  agentStatus: AgentStatus;
  dueDate: Date | null;
}

type SortType = 'priority' | 'added' | 'completed' | 'status' | 'dueDate';
type FilterType = 'all' | Priority | AgentStatus;

const agentStatuses: AgentStatus[] = ['DISCONNECTED', 'VALIDATING', 'BUILDING', 'CONNECTED'];

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('added');
  const [filterBy, setFilterBy] = useState<FilterType>('all');

  const getRandomStatus = (): AgentStatus => {
    const randomIndex = Math.floor(Math.random() * agentStatuses.length);
    return agentStatuses[randomIndex];
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        priority: 'medium',
        agentStatus: getRandomStatus(),
        dueDate: null,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handlePriorityChange = (id: number, priority: Priority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const handleDueDateChange = (id: number, date: Date | null) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, dueDate: date } : todo
    ));
  };

  const sortTodos = (todos: TodoItem[]): TodoItem[] => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const statusOrder = { CONNECTED: 0, BUILDING: 1, VALIDATING: 2, DISCONNECTED: 3 };
    
    switch (sortBy) {
      case 'priority':
        return [...todos].sort((a, b) => 
          priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      case 'completed':
        return [...todos].sort((a, b) => 
          Number(a.completed) - Number(b.completed)
        );
      case 'status':
        return [...todos].sort((a, b) =>
          statusOrder[a.agentStatus] - statusOrder[b.agentStatus]
        );
      case 'dueDate':
        return [...todos].sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        });
      default:
        return todos;
    }
  };

  const filterTodos = (todos: TodoItem[]): TodoItem[] => {
    if (filterBy === 'all') return todos;
    if (filterBy in agentStatuses) {
      return todos.filter(todo => todo.agentStatus === filterBy);
    }
    return todos.filter(todo => todo.priority === filterBy);
  };

  const displayTodos = sortTodos(filterTodos(todos));

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add Todo</button>
      </form>

      <div className="controls">
        <div className="control-group">
          <label>Sort by: </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="control-select"
          >
            <option value="added">Date Added</option>
            <option value="priority">Priority</option>
            <option value="completed">Completion</option>
            <option value="status">Status</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="control-group">
          <label>Filter by: </label>
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value as FilterType)}
            className="control-select"
          >
            <option value="all">All</option>
            <optgroup label="Priority">
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </optgroup>
            <optgroup label="Status">
              <option value="CONNECTED">Connected</option>
              <option value="BUILDING">Building</option>
              <option value="VALIDATING">Validating</option>
              <option value="DISCONNECTED">Disconnected</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {displayTodos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onPriorityChange={handlePriorityChange}
            onDueDateChange={handleDueDateChange}
          />
        ))}
      </div>

      <div className="todo-stats">
        <p>Total todos: {todos.length}</p>
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        <p>Connected: {todos.filter(todo => todo.agentStatus === 'CONNECTED').length}</p>
      </div>
    </div>
  )
}

export default App

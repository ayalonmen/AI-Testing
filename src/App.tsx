import { useState } from 'react'
import Todo from './components/Todo'
import './App.css'

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
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
      <div className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
      <div className="todo-stats">
        <p>Total todos: {todos.length}</p>
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
      </div>
    </div>
  )
}

export default App

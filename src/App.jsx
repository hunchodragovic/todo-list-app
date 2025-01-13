import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false); // New state for filtering completed todos

  // Function to load todos from local storage
  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : []; // Parse stored todos or return an empty array
  };

  // Function to save todos to local storage
  const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert todos array to a string and save it
  };

  // Read todos from local storage when the app first loads
  useEffect(() => {
    setTodos(loadTodos()); // Set todos from local storage
  }, []);

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    saveTodos(updatedTodos); // Save todos to local storage after adding
  };

  // Toggle completed state of a todo
  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    saveTodos(newTodos); // Save updated todos to local storage
  };

  // Delete a todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
    saveTodos(newTodos); // Save updated todos to local storage
  };

  // Edit a todo's text
  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    saveTodos(newTodos); // Save updated todos to local storage
  };

  // Toggle showing only completed todos
  const toggleShowCompleted = () => {
    setShowCompletedOnly(!showCompletedOnly);
  };

  // Filter todos based on the state (show all or only completed)
  const filteredTodos = showCompletedOnly ? todos.filter(todo => todo.completed) : todos;

  return (
    <div className="App">
      <div>
      <h1 style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'white' }}>
  Todo App
</h1>

        <p className='ease'>Manage your todos with ease</p>
      </div>
      <TodoForm addTodo={addTodo} />
      
      {/* Button to toggle between showing all todos or only completed ones */}
      <button onClick={toggleShowCompleted}>
        {showCompletedOnly ? 'Show All Todos' : 'Show Completed Todos'}
      </button>

      {/* Pass the filtered todos to the TodoList */}
      <TodoList 
        todos={filteredTodos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
        editTodo={editTodo} 
      />
    </div>
  );
}

export default App;

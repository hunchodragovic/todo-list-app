// components/TodoList.jsx
import React, { useState } from 'react';
import './TodoList.css';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  const [editIndex, setEditIndex] = useState(null);  // To track which todo is being edited
  const [newText, setNewText] = useState('');        // To hold the new text input for editing

  // Handle change in the edit input field
  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  // Handle saving the edit
  const handleEditSave = (index) => {
    editTodo(index, newText);  // Call the editTodo function passed from App
    setEditIndex(null);         // Reset the edit mode
    setNewText('');             // Clear the text input
  };

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <table className="todo-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={newText}
                      onChange={handleEditChange}
                      placeholder="Edit todo"
                    />
                  ) : (
                    <span
                    className={todo.completed ? 'completed' : ''}
                    style={{
                      fontWeight: todo.completed ? 'bold' : 'normal', // Bold if completed
                      fontStyle: todo.completed ? 'italic' : 'normal', // Italic if completed
                      fontSize: todo.completed ? '1.2rem' : '1rem', // Bigger text if completed
                      color: todo.completed ? 'whitesmoke' : 'white', // White for non-completed, whitesmoke for completed
                    }}
                  >
                    {todo.text}
                  </span>
                  
                  
                  
                  )}
                </td>
                <td>
                  <button onClick={() => toggleTodo(index)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  {editIndex === index ? (
                    <button onClick={() => handleEditSave(index)}>Save</button>
                  ) : (
                    <button onClick={() => setEditIndex(index) & setNewText(todo.text)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => deleteTodo(index)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoList;

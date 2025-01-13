import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={value}
          placeholder="Add a new todo"
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;

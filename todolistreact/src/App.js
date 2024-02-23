import React, { useState, useEffect } from 'react';
import './index.css';
import 'boxicons/css/boxicons.min.css';
function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('Tasks'))
    return storedTasks ?? []
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(taskList));
  }, [taskList])

  const handleInputChange = e => {
    setTask(e.target.value)
    setError(false)
  }
  const handleAdd = () => {
    if (task.trim() !== '') {
      setTaskList(prev => [...prev, { name: task, completed: false }]);
    } else {
      setError(true)
    }
    setTask('')
  }

  const handleEdit = (task, index) => {
    setTask(task.name)
    handleDelete(index)
  }

  const handleDelete = (index) => {
    setTaskList(prev => {
      const todoList = [...prev]
      todoList.splice(index, 1)
      return todoList
    })
  }

  const handleComplete = (index) => {
    setTaskList(prev => {
      const todoList = [...prev];
      todoList[index] = { ...todoList[index], completed: !todoList[index].completed };

      return todoList;
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <div className="todo-list">
      <div className="todo-list__title">
        <i className='bx bx-notepad'></i>
        <h2>TO-DO LIST</h2>
      </div>
      <div className="todo-list__add-text">
        <input
          value={task}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          id="input-textbox"
          placeholder="Nhập nội dung..."
        />
        <button onClick={handleAdd} type='submit' className="btn-add">Thêm</button>
      </div>
      {error && <div style={{ display: 'block' }} className="todo-list__show-error">Vui lòng nhập nội dung!</div>}
      <ul className="todo-list__list">
        {taskList.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              onChange={() => handleComplete(index)}
              type="checkbox"
              id={`input-checkbox-${index}`}
              checked={task.completed}
            />
            <label
              className='text-label'
              htmlFor={`input-checkbox-${index}`}
            >{task.name}</label>
            <i onClick={() => handleEdit(task, index)} className='bx bx-edit edit'></i>
            <i onClick={() => handleDelete(index)} className='bx bx-trash delete'></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
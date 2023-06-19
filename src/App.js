import React, { useState, useEffect } from 'react';
import './index.css';
import MemoContent from './Memo.js';
import ProfileContent from './Profile.js';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDays, setNewTodoDays] = useState('');
  const [todos, setTodos] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [todayProgress, setTodayProgress] = useState(0);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Math.random(),
        text: newTodo,
        completed: false,
        deadline: null
      };

      if (!isNaN(newTodoDays)) {
        const today = new Date();
        const maxDate = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);

        const selectedDays = Math.min(parseInt(newTodoDays), 21);
        const deadline = new Date(today.getTime() + selectedDays * 24 * 60 * 60 * 1000);

        if (deadline <= maxDate) {
          newTodoItem.deadline = deadline.toISOString().split('T')[0];
        }
      }

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNewTodoDays('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const calculateProgress = (todoList) => {
    if (todoList.length === 0) {
      return 0;
    }

    const completedCount = todoList.filter((todo) => todo.completed).length;
    const totalTodoCount = todoList.length;
    const progressPercentage = (completedCount / totalTodoCount) * 100;

    return Math.round(progressPercentage);
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDaysChange = (e) => {
    setNewTodoDays(e.target.value);
  };

  useEffect(() => {
    const updatedProgress = calculateProgress(todos);
    setProgress(updatedProgress);
  }, [todos]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTodos = todos.filter((todo) => todo.deadline === today);
    const updatedTodayProgress = calculateProgress(todayTodos);

    setTodayTodos(todayTodos);
    setTodayProgress(updatedTodayProgress);
  }, [todos]);

  return (
    <div>
      {currentPage === 'main' && (
        <div className="App">
          <h1>Todo List</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="해야 할 일을 입력하세요"
              value={newTodo}
              onChange={handleInputChange}
            />
            <input
              type="number"
              min="1"
              max="21"
              placeholder="최대 21일 설정 가능"
              value={newTodoDays}
              onChange={handleDaysChange}
            />
            <button onClick={addTodo}>추가</button>
          </div>
          <div className="days">
            <div className="daysin">
              <h3>21일</h3>
              <p>우리의 뇌가 새로운 행동에 익숙해지는 데 걸리는 최소한의 시간</p>
            </div>
          </div>
          <div className="tabs">
            <div className="tab">
              <h2>전체 할일</h2>
              <div className="todos-container">
                {todos.map((todo) => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                    <span className="todo-deadline">{todo.deadline}</span>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </div>
                ))}
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ transform: `rotate(${progress}deg)` }}
                ></div>
                <div className="progress-text">{progress}%</div>
              </div>
            </div>
            <div className="tab">
              <h2>오늘의 할일</h2>
              <div className="todos-container">
                {todayTodos.map((todo) => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                    <span className="todo-deadline">{todo.deadline}</span>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </div>
                ))}
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ transform: `rotate(${todayProgress}deg)` }}
                ></div>
                <div className="progress-text">{todayProgress}%</div>
              </div>
            </div>
          </div>
          <div className='button-list'>
            <button onClick={() => navigateToPage('main')}>Todo List</button>
            <button onClick={() => navigateToPage('Memo')}>Memo</button>
            <button onClick={() => navigateToPage('Profile')}>Profile</button>
          </div>
        </div>
      )}
      {currentPage === 'Memo' && (
        <div>
          <MemoContent />
          <div className='button-list'>
            <button onClick={() => navigateToPage('main')}>Todo List</button>
            <button onClick={() => navigateToPage('Memo')}>Memo</button>
            <button onClick={() => navigateToPage('Profile')}>Profile</button>
          </div>
        </div>
      )}
      {currentPage === 'Profile' && (
        <div>
          <ProfileContent />
          <div className='button-list'>
            <button onClick={() => navigateToPage('main')}>Todo List</button>
            <button onClick={() => navigateToPage('Memo')}>Memo</button>
            <button onClick={() => navigateToPage('Profile')}>Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;

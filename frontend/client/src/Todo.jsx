import React, { useEffect, useState } from 'react';
import './App.css';
import { http } from './http';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', content: '' });
  const [token, setToken] = useState('');

  useEffect(() => {
    // ログインしてトークンを取得
    http.post('/login', {
      username: 'testuser',
      password: 'password'
    })
    .then(response => {
      setToken(response.data.token);
    })
    .catch(error => {
      console.error('ログインエラー:', error);
    });
  }, []);

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = () => {
    http.get('/articles', {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setTodos(response.data);
    })
    .catch(error => {
      console.error('Todo取得エラー:', error);
    });
  };

  const createTodo = () => {
    http.post('/articles', newTodo, {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setTodos([...todos, response.data]);
      console.log(response.data);
      setNewTodo({ title: '', content: '' });
    })
    .catch(error => {
      console.error('Todo作成エラー:', error);
    });
  };

  const updateTodo = (id, updatedTodo) => {
    http.put(`/articles/${id}`, updatedTodo, {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    })
    .catch(error => {
      console.error('Todo更新エラー:', error);
    });
  };

  const deleteTodo = (id) => {
    http.delete(`/articles/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    })
    .catch(error => {
      console.error('Todo削除エラー:', error);
    });
  };

  return (
    <div>
      <h1>Todo一覧</h1>
      <div className='input-back'>
        <input
          type="text"
          placeholder="タイトル"
          value={newTodo.title}
          onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="詳細"
          value={newTodo.content}
          onChange={e => setNewTodo({ ...newTodo, content: e.target.value })}
        />
        <button onClick={createTodo}>Todoを作成する</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h2>{todo.Title}</h2>
            <p>{todo.content}</p>
            <button onClick={() => updateTodo(todo.id, { title: `着手中：${todo.Title}`, content: `${todo.Title}` })}>
              着手
            </button>
            <button onClick={() => deleteTodo(todo.id)}>完了</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
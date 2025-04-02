import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import EditTodoModal from '../components/EditTodoModal';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos'); 
      const data = await res.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch todos');
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();
      setTodos([data, ...todos]);
      setNewTodo({ title: '', description: '' });
      showNotification('New todo added!');
    } catch (error) {
      setError('Failed to add todo');
    }
  };

  const toggleTodoStatus = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const res = await fetch(`/api/todos/${todo._id}`, { // Changed from todo.id to todo._id to match new backend data structure (likely MongoDB) that uses _id as the identifier
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      const data = await res.json();
      setTodos(todos.map(t => (t._id === todo._id ? data : t))); // Changed from t.id to t._id for consistency with new ID format
    } catch (error) {
      setError('Failed to update todo status');
    }
  };

  const deleteTodo = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' }); // Parameter remains 'id' but now expects _id values from the TodoList component

      if (res.ok) {
        setTodos(todos.filter(todo => todo._id !== id)); // Changed from t.id to todo._id to match new ID format
        showNotification('Todo deleted!');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to delete todo');
      }
    } catch (error) {
      setError('Failed to delete todo');
    }
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!editingTodo || !editingTodo.title.trim()) return;

    try {
      const res = await fetch(`/api/todos/${editingTodo._id}`, { // Changed from editingTodo.id to editingTodo._id to match new backend data structure
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTodo),
      });

      const data = await res.json();
      setTodos(todos.map(t => (t._id === editingTodo._id ? data : t))); // Changed from t.id to t._id for consistency
      setEditingTodo(null);
      showNotification('Todo updated!');
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo application" />
        <link rel="icon" href="/favmin (2).png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo List</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {notification && (
          <div className={styles.notificationOverlay}>{notification}</div> // Changed to overlay
        )}
        
        <AddTodoForm 
          newTodo={newTodo} 
          setNewTodo={setNewTodo} 
          addTodo={addTodo} 
        />
        
        {editingTodo && (
          <EditTodoModal 
            editingTodo={editingTodo} 
            setEditingTodo={setEditingTodo} 
            updateTodo={updateTodo} 
          />
        )}
        
        <TodoList 
          todos={todos} 
          loading={loading} 
          deleteTodo={deleteTodo} 
          toggleTodoStatus={toggleTodoStatus} 
          setEditingTodo={setEditingTodo} 
        />
      </main>
    </div>
  );
}
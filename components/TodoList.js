import styles from '../styles/Components.module.css';

export default function TodoList({ todos, loading, deleteTodo, toggleTodoStatus, setEditingTodo }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={styles.todoList}>
      <h2>Your Todos</h2>
      {loading ? (
        <p className={styles.loading}>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className={styles.emptyList}>No todos yet. Add one above!</p>
      ) : (
        todos.map(todo => (
          <div 
            key={todo.id} 
            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
          >
            <div className={styles.todoContent}>
              <div className={styles.todoHeader}>
                <h3>{todo.title}</h3>
                <div className={styles.todoActions}>
                  <button 
                    className={styles.btnIcon}
                    onClick={() => setEditingTodo(todo)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className={styles.btnIcon} 
                    onClick={() => deleteTodo(todo._id)} // Changed from todo.id to todo._id to match new backend data structure (likely MongoDB) that uses _id as the identifier
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {todo.description && <p className={styles.todoDescription}>{todo.description}</p>}
              <div className={styles.todoMeta}>
                <small>Created: {formatDate(todo.created_at)}</small>
                <label className={styles.statusToggle}>
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => toggleTodoStatus(todo)}
                  />
                  {todo.completed ? 'Completed' : 'Mark Complete'}
                </label>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
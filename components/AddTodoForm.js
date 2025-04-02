import styles from '../styles/Components.module.css';

export default function AddTodoForm({ newTodo, setNewTodo, addTodo }) {
  return (
    <form onSubmit={addTodo} className={styles.todoForm}>
      <h2>Add New Todo</h2>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
        ></textarea>
      </div>
      <button type="submit" className={styles.btn}>Add Todo</button>
    </form>
  );
} 
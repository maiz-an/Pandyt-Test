import styles from '../styles/Components.module.css';

export default function EditTodoModal({ editingTodo, setEditingTodo, updateTodo }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Todo</h2>
        <form onSubmit={updateTodo}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Title"
              value={editingTodo.title}
              onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Description"
              value={editingTodo.description}
              onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
            ></textarea>
          </div>
          <div className={`${styles.formGroup} ${styles.checkbox}`}>
            <label>
              <input
                type="checkbox"
                checked={editingTodo.completed}
                onChange={(e) => setEditingTodo({...editingTodo, completed: e.target.checked})}
              />
              Completed
            </label>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.btn}>Save</button>
            <button 
              type="button" 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => setEditingTodo(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
import styles from './TodoHeader.module.css';

export default function TodoHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}></div>
      </div>
    </header>
  );
} 
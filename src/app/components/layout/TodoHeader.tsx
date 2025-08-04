import Link from 'next/link';
import styles from './TodoHeader.module.css';

export default function TodoHeader() {
  return (
    <div className={styles.headerContent}>
      <Link href="/" className={styles.logo}></Link>
    </div>
  );
} 
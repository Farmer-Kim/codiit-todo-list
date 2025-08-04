'use client';

import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { TodoItemProps } from '@/types/todo';
import styles from './TodoItem.module.css';

const TodoItem = memo<TodoItemProps>(({ todo, onToggle, mode = "simple" }) => {
  const router = useRouter();

  const handleItemClick = () => {
    if (mode === "simple") {
      router.push(`/items/${todo.id}`);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  return (
    <div 
      className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ''} ${mode === 'detail' ? styles.detailMode : ''}`}
      onClick={handleItemClick}
    >
      <div className={styles.content}>
        <button
          className={`${styles.checkbox} ${todo.isCompleted ? styles.checked : ''}`}
          onClick={handleToggle}
          aria-label={todo.isCompleted ? '완료 취소' : '완료'}
        />
        <span className={styles.text}>{todo.name}</span>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem; 
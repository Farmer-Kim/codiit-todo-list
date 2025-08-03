'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TodoItem.module.css';
import { Todo } from '../page';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  mode?: 'simple' | 'detail';
}

export default function TodoItem({ todo, onToggle, mode = 'detail' }: TodoItemProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (mode === 'detail') {
      setIsEditing(true);
      setEditText(todo.text);
    }
  };

  const handleSave = () => {
    // 편집 기능은 별도 버튼으로 구현 예정
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleItemClick = () => {
    if (mode === 'simple') {
      router.push(`/items/${todo.id}`);
    }
  };

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''} ${mode === 'simple' ? styles.simple : ''}`}>
      <div
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={() => onToggle(todo.id)}
        role="button"
        tabIndex={0}
        aria-label={todo.completed ? '완료 취소' : '완료'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(todo.id);
          }
        }}
      ></div>
      
      <div className={styles.content}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
          />
        ) : (
          <span 
            className={styles.text} 
            onDoubleClick={handleEdit}
            onClick={handleItemClick}
            style={{ cursor: mode === 'simple' ? 'pointer' : 'text' }}
          >
            {todo.text}
          </span>
        )}
      </div>
    </div>
  );
} 
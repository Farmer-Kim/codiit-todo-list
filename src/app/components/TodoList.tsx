'use client';

import { useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';
import { Todo } from '../page';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
  type?: 'todo' | 'done';
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo, type = 'todo' }: TodoListProps) {
  if (todos.length === 0) {
    if (type === 'todo') {
      return (
        <div className={`${styles.emptyState} ${styles.emptyTodo}`}>
          <div className={styles.emptyImage}></div>
          <p className={styles.emptyText}>
            할 일이 없어요. <br />
            TODO를 새롭게 추가해주세요!
          </p>
        </div>
      );
    } else {
      return (
        <div className={`${styles.emptyState} ${styles.emptyDone}`}>
          <div className={styles.emptyImage}></div>
          <p className={styles.emptyText}>
            아직 다 한 일이 없어요. <br />
            해야 할 일을 체크해보세요!
          </p>
        </div>
      );
    }
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
} 
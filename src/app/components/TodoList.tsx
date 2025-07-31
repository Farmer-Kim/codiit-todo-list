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
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>할 일이 없습니다</p>
      </div>
    );
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
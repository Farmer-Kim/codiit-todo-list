'use client';

import React, { memo } from 'react';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from '@/types/todo';
import styles from './TodoList.module.css';

const TodoList = memo<TodoListProps>(({ todos, onToggleTodo, type, mode = "simple" }) => {
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
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          mode={mode}
        />
      ))}
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList; 
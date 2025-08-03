'use client';

import { useState } from 'react';
import styles from './page.module.css';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import TodoHeader from './components/TodoHeader';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  memo?: string;
  imageUrl?: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: '비타민 챙겨 먹기',
      completed: false
    },
    {
      id: '2', 
      text: '운동하기',
      completed: true
    },
    {
      id: '3',
      text: '독서하기',
      completed: false
    },
    {
      id: '4',
      text: '장보기',
      completed: true
    },
    {
      id: '5',
      text: '코딩 공부하기',
      completed: false
    }
  ]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
    }
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className={styles.contents}>
      <div className={styles.body}>
        <TodoInput onAddTodo={addTodo} />
        
        <div className={styles.content}>
          <div className={styles.todoSection}>
            <div className={`${styles.sectionTitle} ${styles.todoTitle}`}></div>
            <TodoList
              todos={activeTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onEditTodo={editTodo}
              type="todo"
              mode="simple"
            />
          </div>
          
          <div className={styles.doneSection}>
            <div className={`${styles.sectionTitle} ${styles.doneTitle}`}></div>
            <TodoList
              todos={completedTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onEditTodo={editTodo}
              type="done"
              mode="simple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

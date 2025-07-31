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
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
    <div className={styles.container}>
      <div className={styles.header}>
        <TodoHeader />
      </div>
      
      <div className={styles.contents}>
        <div className={styles.body}>
          <TodoInput onAddTodo={addTodo} />
          
          <div className={styles.content}>
            <div className={styles.todoSection}>
              <h2 className={styles.sectionTitle}>TO DO</h2>
              <TodoList
                todos={activeTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            </div>
            
            <div className={styles.doneSection}>
              <h2 className={styles.sectionTitle}>DONE</h2>
              <TodoList
                todos={completedTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

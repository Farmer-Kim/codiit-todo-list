'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import TodoList from './components/Todo/TodoList';
import TodoInput from './components/Todo/TodoInput';
import { fetchTodos, addTodo, updateTodo } from '@/lib/api';
import { Todo } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        console.log('API Response:', data);
        setTodos(data || []);
        setError(null);
      } catch (err) {
        setError('Todo 목록을 불러오는데 실패했습니다.');
        console.error('Failed to load todos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialTodos();
  }, []);

  const handleAddTodo = async (name: string) => {
    if (name.trim()) {
      try {
        const newTodo = await addTodo(name.trim());
        setTodos([...todos, newTodo]);
      } catch (err) {
        setError('Todo 추가에 실패했습니다.');
        console.error('Failed to add todo:', err);
      }
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const updatedTodo = await updateTodo(id, { isCompleted: !todo.isCompleted });
        setTodos(todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        ));
      }
    } catch (err) {
      setError('Todo 상태 변경에 실패했습니다.');
      console.error('Failed to toggle todo:', err);
    }
  };

  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  if (loading) {
    return (
      <div className={styles.contents}>
        <div className={styles.body}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            로딩 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.contents}>
        <div className={styles.body}>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contents}>
      <div className={styles.body}>
        <TodoInput onAddTodo={handleAddTodo} />
        
        <div className={styles.content}>
          <div className={styles.todoSection}>
            <div className={`${styles.sectionTitle} ${styles.todoTitle}`}></div>
            <TodoList
              todos={activeTodos}
              onToggleTodo={toggleTodo}
              type="todo"
              mode="simple"
            />
          </div>
          
          <div className={styles.doneSection}>
            <div className={`${styles.sectionTitle} ${styles.doneTitle}`}></div>
            <TodoList
              todos={completedTodos}
              onToggleTodo={toggleTodo}
              type="done"
              mode="simple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

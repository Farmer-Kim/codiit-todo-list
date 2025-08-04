'use client';

import { useState } from 'react';
import TodoItem from '../components/Todo/TodoItem';
import { Todo } from '@/types/todo';
import styles from './page.module.css';

export default function TodoTestPage() {
  const [viewMode, setViewMode] = useState<'simple' | 'detail'>('detail');
  
  // 테스트용 Todo 데이터
  const testTodos: Todo[] = [
    {
      id: 1,
      name: '비타민 챙겨 먹기',
      isCompleted: false
    },
    {
      id: 2, 
      name: '운동하기',
      isCompleted: true
    },
    {
      id: 3,
      name: '독서하기',
      isCompleted: false
    },
    {
      id: 4,
      name: '장보기',
      isCompleted: true
    }
  ];

  const [todos, setTodos] = useState<Todo[]>(testTodos);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>TodoItem 모드 테스트</h1>
        <p className={styles.description}>
          단순 모드와 디테일 모드의 차이점을 확인해보세요
        </p>
      </div>

      <div className={styles.content}>
        {/* 모드 토글 버튼 */}
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeButton} ${viewMode === 'detail' ? styles.active : ''}`}
            onClick={() => setViewMode('detail')}
          >
            디테일 모드
          </button>
          <button
            className={`${styles.modeButton} ${viewMode === 'simple' ? styles.active : ''}`}
            onClick={() => setViewMode('simple')}
          >
            단순 모드
          </button>
        </div>

        {/* 현재 모드 표시 */}
        <div className={styles.modeInfo}>
          <span className={styles.modeLabel}>현재 모드:</span>
          <span className={styles.modeValue}>
            {viewMode === 'detail' ? '디테일 모드' : '단순 모드'}
          </span>
        </div>

        {/* TodoItem 테스트 */}
        <div className={styles.testSection}>
          <h2 className={styles.sectionTitle}>TodoItem 테스트</h2>
          <div className={styles.todoList}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                mode={viewMode}
              />
            ))}
          </div>
        </div>

        {/* 모드별 특징 설명 */}
        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>모드별 특징</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>디테일 모드</h3>
              <ul className={styles.infoList}>
                <li>더 넓은 패딩과 두꺼운 테두리</li>
                <li>편집 가능한 텍스트 (더블클릭)</li>
                <li>더 큰 체크박스</li>
                <li>호버 효과 강화</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>단순 모드</h3>
              <ul className={styles.infoList}>
                <li>컴팩트한 패딩과 얇은 테두리</li>
                <li>읽기 전용 텍스트</li>
                <li>작은 체크박스</li>
                <li>간소화된 호버 효과</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
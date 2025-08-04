'use client';

import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { TodoItemProps } from '@/types/todo';
import styles from './TodoItem.module.css';

/**
 * TodoItem 컴포넌트
 * 
 * 할 일 항목을 표시하는 컴포넌트입니다.
 * 두 가지 모드를 지원합니다:
 * - simple: 간단한 리스트 뷰 (클릭 시 상세 페이지로 이동)
 * - detail: 상세 뷰 (클릭 시 아무 동작 안함)
 * 
 * @param todo - 표시할 할 일 객체
 * @param onToggle - 완료 상태 토글 함수
 * @param mode - 표시 모드 ("simple" | "detail"), 기본값: "simple"
 */
const TodoItem = memo<TodoItemProps>(({ todo, onToggle, mode = "simple" }) => {
  const router = useRouter();

  /**
   * 할 일 항목 클릭 핸들러
   * simple 모드에서만 상세 페이지로 이동
   */
  const handleItemClick = () => {
    if (mode === "simple") {
      router.push(`/items/${todo.id}`);
    }
    // detail 모드에서는 클릭해도 아무것도 하지 않음
  };

  /**
   * 완료 상태 토글 핸들러
   * 이벤트 버블링 방지
   */
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  return (
    <div 
      className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ''} ${mode === 'simple' ? styles.simple : ''}`}
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
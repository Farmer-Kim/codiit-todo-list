'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './page.module.css';
import { Todo } from '../../page';

export default function TodoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.itemId as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [editMemo, setEditMemo] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // 실제로는 API에서 데이터를 가져와야 하지만, 여기서는 로컬 스토리지나 상태에서 가져옵니다
  useEffect(() => {
    // 임시로 하드코딩된 데이터 사용
    const mockTodo: Todo = {
      id: itemId,
      text: '비타민 챙겨 먹기',
      completed: false,
      memo: '매일 아침 식후 30분 후에 복용하기',
      imageUrl: ''
    };
    setTodo(mockTodo);
    setEditText(mockTodo.text);
    setEditMemo(mockTodo.memo || '');
  }, [itemId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일명 영어 체크
      if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
        alert('이미지 파일명은 영어만 사용 가능합니다.');
        return;
      }

      setSelectedImage(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!todo) return;

    const updatedTodo: Todo = {
      ...todo,
      text: editText,
      memo: editMemo,
      imageUrl: imagePreview || todo.imageUrl
    };

    // 실제로는 API 호출로 업데이트
    console.log('Updated todo:', updatedTodo);
    
    setIsEditing(false);
    setTodo(updatedTodo);
    
    // 할 일 목록 페이지로 이동
    router.push('/');
  };

  const handleDelete = () => {
    if (confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      // 실제로는 API 호출로 삭제
      console.log('Deleted todo:', itemId);
      
      // 할 일 목록 페이지로 이동
      router.push('/');
    }
  };

  const handleToggleStatus = () => {
    if (!todo) return;
    
    setTodo({
      ...todo,
      completed: !todo.completed
    });
  };

  if (!todo) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>할 일 상세 페이지</h1>
        <button 
          className={styles.backButton}
          onClick={() => router.push('/')}
        >
          ← 목록으로 돌아가기
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.todoCard}>
          <div className={styles.todoHeader}>
            <h2 className={styles.todoTitle}>할 일 수정</h2>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '취소' : '수정하기'}
            </button>
          </div>

          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>할 일 제목</label>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={styles.textInput}
                  placeholder="할 일을 입력하세요"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>상태</label>
                <div className={styles.statusToggle}>
                  <button
                    className={`${styles.statusButton} ${!todo.completed ? styles.active : ''}`}
                    onClick={() => setTodo({...todo, completed: false})}
                  >
                    진행 중
                  </button>
                  <button
                    className={`${styles.statusButton} ${todo.completed ? styles.active : ''}`}
                    onClick={() => setTodo({...todo, completed: true})}
                  >
                    완료
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>메모</label>
                <textarea
                  value={editMemo}
                  onChange={(e) => setEditMemo(e.target.value)}
                  className={styles.memoInput}
                  placeholder="메모를 입력하세요"
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이미지 첨부</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                <p className={styles.fileInfo}>
                  • 파일명은 영어만 사용 가능합니다<br/>
                  • 파일 크기는 5MB 이하여야 합니다
                </p>
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="미리보기" />
                  </div>
                )}
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.saveButton}
                  onClick={handleSave}
                >
                  수정 완료
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.todoInfo}>
              <div className={styles.infoRow}>
                <span className={styles.label}>제목:</span>
                <span className={styles.value}>{todo.text}</span>
              </div>
              
              <div className={styles.infoRow}>
                <span className={styles.label}>상태:</span>
                <span className={`${styles.status} ${todo.completed ? styles.completed : styles.inProgress}`}>
                  {todo.completed ? '완료' : '진행 중'}
                </span>
              </div>
              
              {todo.memo && (
                <div className={styles.infoRow}>
                  <span className={styles.label}>메모:</span>
                  <span className={styles.value}>{todo.memo}</span>
                </div>
              )}
              
              {todo.imageUrl && (
                <div className={styles.infoRow}>
                  <span className={styles.label}>첨부 이미지:</span>
                  <div className={styles.imageContainer}>
                    <img src={todo.imageUrl} alt="첨부 이미지" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.deleteSection}>
          <h3 className={styles.deleteTitle}>할 일 삭제</h3>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
} 
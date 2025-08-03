'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './page.module.css';
import { Todo } from '../../page';
import TodoItem from '@/app/components/TodoItem';

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

  useEffect(() => {
    const mockTodo: Todo = {
      id: itemId,
      text: '비타민 챙겨 먹기',
      completed: false,
      memo: '오메가 3, 프로폴리스, 아연 챙겨먹기',
      imageUrl: ''
    };
    setTodo(mockTodo);
    setEditText(mockTodo.text);
    setEditMemo(mockTodo.memo || '');
  }, [itemId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
        alert('이미지 파일명은 영어만 사용 가능합니다.');
        return;
      }

      setSelectedImage(file);
      
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

    console.log('Updated todo:', updatedTodo);
    
    setIsEditing(false);
    setTodo(updatedTodo);
    
    router.push('/');
  };

  const handleDelete = () => {
    if (confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      console.log('Deleted todo:', itemId);
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
    <div className={styles.content}>
      <div className={styles.todoCard}>
        {/* 할 일 항목 */}
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleStatus}
          // onDelete={onDeleteTodo}
          // onEdit={onEditTodo}
          mode="detail"
        />

        {/* 이미지 업로드와 메모 섹션 */}
        <div className={styles.sectionsContainer}>
                     {/* 이미지 업로드 섹션 */}
           <div className={styles.imageSection}>
             <div className={styles.uploadArea}>
               {imagePreview ? (
                 <div className={styles.imagePreview}>
                   <img src={imagePreview} alt="미리보기" />
                 </div>
               ) : (
                 <div className={styles.uploadPlaceholder}>
                   <div className={styles.uploadIcon}></div>
                 </div>
               )}
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageChange}
                 className={styles.hiddenFileInput}
                 id="imageUpload"
               />
               <button 
                 className={styles.uploadButton}
                 onClick={() => document.getElementById('imageUpload')?.click()}
               >
               </button>
               <label htmlFor="imageUpload" className={styles.uploadLabel}>
                 이미지 업로드
               </label>
             </div>
           </div>

                     {/* 메모 섹션 */}
           <div className={styles.memoSection}>
             <div className={styles.memoHeader}>
               <span className={styles.memoTitle}>Memo</span>
             </div>
             <div className={styles.memoTextareaContainer}>
               <textarea
                 value={editMemo}
                 onChange={(e) => setEditMemo(e.target.value)}
                 className={styles.memoTextarea}
                 placeholder="메모를 입력하세요"
                 rows={4}
               />
             </div>
           </div>
        </div>

        {/* 액션 버튼들 */}
        <div className={styles.actionButtons}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
          >
            ✓ 수정 완료
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            ✕ 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
} 
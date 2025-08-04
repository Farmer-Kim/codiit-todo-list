'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/app/components/ui/Button/Button';
import TodoItem from '@/app/components/Todo/TodoItem';
import { fetchTodo, updateTodo, deleteTodo, uploadImage } from '@/lib/api';
import { Todo } from '@/types/todo';
import styles from './page.module.css';

export default function TodoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.itemId as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editText, setEditText] = useState('');
  const [editMemo, setEditMemo] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    loadTodo();
  }, [itemId]);

  const loadTodo = async () => {
    try {
      setLoading(true);
      console.log('Fetching todo with ID:', itemId);
      const todoData = await fetchTodo(parseInt(itemId));
      console.log('Todo API Response:', todoData);
      setTodo(todoData);
      setEditText(todoData.name);
      setEditMemo(todoData.memo || '');
      setImagePreview(todoData.imageUrl || '');
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todo를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('Failed to load todo:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    if (!todo) return;

    try {
      let imageUrl = todo.imageUrl;
      
      // 새로 선택된 이미지가 있으면 업로드
      if (selectedImage) {
        const uploadResult = await uploadImage(selectedImage);
        imageUrl = uploadResult.url;
      }

      const updatedTodo = await updateTodo(todo.id, {
        name: editText,
        memo: editMemo,
        imageUrl: imageUrl
      });

      console.log('Updated todo:', updatedTodo);
      

      setTodo(updatedTodo);
      
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todo 수정에 실패했습니다.';
      setError(errorMessage);
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async () => {
    if (confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      try {
        await deleteTodo(todo!.id);
        console.log('Deleted todo:', itemId);
        router.push('/');
          } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todo 삭제에 실패했습니다.';
      setError(errorMessage);
      console.error('Failed to delete todo:', err);
    }
    }
  };

  const handleToggleStatus = async () => {
    if (!todo) return;
    
    try {
      const updatedTodo = await updateTodo(todo.id, {
        isCompleted: !todo.isCompleted
      });
      
      setTodo(updatedTodo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Todo 상태 변경에 실패했습니다.';
      setError(errorMessage);
      console.error('Failed to toggle todo:', err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.content}>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          {error}
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className={styles.content}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Todo를 찾을 수 없습니다.
        </div>
      </div>
    );
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
                   <img 
                     src={imagePreview} 
                     alt="미리보기" 
                     loading="lazy"
                     onError={(e) => {
                       console.error('Image load error:', e);
                       setImagePreview('');
                     }}
                   />
                   <div 
                     className={styles.editIcon}
                     onClick={() => document.getElementById('imageUpload')?.click()}
                   ></div>
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
                 className={`${styles.uploadButton} ${imagePreview ? styles.editButton : ''}`}
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

        <Button 
            variant={imagePreview || editMemo.trim() ? "success" : "secondary"}
            onClick={handleSave}
            iconType="check"
          >
            수정 완료
          </Button>  

        <Button 
            variant="danger" 
            onClick={handleDelete}
            iconType="x"
          >
            삭제하기
          </Button>
          
        </div>
      </div>
    </div>
  );
} 
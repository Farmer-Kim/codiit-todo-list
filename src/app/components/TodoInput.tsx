'use client';

import { useState } from 'react';
import Button from './Button/Button';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="할 일을 입력해주세요"
          className={styles.input}
        />
         <Button
            variant="secondary" 
            onClick={() => {}}
            iconType="plus"
          >
          추가하기
        </Button>
      </div>
    </div>
  );
} 
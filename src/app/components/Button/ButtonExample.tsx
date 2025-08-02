'use client';

import React from 'react';
import Button from './Button';
import styles from './ButtonExample.module.css';

const ButtonExample: React.FC = () => {
  const handleClick = (action: string) => {
    console.log(`${action} 버튼이 클릭되었습니다!`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>버튼 컴포넌트 예시</h2>
      
      <div className={styles.section}>
        <h3>기본 버튼들</h3>
        <div className={styles.buttonGrid}>
          <Button 
            variant="secondary" 
            onClick={() => handleClick('추가하기')}
            iconType="plus"
          >
            추가하기
          </Button>
          
          <Button 
            variant="primary" 
            onClick={() => handleClick('추가하기')}
            iconType="plus"
          >
            추가하기
          </Button>
          
          <Button 
            variant="danger" 
            onClick={() => handleClick('삭제하기')}
            iconType="x"
          >
            삭제하기
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => handleClick('수정 완료')}
            iconType="check"
          >
            수정 완료
          </Button>          
          <Button 
            variant="success" 
            onClick={() => handleClick('수정 완료')}
            iconType="check"
          >
            수정 완료
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>아이콘만 있는 버튼들</h3>
        <div className={styles.buttonGrid}>
          <Button 
            variant="secondary" 
            iconOnly
            onClick={() => handleClick('추가')}
            iconType="plus"
          />
          
          <Button 
            variant="primary" 
            iconOnly
            onClick={() => handleClick('추가')}
            iconType="plus"
          />
          
          <Button 
            variant="danger" 
            iconOnly
            onClick={() => handleClick('삭제')}
            iconType="x"
          />
          
          <Button 
            variant="success" 
            iconOnly
            onClick={() => handleClick('완료')}
            iconType="check"
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3>비활성화된 버튼들</h3>
        <div className={styles.buttonGrid}>
          <Button 
            variant="secondary" 
            disabled
            onClick={() => handleClick('비활성화')}
          >
            비활성화
          </Button>
          
          <Button 
            variant="primary" 
            disabled
            onClick={() => handleClick('비활성화')}
          >
            비활성화
          </Button>
          
          <Button 
            variant="danger" 
            disabled
            onClick={() => handleClick('비활성화')}
          >
            비활성화
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample; 
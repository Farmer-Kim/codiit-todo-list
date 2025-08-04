'use client';

import React from 'react';
import styles from './Button.module.css';

/**
 * Button 컴포넌트 Props 인터페이스
 */
export interface ButtonProps {
  /** 버튼 내부 콘텐츠 */
  children?: React.ReactNode;
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  /** 버튼 크기 */
  size?: 'small' | 'large';
  /** 아이콘 타입 */
  iconType?: 'plus' | 'check' | 'x' | 'edit';
  /** 아이콘만 표시 여부 */
  iconOnly?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 활성화 상태 */
  active?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button 컴포넌트
 * 
 * 재사용 가능한 버튼 컴포넌트입니다.
 * 다양한 스타일, 크기, 아이콘을 지원합니다.
 * 
 * @param children - 버튼 내부 콘텐츠
 * @param variant - 버튼 스타일 변형 (기본값: 'secondary')
 * @param size - 버튼 크기 (기본값: 'small')
 * @param iconType - 아이콘 타입
 * @param iconOnly - 아이콘만 표시 여부 (기본값: false)
 * @param disabled - 비활성화 여부 (기본값: false)
 * @param active - 활성화 상태 (기본값: false)
 * @param onClick - 클릭 핸들러
 * @param className - 추가 CSS 클래스
 * @param type - 버튼 타입 (기본값: 'button')
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'small',
  iconType,
  iconOnly = false,
  disabled = false,
  active = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    iconType && styles[`icon-${iconType}`],
    iconOnly && styles.
    iconOnly,
    disabled && styles.disabled,
    active && styles.active,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};

export default Button; 
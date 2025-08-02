'use client';

import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'large';
  iconType?: 'plus' | 'check' | 'x' | 'edit';
  iconOnly?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

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
    iconOnly && styles.iconOnly,
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
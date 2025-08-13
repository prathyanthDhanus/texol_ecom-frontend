import React from 'react';
import type { InputProps } from './types';
import './styles.css';

const Input: React.FC<InputProps> = ({
  name,
  label,
  error,
  className = '',
  validationSchema,
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        className={`input-field ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
import React from 'react';
import type { DropdownProps } from './types';
import './styles.css';

const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  options,
  error,
  className = '',
  validationSchema,
  ...props
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        className={`select-field ${error ? 'error' : ''}`}
        {...props}
      >
        {props.placeholder && (
          <option value="" disabled selected>
            {props.placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Dropdown;
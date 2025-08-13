import React, { useState } from 'react';
import type { SearchInputProps } from './types';
import './styles.css';

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  label,
  error,
  className = '',
  onSearch,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSearch} className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="search-container">
        <input
          id={name}
          name={name}
          className={`search-field ${error ? 'error' : ''}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          {...props}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </form>
  );
};

export default SearchInput;
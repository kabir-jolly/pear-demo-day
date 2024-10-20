import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const placeholders = ['companies', 'keywords', 'industries', 'founders'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentWord = '';
    let currentIndex = 0;
    let isTypingDots = false;

    const typingInterval = setInterval(() => {
      if (!isTypingDots && currentIndex < placeholders[placeholderIndex].length) {
        currentWord += placeholders[placeholderIndex][currentIndex];
        setCurrentPlaceholder(currentWord);
        currentIndex++;
      } else if (!isTypingDots) {
        isTypingDots = true;
        currentIndex = 0;
      } else if (currentIndex < 3) {
        currentWord += '.';
        setCurrentPlaceholder(currentWord);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [placeholderIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={`Search ${currentPlaceholder}`}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="clear-button" onClick={handleClear}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

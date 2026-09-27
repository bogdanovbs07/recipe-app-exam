import React from 'react';

const Header = ({ searchTerm, setSearchTerm, onAddClick }) => {
  return (
    <header className="header">
      <h1>Книга рецептов</h1>
      <div className="controls">
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Поиск рецептов..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>
        <button className="add-btn" onClick={onAddClick}>+ Добавить</button>
      </div>
    </header>
  );
};

export default Header;

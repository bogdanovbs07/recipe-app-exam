import React from 'react';

const Tabs = ({ categories, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      {categories.map(cat => (
        <button 
          key={cat} 
          className={`tab ${activeTab === cat ? 'active' : ''}`}
          onClick={() => onTabChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

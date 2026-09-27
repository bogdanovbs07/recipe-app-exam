import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import Modal from './components/Modal';
import ConfirmModal from './components/ConfirmModal';
import Tabs from './components/Tabs';
import { initialRecipes } from './data/initialRecipes';
import './App.css';

const CATEGORIES = ['Все', 'Основные блюда', 'Десерты', 'Салаты', 'Избранное'];

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });
  
  const [activeTab, setActiveTab] = useState('Все');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    if (activeTab === 'Избранное') {
      result = result.filter(r => r.isFavorite);
    } else if (activeTab !== 'Все') {
      result = result.filter(r => r.category === activeTab);
    }

    if (debouncedSearch) {
      result = result.filter(r => 
        r.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return result;
  }, [recipes, activeTab, debouncedSearch]);

  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      setRecipes(recipes.map(r => r.id === editingRecipe.id ? { ...r, ...recipeData } : r));
    } else {
      const newRecipe = {
        ...recipeData,
        id: Date.now(),
        isFavorite: false
      };
      setRecipes([newRecipe, ...recipes]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    setRecipes(recipes.filter(r => r.id !== deleteId));
    setDeleteId(null);
  };

  const toggleFavorite = (id) => {
    setRecipes(recipes.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const openModal = (recipe = null) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="highlight">{part}</mark> 
        : part
    );
  };

  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onAddClick={() => openModal()}
      />
      
      <Tabs 
        categories={CATEGORIES} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <RecipeList 
        recipes={filteredRecipes} 
        onToggleFavorite={toggleFavorite}
        onEdit={openModal}
        onDelete={setDeleteId}
        searchTerm={debouncedSearch}
        highlightText={highlightText}
      />

      {}
      {isModalOpen && createPortal(
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onSave={handleSaveRecipe}
          initialData={editingRecipe}
        />,
        document.body
      )}

      {}
      {deleteId && createPortal(
        <ConfirmModal 
          onConfirm={confirmDelete} 
          onCancel={() => setDeleteId(null)} 
        />,
        document.body
      )}
    </div>
  );
}

export default App;

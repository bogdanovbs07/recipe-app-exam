import React from 'react';

const RecipeCard = ({ recipe, onToggleFavorite, onEdit, onDelete, searchTerm, highlightText }) => {
  return (
    <div className="card" title={recipe.tooltipText || ''}>
      <div className="card-header">
        <h3>{highlightText(recipe.title, searchTerm)}</h3>
        <button 
          className={`star-btn ${recipe.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          ★
        </button>
      </div>
      <p className="category">{recipe.category}</p>
      <p className="ingredients"><strong>Ингредиенты:</strong> {recipe.ingredients}</p>
      <p className="instructions">{recipe.instructions}</p>
      <div className="card-actions">
        <button onClick={() => onEdit(recipe)}>Ред.</button>
        <button onClick={() => onDelete(recipe.id)} className="delete">Удалить</button>
      </div>
    </div>
  );
};

export default RecipeCard;

import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, ...props }) => {
  if (recipes.length === 0) {
    return <div className="empty">Ничего не найдено</div>;
  }

  return (
    <div className="grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} {...props} />
      ))}
    </div>
  );
};

export default RecipeList;

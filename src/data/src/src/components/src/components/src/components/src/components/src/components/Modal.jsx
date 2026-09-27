import React, { useState } from 'react';

const Modal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '', category: 'Основные блюда', ingredients: '', instructions: '', tooltipText: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{initialData ? 'Редактировать' : 'Новый рецепт'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Название" required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Основные блюда</option>
            <option>Десерты</option>
            <option>Салаты</option>
          </select>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ингредиенты" required />
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Инструкция" required />
          <input name="tooltipText" value={formData.tooltipText} onChange={handleChange} placeholder="Текст подсказки (tooltip)" />
          
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

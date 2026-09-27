import React from 'react';

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm" onClick={e => e.stopPropagation()}>
        <h3>Удалить рецепт?</h3>
        <p>Это действие нельзя отменить.</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Отмена</button>
          <button onClick={onConfirm} className="delete">Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

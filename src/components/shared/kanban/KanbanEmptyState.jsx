// src/components/shared/kanban/KanbanEmptyState.jsx
import React from 'react';

export default function KanbanEmptyState({
  message = "No items in this stage",
  icon = "📭",
  actionLabel = null,
  onAction = null,
  IconComponent = null
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4 space-y-2">
      <div className="text-4xl mb-1">
        {IconComponent ? <IconComponent className="w-10 h-10" /> : icon}
      </div>
      <div className="text-sm italic">{message}</div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

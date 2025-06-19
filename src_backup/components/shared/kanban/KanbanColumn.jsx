// src/components/shared/kanban/KanbanColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({
  stage,
  items,
  onDrop,
  getCardContent,
  title = stage,
  color = 'bg-gray-100'
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'kanban-card',
    drop: (draggedItem) => onDrop(draggedItem, stage),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <div
      ref={dropRef}
      className={`flex flex-col w-72 rounded border ${color} p-3 space-y-3 transition-all duration-200 ${
        isOver && canDrop ? 'ring-2 ring-primary' : ''
      }`}
    >
      <h3 className="text-md font-bold mb-2">{title}</h3>

      {items.length === 0 ? (
        <div className="text-sm text-gray-500 italic">No leads in this stage</div>
      ) : (
        items.map((item) => (
          <KanbanCard key={item.id} item={item} getCardContent={getCardContent} />
        ))
      )}
    </div>
  );
}

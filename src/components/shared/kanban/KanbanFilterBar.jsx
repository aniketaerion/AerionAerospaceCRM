// src/components/shared/kanban/KanbanCard.jsx
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export default function KanbanCard({ item, getCardContent }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'kanban-card',
    item: { id: item.id, stage: item.stage },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }), [item]);

  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusBadge = (stage) => {
    const colors = {
      New: 'bg-blue-500',
      Contacted: 'bg-purple-500',
      Demo: 'bg-yellow-500',
      Quoted: 'bg-green-500',
      Closed: 'bg-gray-500'
    };
    return <span className={`text-white text-xs px-2 py-0.5 rounded ${colors[stage] || 'bg-gray-400'}`}>{stage}</span>;
  };

  return (
    <div
      ref={dragRef}
      className={`rounded border-l-4 border-blue-500 bg-white shadow px-3 py-2 text-sm cursor-move relative ${isDragging ? 'opacity-50' : ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex justify-between items-start">
        <div className="font-medium text-sm">{item.name}</div>
        {getStatusBadge(item.stage)}
      </div>
      <div className="text-xs text-gray-600">📍 {item.location}</div>
      <div className="text-xs text-gray-600">📞 {item.contact}</div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {showTooltip && (
        <div className="absolute z-20 top-full left-0 mt-1 w-64 bg-gray-100 border border-gray-300 rounded shadow p-2 text-xs">
          <strong>{item.name}</strong><br />
          <div><strong>Source:</strong> {item.source}</div>
          <div><strong>Assigned:</strong> {item.assignedTo}</div>
          <div><strong>Product Interest:</strong> {item.productInterest}</div>
          <div><strong>Disposition:</strong> {item.disposition}</div>
          <div><strong>Stage:</strong> {item.stage}</div>
          <div><strong>Email:</strong> {item.email}</div>
        </div>
      )}
    </div>
  );
}

    // src/components/shared/kanban/KanbanBoard.jsx
import React from 'react';
import KanbanColumn from './KanbanColumn';
import KanbanToolbar from './KanbanToolbar';
import KanbanFilterBar from './KanbanFilterBar';
import './KanbanStyles.css';

export default function KanbanBoard({ stages = [], leads = [], onStageDrop }) {
  return (
    <div className="space-y-4">
      <KanbanToolbar />
      <KanbanFilterBar />
      <div className="kanban-board">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            leads={leads.filter((l) => l.stage === stage.id)}
            onStageDrop={onStageDrop}
          />
        ))}
      </div>
    </div>
  );
}


// src/components/shared/kanban/KanbanColumn.jsx
import React from 'react';
import KanbanCard from './KanbanCard';
import { useDrop } from 'react-dnd';

export default function KanbanColumn({ stage, leads, onStageDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'lead',
    drop: (item) => onStageDrop(item.id, stage.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [stage.id]);

  return (
    <div ref={drop} className={`kanban-column ${isOver ? 'kanban-drop-hover' : ''}`}> 
      <div className="kanban-column-header">{stage.name} ({leads.length})</div>
      <div className={`kanban-column-body ${leads.length === 0 ? 'empty' : ''}`}>
        {leads.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}


// src/components/shared/kanban/KanbanCard.jsx
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export default function KanbanCard({ lead }) {
  const [hovered, setHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'lead',
    item: { id: lead.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [lead.id]);

  const stageColors = {
    New: '#2563eb',
    Contacted: '#9333ea',
    Demo: '#f59e0b',
    Quoted: '#10b981',
    Closed: '#6b7280',
  };

  const cardStyle = {
    opacity: isDragging ? 0.4 : 1,
    '--stage-color': stageColors[lead.stage] || '#9ca3af',
  };

  return (
    <div
      ref={drag}
      className="kanban-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h4 className="font-medium text-sm">{lead.name}</h4>
      <p className="text-xs text-gray-500">📍 {lead.location}</p>
      <p className="text-xs text-gray-500">📞 {lead.contact}</p>
      {hovered && (
        <div className="kanban-card-tooltip">
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Product:</strong> {lead.productInterest}</p>
          <p><strong>Assigned To:</strong> {lead.assignedTo}</p>
          <p><strong>Disposition:</strong> {lead.disposition}</p>
        </div>
      )}
    </div>
  );
}


// src/components/shared/kanban/UseDragDrop.js
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function UseDragDrop({ children }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

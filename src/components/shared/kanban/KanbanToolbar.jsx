// src/components/shared/kanban/KanbanToolbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function KanbanToolbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white px-4 py-3 border rounded shadow-sm">
      <h2 className="text-lg font-semibold">📌 Lead Pipeline - Kanban View</h2>
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => navigate('/dealer/crm/leads/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ➕ Create Lead
        </Button>

        <Button
          onClick={() => navigate('/dealer/crm/leads/import')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📥 Bulk Import
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/dealer/crm/leads/list')}
          className="border px-4 py-2 rounded"
        >
          📃 Switch to List View
        </Button>
      </div>
    </div>
  );
}

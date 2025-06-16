// src/components/shared/kanban/KanbanPreviewModal.jsx
import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function KanbanPreviewModal({ isOpen, onClose, data }) {
  if (!data || !isOpen) return null;

  const fields = [
    { label: 'Lead ID', value: data.id },
    { label: 'Name', value: data.name },
    { label: 'Contact', value: data.contact },
    { label: 'Email', value: data.email },
    { label: 'Location', value: data.location },
    { label: 'Language', value: data.language },
    { label: 'Pincode', value: data.pincode },
    { label: 'Stage', value: data.stage },
    { label: 'Disposition', value: data.disposition },
    { label: 'Product Interest', value: data.productInterest },
    { label: 'Assigned To', value: data.assignedTo },
    { label: 'Source', value: data.source },
    { label: 'Tags', value: (data.tags || []).join(', ') },
    { label: 'Created At', value: data.createdAt },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-lg font-bold mb-4">Lead Preview</Dialog.Title>

          {fields.length ? (
            <div className="space-y-2 text-sm text-gray-700">
              {fields.map((field, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium w-1/3">{field.label}:</span>
                  <span className="w-2/3 text-right">{field.value || '—'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No details available.</div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
              onClick={() => console.log('Open full detail')}
            >
              Open Full Detail
            </button>
            <button
              className="px-4 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded"
              onClick={() => console.log('Convert to Customer')}
            >
              Convert
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

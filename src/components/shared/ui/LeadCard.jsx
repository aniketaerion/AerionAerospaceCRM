// src/components/shared/ui/LeadCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, BuildingOffice2Icon, PhoneIcon, EnvelopeIcon, TagIcon } from '@heroicons/react/24/outline';

/**
 * A reusable card component to display individual lead information.
 * Suitable for list views and Kanban boards.
 * @param {object} props - The component props.
 * @param {object} props.lead - The lead object to display.
 * @param {boolean} [props.isDraggable=false] - Indicates if the card is part of a draggable context (for styling).
 */
export function LeadCard({ lead, isDraggable = false }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Pitched': return 'bg-purple-100 text-purple-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Disqualified': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      to={`/dealer/crm/leads/panel?tab=list&search=${lead.id}`} // Link to specific lead details in list view
      className={`block bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
        {lead.firstName} {lead.lastName}
      </h3>
      {lead.company && (
        <p className="text-sm text-gray-700 flex items-center mb-1">
          <BuildingOffice2Icon className="h-4 w-4 mr-1 text-gray-500" /> {lead.company}
        </p>
      )}
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <TagIcon className="h-4 w-4 mr-1 text-gray-500" />
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
          {lead.status}
        </span>
      </div>
      {lead.estimatedValue > 0 && (
        <p className="text-sm font-medium text-green-700 flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.172-.879-1.172-2.303 0-3.182s2.913-.659 4.085 0A3.004 3.004 0 0115 9.75V9.75m-3 3h.008v.008H12v-.008z" />
          </svg>
          ${lead.estimatedValue.toLocaleString()}
        </p>
      )}
      {lead.assignedTo && (
        <p className="text-xs text-gray-500 flex items-center mt-2">
          <UserCircleIcon className="h-4 w-4 mr-1" /> Assigned: {lead.assignedTo.replace('user-', 'User ')}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1">Last Activity: {new Date(lead.lastActivity).toLocaleDateString()}</p>
    </Link>
  );
}
// ✅ src/pages/dealer/crm/leads/LeadsPanel.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {Tabs} from '@/components/shared/navigation/Tabs';
import LeadsList from './LeadsList';
import CreateLead from './CreateLead';
import BulkImport from './BulkImport';
import LeadAnalytics from './LeadPerformance';
import LeadKanbanView from './LeadKanbanView';
import BulkAssignments from './BulkAssignments';
import { BackButton } from '@/components/shared/navigation/BackButton';

export default function LeadsPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'list';
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const tabs = [
    { key: 'list', label: '📋 View Leads (128)' },
    { key: 'kanban', label: '📊 Pipeline View' },
    { key: 'analytics', label: '📈 Lead Analytics' },
    { key: 'create', label: '➕ Create Lead' },
    { key: 'import', label: '📥 Bulk Upload' },
    { key: 'assignments', label: '🎯 Assign Leads' }
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'list': return <LeadsList />;
      case 'kanban': return <LeadKanbanView />;
      case 'analytics': return <LeadAnalytics />;
      case 'create': return <CreateLead />;
      case 'import': return <BulkImport />;
      case 'assignments': return <BulkAssignments />;
      default: return <LeadsList />;
    }
  };

  return (
    <div className="relative p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🚀 Leads Management Panel</h1>
        <BackButton label="Back to CRM" to="/dealer/crm/dashboard" />
      </div>

      <div className="text-sm text-gray-500">Last synced: 2 mins ago</div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-white p-4 shadow rounded-lg">
        {renderTab()}
      </div>

      <button
        onClick={() => setActiveTab('create')}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        ➕ New Lead
      </button>
    </div>
  );
}

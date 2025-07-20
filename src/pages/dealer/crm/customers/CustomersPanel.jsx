// src/pages/dealer/crm/customers/CustomersPanel.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Tabs } from '@/components/shared/navigation/Tabs';
import CustomersList from './CustomersList';
import CustomerKanbanView from './CustomerKanbanView';
import CustomerCardView from './CustomerCardView';
import CustomerDetail from './CustomerDetail';
import ProductPurchaseHistory from './ProductPurchaseHistory';
import CustomerAutomation from './CustomerAutomation';
import CustomerReferrals from './CustomerReferrals';
import Promotions from './Promotions';
import CustomerAnalytics from './CustomerAnalytics';
import { BackButton } from '@/components/shared/navigation/BackButton';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';

export default function CustomersPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'list';
  const defaultView = searchParams.get('view') || 'table';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [viewMode, setViewMode] = useState(defaultView);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setSearchParams({ tab: activeTab, view: viewMode });
  }, [activeTab, viewMode]);

  const tabs = [
    { key: 'list', label: '👥 All Customers (960)' },
    { key: 'history', label: '🧾 Purchase History' },
    { key: 'automation', label: '🤖 Automations' },
    { key: 'referrals', label: '👨‍🌾 Referrals' },
    { key: 'promotions', label: '🎁 Promotions & Upsell' },
    { key: 'analytics', label: '📊 Analytics' },
    { key: 'profile', label: '📋 Customer Detail' },
  ];

  const renderListViews = () => {
    if (viewMode === 'kanban') return <CustomerKanbanView />;
    if (viewMode === 'card') return <CustomerCardView />;
    return <CustomersList />;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'list': return (
        <>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <FilterPanel
              filtersConfig={[
                { id: 'status', label: 'Status', type: 'select', options: [
                  { label: 'New', value: 'New' },
                  { label: 'Active', value: 'Active' },
                  { label: 'Repeat', value: 'Repeat' },
                  { label: 'Dormant', value: 'Dormant' }
                ]},
                { id: 'crop', label: 'Crop', type: 'text' },
                { id: 'pincode', label: 'Pincode', type: 'text' },
              ]}
              onFilterChange={setFilters}
              currentFilters={filters}
            />
            <div className="space-x-2">
              <button onClick={() => setViewMode('table')} className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>List</button>
              <button onClick={() => setViewMode('kanban')} className={`px-3 py-1 rounded ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Kanban</button>
              <button onClick={() => setViewMode('card')} className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Card</button>
            </div>
          </div>
          {renderListViews()}
        </>
      );
      case 'history': return <ProductPurchaseHistory />;
      case 'automation': return <CustomerAutomation />;
      case 'referrals': return <CustomerReferrals />;
      case 'promotions': return <Promotions />;
      case 'analytics': return <CustomerAnalytics />;
      case 'profile': return <CustomerDetail />;
      default: return <CustomersList />;
    }
  };

  return (
    <div className="relative p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">💼 Customer Management Panel</h1>
        <BackButton label="Back to CRM" to="/dealer/crm/dashboard" />
      </div>

      <div className="text-sm text-gray-500">Last synced: 3 mins ago</div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-white p-4 shadow rounded-lg">
        {renderTabContent()}
      </div>

      <button
        onClick={() => setActiveTab('profile')}
        className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        ➕ New Customer
      </button>
    </div>
  );
}

// src/pages/dealer/crm/customers/CustomersPanel.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '@/components/shared/navigation/Tabs';
import CustomersList from './CustomersList';
import CustomerDetail from './CustomerDetail';
import PurchaseHistory from './PurchaseHistory';
import CustomerAutomation from './CustomerAutomation';
import Referrals from './Referrals';
import Promotions from './Promotions';
import { BackButton } from '@/components/shared/navigation/BackButton';

export default function CustomersPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'list';
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const tabs = [
    { key: 'list', label: '👥 All Customers (960)' },
    { key: 'history', label: '📦 Purchase History' },
    { key: 'automation', label: '🤖 Automations' },
    { key: 'referrals', label: '👨‍🌾 Referrals' },
    { key: 'promotions', label: '🎁 Promotions & Upsell' },
    { key: 'profile', label: '📋 Customer Detail' },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'list': return <CustomersList />;
      case 'history': return <PurchaseHistory />;
      case 'automation': return <CustomerAutomation />;
      case 'referrals': return <Referrals />;
      case 'promotions': return <Promotions />;
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
        {renderTab()}
      </div>

      <button
        onClick={() => setActiveTab('profile')}
        className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
      >
        📋 New Customer</button>
    </div>
  );
}

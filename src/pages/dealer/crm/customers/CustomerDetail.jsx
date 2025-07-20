// src/pages/dealer/crm/customers/CustomerDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';

import CustomerAnalytics from './CustomerAnalytics';
import CustomerEngagementScore from './CustomerEngagementScore';
import CustomerReferrals from './CustomerReferrals';
import CustomerServicePanel from './CustomerServicePanel';
import CustomerTimeline from './CustomerTimeline';
import CustomerStatusBadge from './CustomerStatusBadge';
import CustomerProfileDownload from './CustomerProfileDownload';
import ProductPurchaseHistory from './ProductPurchaseHistory';

import {
  BriefcaseIcon,
  TicketIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive ? 'bg-aerion-blue text-white' : 'text-neutral-medium hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="h-6 w-6 text-aerion-blue" />
      <h3 className="text-xl font-semibold text-neutral-dark">{title}</h3>
    </div>
    {children}
  </div>
);

export default function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!customerId) return;
      setLoading(true);
      const mockCustomer = {
        id: customerId,
        name: 'Rahul Singh',
        phone: '8876543210',
        email: 'rahul@example.com',
        classification: 'Prime',
        language: 'Hindi',
        dob: '1990-01-10',
        address: 'Village Rampur, District Sitapur, Uttar Pradesh',
        cropTypes: ['Wheat', 'Rice', 'Sugarcane'],
        acreage: '22 acres',
        buyingCycle: 'Seasonal',
        tags: ['Repeat Buyer', 'High Acreage'],
      };
      setCustomer(mockCustomer);
      setLoading(false);
    };

    fetchCustomerData();
  }, [customerId, navigate]);

  if (loading || !customer) {
    return <div className="p-8">Loading customer details...</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">{customer.name}</h1>
          <p className="text-neutral-medium">Customer ID: {customer.id}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <CustomerStatusBadge status={customer.classification} />
            {customer.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CustomerProfileDownload customer={customer} />
          <button className="px-4 py-2 bg-aerion-blue text-white font-semibold rounded-md hover:bg-aerion-blue-dark shadow-sm">
            New Sale
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-2">
          <TabButton isActive={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</TabButton>
          <TabButton isActive={activeTab === 'History'} onClick={() => setActiveTab('History')}>Purchase & Service</TabButton>
          <TabButton isActive={activeTab === 'Timeline'} onClick={() => setActiveTab('Timeline')}>Activity Timeline</TabButton>
          <TabButton isActive={activeTab === 'Engagement'} onClick={() => setActiveTab('Engagement')}>Engagement</TabButton>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <Section title="Contact & Farming Details" icon={UsersIcon}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <p><strong>📞 Mobile:</strong> {customer.phone}</p>
                <p><strong>📧 Email:</strong> {customer.email}</p>
                <p><strong>🎂 DOB:</strong> {customer.dob}</p>
                <p><strong>🌱 Crop Types:</strong> {customer.cropTypes.join(', ')}</p>
                <p><strong>📐 Acreage:</strong> {customer.acreage}</p>
                <p className="lg:col-span-2"><strong>📍 Address:</strong> {customer.address}</p>
              </div>
            </Section>
            <Section title="Analytics Overview" icon={ChartBarIcon}>
              <CustomerAnalytics customerId={customerId} />
            </Section>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="space-y-6">
            <Section title="Purchase History" icon={BriefcaseIcon}>
              <ProductPurchaseHistory customerId={customerId} />
            </Section>
            <Section title="Service History" icon={TicketIcon}>
              <CustomerServicePanel customerId={customerId} />
            </Section>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <Section title="Activity Timeline" icon={ClockIcon}>
            <CustomerTimeline customerId={customerId} />
          </Section>
        )}

        {activeTab === 'Engagement' && (
          <div className="space-y-6">
            <Section title="Engagement Score" icon={UsersIcon}>
              <CustomerEngagementScore customerId={customerId} />
            </Section>
            <Section title="Referrals" icon={UsersIcon}>
              <CustomerReferrals customerId={customerId} />
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

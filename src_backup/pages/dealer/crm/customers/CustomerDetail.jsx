// src/pages/dealer/crm/customers/CustomerDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerAnalytics from './CustomerAnalytics';
import CustomerEngagementScore from './CustomerEngagementScore';
import CustomerReferrals from './CustomerReferrals';
import CustomerCalendarView from './CustomerCalendarView';
import CustomerProfileDownload from './CustomerProfileDownload';
import CustomerServicePanel from './CustomerServicePanel';
import CustomerTimeline from './CustomerTimeline';
import CustomerStatusBadge from './CustomerStatusBadge';

const mockCustomer = {
  id: 'CUS-000164',
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

export default function CustomerDetail() {
  const { customerId } = useParams();
  const customer = mockCustomer; // Replace with dynamic fetch later

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="text-sm text-gray-500">Customer ID: {customer.id}</p>
          <div className="flex flex-wrap mt-2 gap-2">
            <CustomerStatusBadge status={customer.classification} />
            {customer.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <CustomerProfileDownload customer={customer} />
      </div>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <p><strong>📞 Mobile:</strong> {customer.phone}</p>
        <p><strong>📧 Email:</strong> {customer.email}</p>
        <p><strong>🎂 DOB:</strong> {customer.dob}</p>
        <p><strong>🌱 Crop Types:</strong> {customer.cropTypes.join(', ')}</p>
        <p><strong>📐 Acreage:</strong> {customer.acreage}</p>
        <p><strong>📍 Address:</strong> {customer.address}</p>
        <p><strong>🈯 Language:</strong> {customer.language}</p>
        <p><strong>🛒 Buying Cycle:</strong> {customer.buyingCycle}</p>
      </div>

      {/* Segmented Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerAnalytics customerId={customerId} />
        <CustomerEngagementScore customerId={customerId} />
      </section>

      <CustomerReferrals customerId={customerId} />
      <CustomerCalendarView customerId={customerId} />
      <CustomerServicePanel customerId={customerId} />
      <CustomerTimeline customerId={customerId} />
    </div>
  );
}

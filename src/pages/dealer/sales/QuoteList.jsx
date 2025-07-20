// src/pages/dealer/crm/sales/QuoteList.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function QuoteList() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Quotes" showBack={true} backTo="/dealer/crm/sales/dashboard" />
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quote List - Coming Soon!</h2>
        <p className="text-gray-600">
          Here you will find a list of all sales quotes generated for farmers.
          You'll be able to view, edit, send, and track the status of each quote.
        </p>
        <p className="mt-2 text-gray-600">
          Functionality will include creating new quotes, converting quotes to orders, and historical quote tracking.
        </p>
      </div>
    </div>
  );
}
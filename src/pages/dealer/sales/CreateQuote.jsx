// src/pages/dealer/crm/sales/CreateQuote.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function CreateQuote() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Create New Quote" showBack={true} backTo="/dealer/crm/sales/quotes" />
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Quote Form - Coming Soon!</h2>
        <p className="text-gray-600">
          This form will allow you to build new sales quotes for your farmer customers.
          You'll be able to add Aerion products from your catalog, specify quantities, pricing, and apply discounts.
        </p>
      </div>
    </div>
  );
}
// src/pages/dealer/crm/sales/OrderList.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function OrderList() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Customer Orders" showBack={true} backTo="/dealer/crm/sales/dashboard" />
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Order List - Coming Soon!</h2>
        <p className="text-gray-600">
          View and manage all sales orders placed by your farmer customers.
          Track order status from confirmation to fulfillment and delivery.
        </p>
        <p className="mt-2 text-gray-600">
          This section will integrate with Inventory to manage stock allocation for orders.
        </p>
      </div>
    </div>
  );
}   
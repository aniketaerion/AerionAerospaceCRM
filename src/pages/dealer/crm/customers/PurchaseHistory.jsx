// src/pages/dealer/crm/customers/PurchaseHistory.jsx
import React, { useState } from 'react';
import FilterBar from '@/components/common/inputs/FilterBar';
import ExportButton from '@/components/shared/widgets/ExportButton';
import StatusBadge from '@/components/shared/widgets/StatusBadge';

const dummyData = [
  {
    id: 'TXN-001',
    date: '2024-06-01',
    product: 'Trident Recon-X',
    type: 'Drone Purchase',
    quantity: 1,
    value: 380000,
    status: 'Completed',
    invoiceLink: '#',
  },
  {
    id: 'TXN-002',
    date: '2024-07-12',
    product: 'Spray Rental - 25 acres',
    type: 'Drone Rental',
    quantity: 25,
    value: 12500,
    status: 'Completed',
    invoiceLink: '#',
  },
  {
    id: 'TXN-003',
    date: '2025-01-20',
    product: 'AMC Renewal - Trident Mule-VTOL 50',
    type: 'AMC',
    quantity: 1,
    value: 25000,
    status: 'Pending',
    invoiceLink: '#',
  },
];

export default function PurchaseHistory() {
  const [filter, setFilter] = useState({});

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">📦 Purchase History</h2>
        <ExportButton fileName="Customer_Purchase_History" />
      </div>

      <FilterBar
        filters={[
          { label: 'Date', type: 'date-range', key: 'date' },
          { label: 'Product', type: 'select', key: 'product', options: ['All', 'Trident Recon-X', 'Trident Mule-VTOL 50'] },
          { label: 'Status', type: 'select', key: 'status', options: ['All', 'Completed', 'Pending'] },
        ]}
        onFilterChange={setFilter}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Product</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Value (₹)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {dummyData.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{txn.id}</td>
                <td className="p-3">{txn.date}</td>
                <td className="p-3">{txn.product}</td>
                <td className="p-3">{txn.type}</td>
                <td className="p-3">{txn.quantity}</td>
                <td className="p-3">₹{txn.value.toLocaleString()}</td>
                <td className="p-3">
                  <StatusBadge status={txn.status} />
                </td>
                <td className="p-3">
                  <a
                    href={txn.invoiceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Invoice
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 pt-4 border-t">
        Total Transactions: <strong>{dummyData.length}</strong> | Total Value: ₹
        <strong>
          {dummyData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
        </strong>
      </div>
    </div>
  );
}

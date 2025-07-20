// src/pages/dealer/crm/customers/CustomerCardView.jsx
import React from 'react';
// Assuming this component renders customers as cards

const CustomerCardView = ({ dateRange, filters, searchTerm }) => {
  // Mock data for customer cards (replace with actual data from store)
  const mockCustomers = [
    { id: 'c3', name: 'Farmer Dan', email: 'dan@example.com', location: 'Village A', type: 'Retail' },
    { id: 'c4', name: 'Agro Distributors', email: 'agro@example.com', location: 'City B', type: 'Wholesale' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Card View</h2>
      <p className="text-gray-600 mb-4">Filters: {JSON.stringify(filters)} | Search: {searchTerm} | Date: {dateRange}</p>

      {mockCustomers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
          {mockCustomers.map(customer => (
            <div key={customer.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.email}</p>
              <p className="text-xs text-gray-500 mt-2">{customer.location} | {customer.type}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">No customers found.</p>
      )}
      <p className="text-center text-sm text-gray-500 mt-4">Customer card content based on your customers data.</p>
    </div>
  );
};

export default CustomerCardView; // CRITICAL: This must be a default export
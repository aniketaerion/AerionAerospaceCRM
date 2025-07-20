// src/pages/dealer/crm/customers/CustomersList.jsx
import React from 'react';
// Assuming this component renders a table or list of customers

const CustomersList = ({ dateRange, filters, searchTerm }) => {
  // Mock data for customers list (replace with actual data from store)
  const mockCustomers = [
    { id: 'c1', name: 'Customer A', email: 'a@example.com', category: 'Retail', createdAt: '2024-05-01' },
    { id: 'c2', name: 'Customer B', email: 'b@example.com', category: 'Wholesale', createdAt: '2024-06-10' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customers List</h2>
      <p className="text-gray-600 mb-4">Filters: {JSON.stringify(filters)} | Search: {searchTerm} | Date: {dateRange}</p>

      {mockCustomers.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCustomers.map(customer => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">No customers found.</p>
      )}
      <p className="text-center text-sm text-gray-500 mt-4">Customer list content based on your customers data.</p>
    </div>
  );
};

export default CustomersList; // CRITICAL: This must be a default export
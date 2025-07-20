// src/pages/dealer/finance/Expenses.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, EyeIcon, CheckBadgeIcon, XCircleIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_month';
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialStatus = searchParams.get('status') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    category: initialCategory,
    status: initialStatus,
  });

  const { expenses, loading, fetchExpenses, updateData } = useCrmStore();

  useEffect(() => {
    fetchExpenses({ dateRange, ...filters });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.category) newSearchParams.set('category', filters.category);
    if (filters.status) newSearchParams.set('status', filters.status);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchExpenses({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchExpenses, setSearchParams]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilter };
      Object.keys(updatedFilters).forEach(key => {
        if (updatedFilters[key] === '') {
          delete updatedFilters[key];
        }
      });
      return updatedFilters;
    });
  };

  const categoryOptions = useMemo(() => [
    { value: 'Travel', label: 'Travel' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Office Supplies', label: 'Office Supplies' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Salaries', label: 'Salaries' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Software', label: 'Software' },
  ], []);

  const statusOptions = useMemo(() => [
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending Approval', label: 'Pending Approval' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Paid', label: 'Paid' },
  ], []);

  const getExpenseStatusColor = (status) => {
    switch (status) {
      case 'Approved':
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateExpenseStatus = async (expenseId, currentStatus) => {
    let newStatus = prompt(`Update status for expense ${expenseId} (Current: ${currentStatus}). Enter 'Approved', 'Rejected', or 'Paid':`);
    if (newStatus && ['Approved', 'Rejected', 'Paid'].includes(newStatus)) {
      await updateData('expenses', expenseId, { status: newStatus });
      fetchExpenses({ dateRange, ...filters });
    } else if (newStatus !== null) {
      alert("Invalid status entered. Please use 'Approved', 'Rejected', or 'Paid'.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Expense Management" showBack={true} backTo="/dealer/finance/dashboard" />
        <div className="flex items-center gap-4">
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          <Link
            to="/dealer/finance/expenses/create" // Placeholder for create expense page
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Expense
          </Link>
        </div>
      </div>

      <p className="mt-1 text-gray-600">Track and categorize all operational expenses for your dealership, ensuring financial accuracy and budget control.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Description/ID', type: 'text' },
          { id: 'category', label: 'Category', type: 'select', options: categoryOptions },
          { id: 'status', label: 'Status', type: 'select', options: statusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dealership Expenses ({expenses.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${expense.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.submittedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getExpenseStatusColor(expense.status)}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        {(expense.status === 'Submitted' || expense.status === 'Pending Approval') && (
                           <button
                            title="Approve Expense"
                            onClick={() => handleUpdateExpenseStatus(expense.id, 'Approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckBadgeIcon className="h-5 w-5" />
                          </button>
                        )}
                        {(expense.status === 'Submitted' || expense.status === 'Pending Approval' || expense.status === 'Approved') && (
                           <button
                            title="Reject Expense"
                            onClick={() => handleUpdateExpenseStatus(expense.id, 'Rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 col-span-full text-center py-8">No expenses found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

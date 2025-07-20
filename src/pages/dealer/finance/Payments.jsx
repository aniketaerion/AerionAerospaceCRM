// src/pages/dealer/finance/Payments.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, CheckBadgeIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Payments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_month';
  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || '';
  const initialStatus = searchParams.get('status') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    type: initialType,
    status: initialStatus,
  });

  const { payments, loading, fetchPayments, updateData } = useCrmStore();

  useEffect(() => {
    fetchPayments({ dateRange, ...filters });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.type) newSearchParams.set('type', filters.type);
    if (filters.status) newSearchParams.set('status', filters.status);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchPayments({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchPayments, setSearchParams]);

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

  const typeOptions = useMemo(() => [
    { value: 'Incoming', label: 'Incoming Payments' },
    { value: 'Outgoing', label: 'Outgoing Payments' },
  ], []);

  const statusOptions = useMemo(() => [
    { value: 'Recorded', label: 'Recorded' },
    { value: 'Pending Reconciliation', label: 'Pending Reconciliation' },
    { value: 'Reconciled', label: 'Reconciled' },
    { value: 'Failed', label: 'Failed' },
  ], []);

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Reconciled': return 'bg-green-100 text-green-800';
      case 'Recorded': return 'bg-blue-100 text-blue-800';
      case 'Pending Reconciliation': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReconcilePayment = async (paymentId) => {
    const confirmation = window.confirm(`Mark payment ${paymentId} as Reconciled?`);
    if (confirmation) {
      await updateData('payments', paymentId, { status: 'Reconciled' });
      fetchPayments({ dateRange, ...filters });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Payments" showBack={true} backTo="/dealer/finance/dashboard" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Record and reconcile all incoming payments from customers and outgoing payments to suppliers like Aerion Aerospace.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search ID/Customer/Supplier', type: 'text' },
          { id: 'type', label: 'Payment Type', type: 'select', options: typeOptions },
          { id: 'status', label: 'Reconciliation Status', type: 'select', options: statusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Transactions ({payments.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer/Supplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
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
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {payment.type === 'Incoming' ? <ArrowDownCircleIcon className="h-5 w-5 mr-1 text-green-500" /> : <ArrowUpCircleIcon className="h-5 w-5 mr-1 text-red-500" />}
                        {payment.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.customerSupplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        {payment.status === 'Pending Reconciliation' && (
                          <button
                            title="Mark as Reconciled"
                            onClick={() => handleReconcilePayment(payment.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckBadgeIcon className="h-5 w-5" />
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
          <p className="text-gray-600 col-span-full text-center py-8">No payment records found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

// src/pages/dealer/inventory/PurchaseOrders.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, EyeIcon, ReceiptPercentIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function PurchaseOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_month';
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialSupplier = searchParams.get('supplier') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    status: initialStatus,
    supplier: initialSupplier,
  });

  const { salesOrders, loading, fetchSalesOrders } = useCrmStore(); // Currently reusing salesOrders as mock for POs
  // In a real scenario, you'd have a separate 'purchaseOrders' state and fetchPurchaseOrders action

  // Mock data for Purchase Orders for now, until a dedicated fetch method is implemented for POs
  const mockPurchaseOrders = useMemo(() => {
    // Re-purpose some sales orders as mock purchase orders for demonstration
    // In a real app, this would be a distinct data set from mockApi.getPurchaseOrders()
    return salesOrders.map(order => ({
      id: `PO-${order.id.split('-')[1]}`, // Convert SO ID to PO ID
      supplier: order.customerName.includes('Aerion') ? 'Aerion Aerospace' : 'Third Party Inc.', // Mock supplier
      orderDate: order.orderDate,
      total: order.totalValue * 0.7, // Mock cost for POs
      status: order.status === 'Completed' ? 'Received' : (order.status === 'Shipped' ? 'Ordered' : 'Pending'), // Map status
      expectedDelivery: order.deliveryDate,
      receivedDate: order.status === 'Completed' ? new Date(order.deliveryDate).toISOString() : null,
      notes: `Generated from mock sales order ${order.id}`,
    })).filter((_, idx) => idx % 2 === 0); // Only show half of them as POs
  }, [salesOrders]);


  useEffect(() => {
    fetchSalesOrders({ dateRange, ...filters }); // Fetching sales orders to derive mock POs

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.supplier) newSearchParams.set('supplier', filters.supplier);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchSalesOrders({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchSalesOrders, setSearchParams]);

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

  const statusOptions = useMemo(() => [
    { value: 'Pending', label: 'Pending' },
    { value: 'Ordered', label: 'Ordered' },
    { value: 'Received', label: 'Received' },
    { value: 'Cancelled', label: 'Cancelled' },
  ], []);

  const supplierOptions = useMemo(() => [
    { value: 'Aerion Aerospace', label: 'Aerion Aerospace' },
    { value: 'Third Party Inc.', label: 'Third Party Inc.' },
  ], []);

  const getPOStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Ordered': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPOs = useMemo(() => {
    return mockPurchaseOrders.filter(po => {
      const matchesSearch = filters.search === '' ||
                            po.supplier.toLowerCase().includes(filters.search.toLowerCase()) ||
                            po.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === '' || po.status === filters.status;
      const matchesSupplier = filters.supplier === '' || po.supplier === filters.supplier;
      return matchesSearch && matchesStatus && matchesSupplier;
    });
  }, [mockPurchaseOrders, filters]);


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Purchase Orders (from Aerion)" showBack={true} backTo="/dealer/inventory/dashboard" />
        <div className="flex items-center gap-4">
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          <Link
            to="/dealer/inventory/purchase-orders/create" // Placeholder for a create PO page
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Purchase Order
          </Link>
        </div>
      </div>

      <p className="mt-1 text-gray-600">Place and track orders from Aerion Aerospace and other suppliers to replenish your inventory.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search PO ID/Supplier', type: 'text' },
          { id: 'status', label: 'Status', type: 'select', options: statusOptions },
          { id: 'supplier', label: 'Supplier', type: 'select', options: supplierOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchase Orders List ({filteredPOs.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : filteredPOs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PO ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery/Received Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPOs.map((po) => (
                  <tr key={po.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {po.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {po.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(po.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${po.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPOStatusColor(po.status)}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {po.receivedDate ? new Date(po.receivedDate).toLocaleDateString() : (po.expectedDelivery ? new Date(po.expectedDelivery).toLocaleDateString() : 'N/A')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {po.status === 'Ordered' && (
                           <button title="Mark Received" className="text-green-600 hover:text-green-900">
                            <CubeTransparentIcon className="h-5 w-5" />
                          </button>
                        )}
                        {po.status !== 'Received' && po.status !== 'Cancelled' && (
                           <button title="View Invoice" className="text-purple-600 hover:text-purple-900">
                            <ReceiptPercentIcon className="h-5 w-5" />
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
          <p className="text-gray-600 col-span-full text-center py-8">No purchase orders found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

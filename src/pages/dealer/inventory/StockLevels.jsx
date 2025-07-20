// src/pages/dealer/inventory/StockLevels.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector'; // Could filter by last updated/moved
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
// Using @heroicons/react for icons, which is consistent with other generated components
import { ExclamationTriangleIcon, ArchiveBoxIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function StockLevels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialWarehouse = searchParams.get('warehouse') || '';
  const initialStockStatus = searchParams.get('stockStatus') || '';

  const [dateRange, setDateRange] = useState('all_time'); // Typically all-time for current stock
  const [filters, setFilters] = useState({
    search: initialSearch,
    warehouse: initialWarehouse,
    stockStatus: initialStockStatus,
  });

  const { products, loading, fetchProducts, updateData } = useCrmStore(); // Use updateData for stock adjustments

  useEffect(() => {
    fetchProducts({ dateRange, ...filters }); // Filter products by current stock, etc.

    const newSearchParams = new URLSearchParams();
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.warehouse) newSearchParams.set('warehouse', filters.warehouse);
    if (filters.stockStatus) newSearchParams.set('stockStatus', filters.stockStatus);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchProducts({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchProducts, setSearchParams]);

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

  const warehouseOptions = useMemo(() => {
    // Dynamically get unique warehouse locations from products
    const uniqueWarehouses = Array.from(new Set(products.map(p => p.warehouseLocation))).filter(Boolean);
    return uniqueWarehouses.map(w => ({ value: w, label: w }));
  }, [products]);

  const stockStatusOptions = useMemo(() => [
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Low Stock', label: 'Low Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ], []);

  const getStockStatus = (product) => {
    if (product.currentStock === 0) return 'Out of Stock';
    if (product.currentStock <= product.reorderPoint) return 'Low Stock';
    return 'In Stock';
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAdjustStock = async (productId, currentStock) => {
    // IMPORTANT: Using `prompt` and `alert` for simplicity.
    // In an enterprise-grade app, these would be replaced with a custom modal UI.
    const newStock = prompt(`Enter new stock quantity for product ID ${productId} (Current: ${currentStock}):`);
    if (newStock !== null && !isNaN(newStock) && newStock.trim() !== '') {
      await updateData('products', productId, { currentStock: parseInt(newStock) });
      fetchProducts({ dateRange, ...filters }); // Re-fetch to update view
    } else if (newStock !== null) {
      alert("Invalid quantity. Please enter a number.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Current Stock Levels" showBack={true} backTo="/dealer/inventory/dashboard" />
        {/* DateRangeSelector not typically relevant for current stock, but could be for audit logs of movements */}
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Monitor real-time inventory quantities, manage stock adjustments, and identify items needing reorder.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Product/SKU', type: 'text' },
          { id: 'warehouse', label: 'Warehouse Location', type: 'select', options: warehouseOptions },
          { id: 'stockStatus', label: 'Stock Status', type: 'select', options: stockStatusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Stock Information ({products.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warehouse
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reorder Point
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
                {products.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                            <ArchiveBoxIcon className="h-5 w-5 mr-1 text-gray-400" />
                            {product.warehouseLocation?.split(' ')[0] || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 mr-1 text-gray-400" />
                            {product.warehouseLocation?.split(' ')[1] || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.currentStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.reorderPoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(stockStatus)}`}>
                          {stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            title="Adjust Stock"
                            onClick={() => handleAdjustStock(product.id, product.currentStock)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 col-span-full text-center py-8">No stock records found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

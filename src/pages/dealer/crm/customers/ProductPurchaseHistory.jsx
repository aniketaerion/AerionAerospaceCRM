// src/pages/dealer/crm/customers/ProductPurchaseHistory.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ExportButton from '@/components/shared/widgets/ExportButton';
import StatusBadge from '@/components/shared/widgets/StatusBadge';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { ArrowDownTrayIcon, WrenchScrewdriverIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

const PAGE_SIZE = 10;

const mockData = [
  { id: 'TXN-001', date: '2024-06-01', product: 'Trident Recon-X', type: 'Drone Purchase', quantity: 1, value: 380000, status: 'Completed', invoiceLink: '#', serviceLink: '#', tag: 'Repeat Buyer', warranty: true, customer: 'Ravi', region: 'North', season: 'Kharif' },
  { id: 'TXN-002', date: '2024-07-12', product: 'Spray Rental - 25 acres', type: 'Drone Rental', quantity: 25, value: 12500, status: 'Completed', invoiceLink: '#', serviceLink: '', tag: 'Seasonal', warranty: false, customer: 'Asha', region: 'South', season: 'Kharif' },
  { id: 'TXN-003', date: '2025-01-20', product: 'AMC Renewal - Mule-VTOL 50', type: 'AMC', quantity: 1, value: 25000, status: 'Pending', invoiceLink: '#', serviceLink: '#', tag: 'Upseller', warranty: true, customer: 'Mukesh', region: 'East', season: 'Rabi' },
];

export default function ProductPurchaseHistory({ customerId }) {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(mockData);
      setLoading(false);
    }, 800);
  }, [customerId]);

  const filteredData = useMemo(() => {
    return transactions.filter((txn) => {
      const matchStatus = !filters.status || txn.status === filters.status;
      const matchProduct = !filters.product || txn.product === filters.product;
      const matchRegion = !filters.region || txn.region === filters.region;
      const matchSeason = !filters.season || txn.season === filters.season;
      const matchCustomer = !filters.customer || txn.customer === filters.customer;
      const matchDate = !filters.date || (
        dayjs(txn.date).isAfter(filters.date[0], 'day') &&
        dayjs(txn.date).isBefore(filters.date[1], 'day')
      );
      return matchStatus && matchProduct && matchRegion && matchSeason && matchCustomer && (!filters.date || matchDate);
    });
  }, [transactions, filters]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const totalValue = useMemo(() => {
    return filteredData.reduce((sum, txn) => sum + txn.value, 0);
  }, [filteredData]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-primary">📦 Purchase History</h2>
          <ExportButton fileName={`Customer_${customerId || 'All'}_PurchaseHistory`} />
        </div>
        <div className="space-x-2">
          <button onClick={() => setViewMode('table')} className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Table</button>
          <button onClick={() => setViewMode('card')} className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Card</button>
          <button onClick={() => setViewMode('kanban')} className={`px-3 py-1 rounded ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Kanban</button>
        </div>
      </div>

      <FilterPanel
        filtersConfig={[
          { id: 'product', label: 'Product', type: 'select', options: Array.from(new Set(transactions.map(txn => txn.product))).map(p => ({ value: p, label: p })) },
          { id: 'status', label: 'Status', type: 'select', options: ['Completed', 'Pending'].map(v => ({ value: v, label: v })) },
          { id: 'region', label: 'Region', type: 'select', options: ['North', 'South', 'East', 'West'].map(v => ({ value: v, label: v })) },
          { id: 'season', label: 'Season', type: 'select', options: ['Kharif', 'Rabi', 'Zaid'].map(v => ({ value: v, label: v })) },
          { id: 'customer', label: 'Customer', type: 'select', options: Array.from(new Set(transactions.map(txn => txn.customer))).map(c => ({ value: c, label: c })) },
          { id: 'date', label: 'Date Range', type: 'date' },
        ]}
        onFilterChange={(updated) => {
          setFilters(updated);
          setPage(1);
        }}
        currentFilters={filters}
      />

      {/* Render views based on viewMode */}
      <div className="pt-4">
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            {/* Table content here (same as before) */}
            {/* You can extract the table into a separate component for cleanliness */}
            {/* ... */}
            {/* Keep using paginatedData */}
            <p className="text-gray-500 italic">[Table view placeholder]</p>
          </div>
        )}

        {viewMode === 'card' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((txn) => (
              <div key={txn.id} className="border rounded p-4 shadow bg-white">
                <div className="font-bold">{txn.product}</div>
                <div className="text-sm text-gray-600">{txn.customer} • {txn.date}</div>
                <div className="text-xs">₹{txn.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'kanban' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Completed', 'Pending'].map((status) => (
              <div key={status} className="bg-gray-50 border rounded p-3">
                <h3 className="font-semibold mb-2">{status}</h3>
                {filteredData.filter(txn => txn.status === status).map(txn => (
                  <div key={txn.id} className="bg-white shadow-sm rounded p-2 mb-2">
                    <div className="font-medium text-sm">{txn.customer}</div>
                    <div className="text-xs text-gray-500">{txn.product} • ₹{txn.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

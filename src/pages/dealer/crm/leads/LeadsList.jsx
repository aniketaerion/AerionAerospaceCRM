// src/pages/dealer/crm/leads/LeadsList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useCrmStore } from '@/store/crmStore';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { LeadCard } from '@/components/shared/ui/LeadCard';
import { useSearchParams } from 'react-router-dom'; // For URL state


export default function LeadsList() {
  const leads = useCrmStore((state) => state.leads);
  const loading = useCrmStore((state) => state.loading);
  const fetchLeads = useCrmStore((state) => state.fetchLeads);
  const users = useCrmStore((state) => state.users);

  const [searchParams, setSearchParams] = useSearchParams(); // For URL state
  const initialDateRange = searchParams.get('dateRange') || 'all_time';
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialSource = searchParams.get('source') || '';
  const initialAssignedTo = searchParams.get('assignedTo') || '';


  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    status: initialStatus,
    source: initialSource,
    assignedTo: initialAssignedTo,
    search: initialSearch,
  });

  // Effect to update URL search params when dateRange or filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.source) newSearchParams.set('source', filters.source);
    if (filters.assignedTo) newSearchParams.set('assignedTo', filters.assignedTo);
    setSearchParams(newSearchParams, { replace: true });
  }, [dateRange, filters, setSearchParams]);


  // Fetch leads based on date range and filters
  useEffect(() => {
    fetchLeads({ dateRange, ...filters });
    // Polling for "real-time" updates
    const interval = setInterval(() => {
      fetchLeads({ dateRange, ...filters });
    }, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchLeads]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => {
        const updatedFilters = { ...prev, ...newFilter };
        // Ensure that empty strings properly clear the filter
        Object.keys(updatedFilters).forEach(key => {
            if (updatedFilters[key] === '') {
                delete updatedFilters[key];
            }
        });
        return updatedFilters;
    });
  };

  const leadStatuses = useMemo(() => [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Pitched', label: 'Pitched' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Disqualified', label: 'Disqualified' },
  ], []);

  const leadSources = useMemo(() => [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Campaign', label: 'Campaign' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Social Media', label: 'Social Media' },
  ], []);

  const assignedUsersOptions = useMemo(() => users.map(user => ({ value: user.id, label: user.name })), [users]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <TopHeaderBar title="All Leads" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Name/Company/Email', type: 'text' },
          { id: 'status', label: 'Status', type: 'select', options: leadStatuses },
          { id: 'source', label: 'Lead Source', type: 'select', options: leadSources },
          { id: 'assignedTo', label: 'Assigned To', type: 'select', options: assignedUsersOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg shadow-sm border border-gray-200 h-40 animate-pulse bg-gray-100"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.length > 0 ? (
            leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
          ) : (
            <p className="text-gray-600 col-span-full text-center py-8">No leads found for the selected criteria. Try adjusting your filters.</p>
          )}
        </div>
      )}
    </div>
  );
}
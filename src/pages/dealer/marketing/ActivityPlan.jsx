// src/pages/dealer/marketing/ActivityPlan.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, EyeIcon, PencilSquareIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function ActivityPlan() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_quarter';
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialApprovalStatus = searchParams.get('approvalStatus') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    status: initialStatus,
    approvalStatus: initialApprovalStatus,
  });

  const { marketingCampaigns, loading, fetchMarketingCampaigns, updateData } = useCrmStore();

  useEffect(() => {
    // Fetch campaigns which are essentially the "activity plans" at a high level
    fetchMarketingCampaigns({ dateRange, ...filters });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.approvalStatus) newSearchParams.set('approvalStatus', filters.approvalStatus);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchMarketingCampaigns({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchMarketingCampaigns, setSearchParams]);

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
    { value: 'Draft', label: 'Draft' },
    { value: 'Planned', label: 'Planned' },
    { value: 'Active', label: 'Active' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Paused', label: 'Paused' },
  ], []);

  const approvalStatusOptions = useMemo(() => [
    { value: 'N/A', label: 'Not Applicable' }, // For plans not requiring Aerion approval
    { value: 'Pending Aerion', label: 'Pending Aerion Approval' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ], []);

  const getCampaignStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalStatusColor = (approvedByAerion, status) => {
    if (!approvedByAerion) return 'bg-gray-100 text-gray-800'; // Not applicable / no explicit approval needed
    if (status === 'Approved') return 'bg-green-100 text-green-800';
    if (status === 'Pending Aerion') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Rejected') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800'; // Default for other cases
  };

  const handleApproveReject = async (campaignId, currentApprovalStatus) => {
    const newStatus = prompt(`Change approval status for ${campaignId} (Current: ${currentApprovalStatus}). Enter 'Approved', 'Rejected', or 'Pending Aerion':`);
    if (newStatus && ['Approved', 'Rejected', 'Pending Aerion'].includes(newStatus)) {
      await updateData('marketingCampaigns', campaignId, { approval: newStatus, approvedByAerion: true }); // Mock update
      fetchMarketingCampaigns({ dateRange, ...filters }); // Re-fetch to update view
    } else if (newStatus !== null) {
      alert("Invalid status entered. Please use 'Approved', 'Rejected', or 'Pending Aerion'.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Marketing Activity Plan" showBack={true} backTo="/dealer/marketing/dashboard" />
        <div className="flex items-center gap-4">
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          <Link
            to="/dealer/marketing/activity-plan/create" // Placeholder for a create activity plan page
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Plan
          </Link>
        </div>
      </div>

      <p className="mt-1 text-gray-600">Plan, manage, and track all your marketing campaigns and individual activities, including co-marketing initiatives with Aerion.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Plan Name/ID', type: 'text' },
          { id: 'status', label: 'Plan Status', type: 'select', options: statusOptions },
          { id: 'approvalStatus', label: 'Approval Status', type: 'select', options: approvalStatusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Marketing Activity Plans List ({marketingCampaigns.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : marketingCampaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Planned Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approval Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketingCampaigns.map((plan) => (
                  <tr key={plan.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(plan.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(plan.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${plan.plannedBudget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCampaignStatusColor(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getApprovalStatusColor(plan.approvedByAerion, plan.approval)}`}>
                        {plan.approvedByAerion ? (plan.approval || 'Pending') : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {(plan.status === 'Draft' || plan.status === 'Planned' || plan.approval === 'Rejected') && (
                           <button title="Edit Plan" className="text-indigo-600 hover:text-indigo-900">
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                        )}
                        {plan.approvedByAerion && (plan.approval === 'Pending Aerion' || plan.approval === 'Rejected') && (
                          <button
                            title="Update Approval Status"
                            onClick={() => handleApproveReject(plan.id, plan.approval)}
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
          <p className="text-gray-600 col-span-full text-center py-8">No marketing activity plans found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

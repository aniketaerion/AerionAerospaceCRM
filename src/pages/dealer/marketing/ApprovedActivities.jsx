// src/pages/dealer/marketing/ApprovedActivities.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import { EyeIcon, CheckCircleIcon, PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ApprovedActivities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_quarter';
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialCampaign = searchParams.get('campaign') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    status: initialStatus,
    campaign: initialCampaign,
  });

  const { marketingActivities, loading, fetchMarketingActivities, updateData } = useCrmStore();

  useEffect(() => {
    // Only fetch activities that are approved to start with
    fetchMarketingActivities({ dateRange, ...filters, approved: true });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.campaign) newSearchParams.set('campaign', filters.campaign);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchMarketingActivities({ dateRange, ...filters, approved: true });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchMarketingActivities, setSearchParams]);

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
    { value: 'Planned', label: 'Planned' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Active', label: 'Active' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Paused', label: 'Paused' },
    { value: 'Cancelled', label: 'Cancelled' },
  ], []);

  const campaignOptions = useMemo(() => {
    // Get unique campaign names from current marketing activities
    const uniqueCampaigns = Array.from(new Set(marketingActivities.map(a => a.campaignName))).filter(Boolean);
    return uniqueCampaigns.map(c => ({ value: c, label: c }));
  }, [marketingActivities]);

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateActivityStatus = async (activityId, currentStatus) => {
    let newStatus = prompt(`Update status for activity ${activityId} (Current: ${currentStatus}). Enter 'Active', 'Completed', 'Paused', or 'Cancelled':`);
    if (newStatus && ['Active', 'Completed', 'Paused', 'Cancelled'].includes(newStatus)) {
      await updateData('marketingActivities', activityId, { status: newStatus });
      fetchMarketingActivities({ dateRange, ...filters, approved: true }); // Re-fetch to update view
    } else if (newStatus !== null) {
      alert("Invalid status entered. Please use 'Active', 'Completed', 'Paused', or 'Cancelled'.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Approved Marketing Activities" showBack={true} backTo="/dealer/marketing/dashboard" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Monitor and manage all marketing activities that have been approved for execution, including those co-approved by Aerion.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Activity Name/ID', type: 'text' },
          { id: 'status', label: 'Activity Status', type: 'select', options: statusOptions },
          { id: 'campaign', label: 'Campaign', type: 'select', options: campaignOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Approved Activities List ({marketingActivities.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : marketingActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved By
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketingActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.campaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActivityStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.approvedBy || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {(activity.status === 'Planned' || activity.status === 'Scheduled' || activity.status === 'Paused') && (
                           <button
                            title="Mark Active"
                            onClick={() => handleUpdateActivityStatus(activity.id, 'Active')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <PlayIcon className="h-5 w-5" />
                          </button>
                        )}
                        {activity.status === 'Active' && (
                           <button
                            title="Pause Activity"
                            onClick={() => handleUpdateActivityStatus(activity.id, 'Paused')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <PauseIcon className="h-5 w-5" />
                          </button>
                        )}
                        {(activity.status === 'Active' || activity.status === 'Paused' || activity.status === 'Scheduled') && (
                           <button
                            title="Mark Completed"
                            onClick={() => handleUpdateActivityStatus(activity.id, 'Completed')}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                        {activity.status !== 'Completed' && activity.status !== 'Cancelled' && (
                          <button
                            title="Cancel Activity"
                            onClick={() => handleUpdateActivityStatus(activity.id, 'Cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
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
          <p className="text-gray-600 col-span-full text-center py-8">No approved activities found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

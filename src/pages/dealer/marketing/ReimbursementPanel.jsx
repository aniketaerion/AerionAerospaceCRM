// src/pages/dealer/marketing/ReimbursementPanel.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, EyeIcon, CheckCircleIcon, XCircleIcon, CurrencyDollarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function ReimbursementPanel() {
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

  const { reimbursementClaims, loading, fetchReimbursementClaims, updateData } = useCrmStore();

  useEffect(() => {
    fetchReimbursementClaims({ dateRange, ...filters });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.campaign) newSearchParams.set('campaign', filters.campaign);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchReimbursementClaims({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchReimbursementClaims, setSearchParams]);

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
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Pending Approval', label: 'Pending Approval' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Paid', label: 'Paid' },
  ], []);

  const campaignOptions = useMemo(() => {
    const uniqueCampaigns = Array.from(new Set(reimbursementClaims.map(c => c.campaignName))).filter(Boolean);
    return uniqueCampaigns.map(c => ({ value: c, label: c }));
  }, [reimbursementClaims]);

  const getClaimStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Submitted': return 'bg-gray-100 text-gray-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateClaimStatus = async (claimId, currentStatus) => {
    let newStatus = prompt(`Update status for claim ${claimId} (Current: ${currentStatus}). Enter 'Approved', 'Rejected', or 'Paid':`);
    if (newStatus && ['Approved', 'Rejected', 'Paid'].includes(newStatus)) {
      await updateData('reimbursementClaims', claimId, { status: newStatus });
      fetchReimbursementClaims({ dateRange, ...filters }); // Re-fetch to update view
    } else if (newStatus !== null) {
      alert("Invalid status entered. Please use 'Approved', 'Rejected', or 'Paid'.");
    }
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Marketing Reimbursement Panel" showBack={true} backTo="/dealer/marketing/dashboard" />
        <div className="flex items-center gap-4">
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          <Link
            to="/dealer/marketing/reimbursements/submit" // Placeholder for a submit reimbursement page
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Submit New Claim
          </Link>
        </div>
      </div>

      <p className="mt-1 text-gray-600">Submit and track your co-marketing reimbursement claims from Aerion Aerospace, ensuring timely payouts for approved activities.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Claim ID/Campaign', type: 'text' },
          { id: 'status', label: 'Claim Status', type: 'select', options: statusOptions },
          { id: 'campaign', label: 'Campaign', type: 'select', options: campaignOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Marketing Reimbursement Claims ({reimbursementClaims.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : reimbursementClaims.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Claimed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reimbursementClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {claim.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.campaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(claim.dateSubmitted).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${claim.amountClaimed.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.approvedAmount ? `$${claim.approvedAmount.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getClaimStatusColor(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.paymentDate ? new Date(claim.paymentDate).toLocaleDateString() : 'Pending'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {(claim.status === 'Submitted' || claim.status === 'Pending Approval') && (
                           <button
                            title="Update Status"
                            onClick={() => handleUpdateClaimStatus(claim.id, claim.status)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <DocumentCheckIcon className="h-5 w-5" />
                          </button>
                        )}
                        {claim.status === 'Approved' && (
                           <button
                            title="Mark as Paid"
                            onClick={() => handleUpdateClaimStatus(claim.id, 'Paid')}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <CurrencyDollarIcon className="h-5 w-5" />
                          </button>
                        )}
                        {claim.status !== 'Paid' && claim.status !== 'Rejected' && (
                           <button
                            title="Reject Claim"
                            onClick={() => handleUpdateClaimStatus(claim.id, 'Rejected')}
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
          <p className="text-gray-600 col-span-full text-center py-8">No reimbursement claims found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

// src/pages/dealer/marketing/CampaignReports.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import BarChart from '@/components/shared/charts/BarChart';
import TrendLineChart from '@/components/shared/charts/TrendLineChart';
import DonutChart from '@/components/shared/charts/DonutChart';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore'; // Make sure this path is correct for your project
import { UsersIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { MetricCard } from '@/components/shared/ui/MetricCard';

export default function CampaignReports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'this_quarter';
  const initialCampaignId = searchParams.get('campaignId') || ''; // Filter by specific campaign

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({ campaignId: initialCampaignId });

  // Correctly destructure state and actions from the Zustand store
  const marketingCampaigns = useCrmStore((state) => state.marketingCampaigns); // Assuming 'campaigns' holds marketing campaigns
  const marketingActivities = useCrmStore((state) => state.marketingActivities); // Assuming 'marketingActivities' holds activities
  const leads = useCrmStore((state) => state.leads);
  const loading = useCrmStore((state) => state.loading);
  const fetchMarketingCampaigns = useCrmStore((state) => state.fetchMarketingCampaigns);
  const fetchMarketingActivities = useCrmStore((state) => state.fetchMarketingActivities); // Correctly fetched
  const fetchLeads = useCrmStore((state) => state.fetchLeads);

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch all relevant data for reporting
    fetchMarketingCampaigns({ dateRange });
    fetchMarketingActivities({ dateRange });
    fetchLeads({ dateRange }); // Fetch leads relevant to date range

    // Filter to the specific campaign if one is selected
    // Use the fetched marketingCampaigns directly
    const selectedCampaign = marketingCampaigns.find(c => c.id === filters.campaignId);

    if (selectedCampaign) {
      // Aggregate data for the selected campaign
      // Ensure marketingActivities and leads are not null/undefined before filtering
      const campaignActivities = (marketingActivities || []).filter(a => a.campaignId === selectedCampaign.id);
      const campaignLeads = (leads || []).filter(l => l.campaignId === selectedCampaign.id || l.source === selectedCampaign.name); // Corrected from leadSource to source

      const totalCampaignLeads = campaignLeads.length;
      const convertedCampaignLeads = campaignLeads.filter(l => l.status === 'Qualified' || l.status === 'Converted').length;
      const campaignConversionRate = totalCampaignLeads > 0 ? ((convertedCampaignLeads / totalCampaignLeads) * 100).toFixed(1) + '%' : '0%';
      // Ensure 'actualCost' exists on activity objects or provide a default
      const totalCampaignSpend = campaignActivities.reduce((sum, act) => sum + (act.actualCost || 0), 0);

      // For mock ROI, just use the campaign's ROI
      const campaignROI = selectedCampaign.roi ? `${(selectedCampaign.roi * 100).toFixed(1)}%` : 'N/A'; // Assuming ROI is a decimal (e.g., 0.5 for 50%)

      const leadsBySourceOrType = campaignLeads.reduce((acc, lead) => {
        const source = lead.source || 'Other';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});
      const leadsBySourceData = Object.keys(leadsBySourceOrType).map(source => ({
        name: source,
        value: leadsBySourceOrType[source],
      }));

      // Group activities spend by month for a trend
      const spendByMonth = campaignActivities.reduce((acc, act) => {
        const month = new Date(act.date).toLocaleString('default', { month: 'short', year: '2-digit' });
        acc[month] = (acc[month] || 0) + (act.actualCost || 0);
        return acc;
      }, {});
      const spendTrendData = Object.keys(spendByMonth).map(month => ({
        month: month,
        spend: spendByMonth[month],
      }));

      setReportData({
        campaign: selectedCampaign,
        metrics: {
          totalLeads: totalCampaignLeads,
          convertedLeads: convertedCampaignLeads,
          conversionRate: campaignConversionRate,
          totalSpend: totalCampaignSpend,
          roi: campaignROI,
        },
        leadsBySourceData,
        spendTrendData,
      });

    } else {
      setReportData(null);
    }

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.campaignId) newSearchParams.set('campaignId', filters.campaignId);
    setSearchParams(newSearchParams, { replace: true });

    // Set up interval for refreshing data
    const interval = setInterval(() => {
        fetchMarketingCampaigns({ dateRange });
        fetchMarketingActivities({ dateRange });
        fetchLeads({ dateRange });
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount or re-run
  }, [dateRange, filters, marketingCampaigns, marketingActivities, leads, fetchMarketingCampaigns, fetchMarketingActivities, fetchLeads, setSearchParams]);

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

  const campaignOptions = useMemo(() => {
    // Ensure marketingCampaigns is an array before mapping
    return (marketingCampaigns || []).map(c => ({ value: c.id, label: `${c.name} (${c.id})` }));
  }, [marketingCampaigns]);


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Marketing Campaign Reports" showBack={true} backTo="/dealer/marketing/dashboard" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Generate detailed performance reports for your marketing campaigns.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'campaignId', label: 'Select Campaign', type: 'select', options: campaignOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Report for: {reportData?.campaign?.name || 'No Campaign Selected'}
        </h2>
        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-gray-100 rounded-md animate-pulse mb-4"></div>
            <div className="h-80 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
        ) : !filters.campaignId || !reportData ? (
            <p className="text-gray-600 col-span-full text-center py-8">Please select a campaign from the filter above to view its report.</p>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard
                title="Total Leads Generated"
                value={reportData.metrics.totalLeads}
                icon={UsersIcon}
                loading={loading}
              />
              <MetricCard
                title="Leads Converted"
                value={reportData.metrics.convertedLeads}
                icon={CheckCircleIcon}
                loading={loading}
              />
              <MetricCard
                title="Conversion Rate"
                value={reportData.metrics.conversionRate}
                icon={ChartBarIcon}
                loading={loading}
              />
              <MetricCard
                title="Total Spend"
                // Changed to Rupee symbol and 'en-IN' locale
                                value={`₹${reportData.metrics.totalSpend.toLocaleString('en-IN')}`}
                icon={CurrencyDollarIcon}
                loading={loading}
              />
              <MetricCard
                title="Campaign ROI"
                value={reportData.metrics.roi}
                icon={ChartBarIcon}
                loading={loading}
                trendColor={ (reportData.metrics.roi && parseFloat(reportData.metrics.roi) > 100) ? 'text-green-600' : 'text-blue-600'}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Leads by Source/Type</h3>
                {reportData.leadsBySourceData.length > 0 ? (
                  <DonutChart data={reportData.leadsBySourceData} dataKey="value" nameKey="name" height={250} />
                ) : (
                  <p className="h-[250px] flex items-center justify-center text-gray-600">No lead source data for this campaign.</p>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend Over Time</h3>
            {reportData.spendTrendData.length > 0 ? (
              <TrendLineChart data={reportData.spendTrendData} xAxisDataKey="month" lineDataKey="spend" lineName="Spend" height={250} lineColor="#EF4444" /> // Red for spend
            ) : (
              <p className="h-[250px] flex items-center justify-center text-gray-600">No spend trend data for this campaign.</p>
            )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

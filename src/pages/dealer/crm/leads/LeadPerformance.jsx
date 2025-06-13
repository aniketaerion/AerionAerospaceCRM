
// src/pages/dealer/crm/leads/LeadPerformance.jsx

import React, { useState } from 'react';

export default function LeadPerformance() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const totalLeads = 128;
  const convertedLeads = 27;
  const overallConversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1) + '%';
  const avgResponseTime = '2.5 Hours';
  const avgSalesCycle = '18 Days';
  const activeCampaigns = 11;

  const leadFunnel = [
    { label: 'New Leads', value: 128 },
    { label: 'Qualified', value: 64 },
    { label: 'Proposals Sent', value: 27 },
    { label: 'Won Deals', value: 10 },
    { label: 'Lost Deals', value: 17 },
  ];

  const conversionStages = [
    { label: 'New → Qualified', rate: '50%' },
    { label: 'Qualified → Proposal', rate: '42.2%' },
    { label: 'Proposal → Won', rate: '37%' },
  ];

  const leadSources = [
    { source: 'Website', leads: 50, rate: '25%' },
    { source: 'Referral', leads: 30, rate: '35%' },
    { source: 'Social Media', leads: 20, rate: '15%' },
    { source: 'Walk-in', leads: 28, rate: '30%' },
  ];

  const statusDistribution = [
    { status: 'New', count: 35 },
    { status: 'Contacted', count: 25 },
    { status: 'Meeting Scheduled', count: 20 },
    { status: 'Quoted', count: 18 },
    { status: 'Follow-up', count: 10 },
    { status: 'Closed Won', count: 10 },
    { status: 'Closed Lost', count: 10 },
  ];

  const campaigns = [
    { name: 'Summer Drive', leads: 40, conversion: '20%', cpl: '$50' },
    { name: 'Online Focus', leads: 30, conversion: '25%', cpl: '$45' },
    { name: 'Referral Q2', leads: 25, conversion: '38%', cpl: '$30' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📊 Lead Performance Dashboard</h2>

      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-600">Date Range:</label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {['Today', 'Last 7 Days', 'Last 30 Days', 'This Quarter', 'Last Quarter'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Leads" value={totalLeads} />
        <Card title="Conversion Rate" value={overallConversionRate} />
        <Card title="Avg. Response Time" value={avgResponseTime} />
        <Card title="Avg. Sales Cycle" value={avgSalesCycle} />
      </div>

      {/* Funnel + Stage Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Lead Funnel Breakdown">
          <ul className="space-y-2">
            {leadFunnel.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Conversion Rates by Stage">
          <ul className="space-y-2">
            {conversionStages.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>{item.label}</span>
                <span className="text-blue-600 font-semibold">{item.rate}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Lead Sources + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Leads by Source">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th>Source</th>
                <th>Leads</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((s, i) => (
                <tr key={i} className="border-b">
                  <td>{s.source}</td>
                  <td>{s.leads}</td>
                  <td className="text-green-600">{s.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Lead Status Distribution">
          <ul className="space-y-2">
            {statusDistribution.map((s, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>{s.status}</span>
                <span>{s.count}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Campaigns */}
      <Section title={`Campaign Performance (${activeCampaigns} Active)`}>
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th>Campaign</th>
              <th>Leads</th>
              <th>Conversion</th>
              <th>Cost/Lead</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b">
                <td className="text-blue-600 hover:underline cursor-pointer">{c.name}</td>
                <td>{c.leads}</td>
                <td className="text-green-600">{c.conversion}</td>
                <td>{c.cpl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white rounded shadow p-4 border">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-xl font-bold">{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded shadow p-4 border space-y-3">
    <h4 className="text-lg font-semibold">{title}</h4>
    {children}
  </div>
);

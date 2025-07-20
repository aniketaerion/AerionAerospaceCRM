// src/pages/dealer/dashboard/RenderWidgetContent.jsx

import React from 'react';
// Corrected imports for common UI components (assuming they are named exports)
import WidgetCard from '@/components/common/WidgetCard';
import  ChartCard  from '@/components/common/ChartCard';
import  Button  from '@/components/common/Button';

// Corrected imports for shared chart components (assuming they are named exports)
import BarChart from '@/components/shared/charts/BarChart'; // Likely default, but check if it causes error
import DonutChart from '@/components/shared/charts/DonutChart'; // Likely default
import FunnelChart from '@/components/shared/charts/FunnelChart'; // Likely default
import TrendLineChart from '@/components/shared/charts/TrendLineChart'; // Likely default
import {ProgressMeter }from '@/components/shared/charts/ProgressMeter'; // Likely named export

// This is a functional component that receives all necessary props
export default function RenderWidgetContent({ widgetKey, kpis, charts, overdueTasks, events, recentActivities, selectedDateRange, handleNavigateToModule }) {
  switch (widgetKey) {
    case 'overdueInvoices':
      return <WidgetCard title="Overdue Invoices" value={`₹ ${kpis.overdueInvoicesAmount?.toLocaleString('en-IN') || '0'}`} status="alert" description={`${kpis.overdueInvoicesCount || '0'} customers`} onClick={() => handleNavigateToModule('/dealer/finance?status=overdue')} />;
    case 'lowStockItems':
      return <WidgetCard title="Low Stock Items" value={kpis.lowStockItemsCount || '0'} status="warning" description="Below reorder level" onClick={() => handleNavigateToModule('/dealer/inventory?status=low_stock')} />;
    case 'urgentSupportTickets':
      return <WidgetCard title="Urgent Support Tickets" value={kpis.urgentSupportTicketsCount || '0'} status="critical" description="High-priority open requests" onClick={() => handleNavigateToModule('/dealer/service?priority=high')} />;
    case 'salesOrdersPastDue':
      return <WidgetCard title="Sales Orders Past Due" value={kpis.salesOrdersPastDueCount || '0'} status="warning" description="Not shipped by due date" onClick={() => handleNavigateToModule('/dealer/sales/orders?status=past_due')} />;
    case 'totalSalesRevenue':
      return <WidgetCard title="Total Sales Revenue" value={`₹ ${kpis.totalSalesRevenue?.toLocaleString('en-IN') || '0'}`} description={selectedDateRange.label} onClick={() => handleNavigateToModule('/dealer/sales')} />;
    case 'newLeads':
      return <WidgetCard title="New Leads" value={kpis.newLeadsCount || '0'} description={selectedDateRange.label} onClick={() => handleNavigateToModule('/dealer/crm/leads')} />;
    case 'availableInventory':
      return <WidgetCard title="Available Inventory Units" value={`${kpis.availableInventoryUnits || '0'} units`} description="Across all warehouses" onClick={() => handleNavigateToModule('/dealer/inventory')} />;
    case 'pendingPO':
      return <WidgetCard title="Pending Purchase Order Value" value={`₹ ${kpis.pendingPOCount?.toLocaleString('en-IN') || '0'}`} description="Awaiting receipt" onClick={() => handleNavigateToModule('/dealer/inventory?tab=purchase_orders')} />;
    case 'cashBalance':
      return <WidgetCard title="Cash Balance" value={`₹ ${kpis.cashBalance?.toLocaleString('en-IN') || '0'}`} description="Across all accounts" onClick={() => handleNavigateToModule('/dealer/finance?tab=bank_accounts')} />;
    case 'billsDueSoon':
      return <WidgetCard title="Bills Due Soon" value={`₹ ${kpis.billsDueNext7Days?.toLocaleString('en-IN') || '0'}`} description="Next 7 days" onClick={() => handleNavigateToModule('/dealer/finance?tab=bills_to_pay')} />;
    case 'openSupportRequests':
      return <WidgetCard title="Open Support Requests" value={kpis.openSupportRequests || '0'} description="Currently active" onClick={() => handleNavigateToModule('/dealer/service')} />;
    case 'avgTicketResolutionTime':
      return <WidgetCard title="Avg. Ticket Resolution Time" value={`${kpis.avgTicketResolutionTime || '0'} hrs`} description={selectedDateRange.label} onClick={() => handleNavigateToModule('/dealer/service/analytics')} />;
    case 'activeMarketingCampaigns':
      return <WidgetCard title="Active Marketing Campaigns" value={kpis.activeMarketingCampaigns || '0'} description="Currently running" onClick={() => handleNavigateToModule('/dealer/marketing')} />;
    case 'teamPerformanceScore':
      return <WidgetCard title="Team Performance Score" value={kpis.teamPerformanceScore || '0'} description="Overall average" onClick={() => handleNavigateToModule('/dealer/team')} />;

    case 'salesTrend': return <ChartCard title="Sales Trend"><TrendLineChart data={charts.salesTrend || []} /></ChartCard>;
    case 'leadConversionFunnel': return <ChartCard title="Lead Conversion Funnel"><FunnelChart data={charts.leadConversionFunnel || []} /></ChartCard>;
    case 'bestsellingProducts': return <ChartCard title="Top 5 Bestselling Products"><BarChart data={charts.productSales || []} /></ChartCard>;
    case 'revenueExpenses': return <ChartCard title="Revenue vs. Expenses"><BarChart data={charts.revenueExpensesTrend || []} /></ChartCard>;
    case 'ticketStatus': return <ChartCard title="Ticket Status Breakdown"><DonutChart data={charts.ticketStatus || []} /></ChartCard>;
    case 'inventoryTurnover': return <ChartCard title="Inventory Turnover"><ProgressMeter value={charts.inventoryTurnover || 0} max={10} label="Turns" /></ChartCard>;
    case 'salesByRegion': return <ChartCard title="Sales by Region"><BarChart data={charts.salesByRegion || []} /></ChartCard>;

    case 'overdueTasksList':
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Overdue Tasks</h3>
          {overdueTasks?.length === 0 ? <p className="text-gray-500 text-sm">No overdue tasks.</p> : (
            <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
              {overdueTasks.map((task) => (
                <li key={task.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <p className="font-medium text-gray-800">{task.description}</p>
                  <p className="text-xs text-gray-500">Module: {task.module} | Due: {task.dueDate}</p>
                  <Button variant="link" size="sm" onClick={() => handleNavigateToModule(task.link)} className="mt-1">View</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'upcomingEventsList':
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Events</h3>
          {events?.length === 0 ? <p className="text-gray-500 text-sm">No upcoming events.</p> : (
            <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
              {events.map((event) => (
                <li key={event.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <p className="font-medium text-gray-800">{event.description}</p>
                  <p className="text-xs text-gray-500">Module: {event.module} | Date: {event.date} {event.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'recentActivitiesFeed':
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent System Activities</h3>
          {recentActivities?.length === 0 ? <p className="text-gray-500 text-sm">No recent activities to display.</p> : (
            <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <li key={index} className="pb-2 border-b border-gray-100 last:border-b-0">
                  <p className="text-gray-700">
                    <span className="font-medium">{activity.type}:</span> {activity.description}
                  </p>
                  <span className="text-gray-500">{activity.timestamp}</span>
                  {activity.link && (
                    <Button variant="link" size="sm" onClick={() => handleNavigateToModule(activity.link)} className="mt-1">View Details</Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return null;
  }
}
// src/lib/api/activity.js

/**
 * Fetches a list of recent activities across the DMS.
 * @returns {Promise<Array<object>>} An array of activity objects.
 */
export const fetchRecentActivities = async () => {
  console.log("Fetching recent activities...");

  // --- Replace this mock data with actual API calls to your backend ---
  // Example:
  // const response = await fetch('/api/activity/recent');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch recent activities');
  // }
  // const data = await response.json();
  // return data;
  // --- End Example ---

  // Mock Data
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  return [
    { type: 'Sales Order', description: 'New order #SO-2025-001 from FarmTech Solutions', timestamp: '5 mins ago', link: '/dealer/sales/orders/SO-2025-001' },
    { type: 'Payment', description: 'Payment of ₹50,000 received for Invoice #INV-2025-010', timestamp: '15 mins ago', link: '/dealer/finance/invoices/INV-2025-010' },
    { type: 'Inventory', description: 'Low stock alert for Product: Seeder X (SKU: SDX-456)', timestamp: '30 mins ago', link: '/dealer/inventory?status=low_stock' },
    { type: 'CRM', description: 'Lead "Rajesh Kumar" qualified for follow-up', timestamp: '1 hour ago', link: '/dealer/crm/leads/rajesh-kumar' },
    { type: 'Service Ticket', description: 'New critical ticket #TKT-005 from AgriCo', timestamp: '2 hours ago', link: '/dealer/service/tickets/TKT-005' },
    { type: 'Purchase Order', description: 'PO #PO-2025-003 received for Tractor Tires', timestamp: '3 hours ago', link: '/dealer/inventory?tab=purchase_orders' },
  ];
}; 
// src/lib/api/sales.js

/**
 * Fetches aggregated summary data for the Sales Dashboard.
 * @param {object} dateRange - Object containing startDate, endDate, and label.
 * @returns {Promise<object>} An object containing KPIs and chart data relevant to Sales.
 */
export const fetchSalesSummaryData = async (dateRange) => {
  console.log(`Fetching sales summary data for: ${dateRange.label}`);
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay

  return {
    kpis: {
      totalSalesRevenue: 8500000, // Example: 85 Lakhs
      newQuotesThisPeriod: 45,
      openSalesOrdersCount: 22,
      avgOrderValue: 180000,
      salesTargetAchieved: 75, // Percentage
    },
    charts: {
      salesByMonth: [
        { month: 'Jan', revenue: 700000 },
        { month: 'Feb', revenue: 800000 },
        { month: 'Mar', revenue: 850000 },
        { month: 'Apr', revenue: 900000 },
        { month: 'May', revenue: 950000 },
        { month: 'Jun', revenue: 1000000 },
      ],
      quotesByStatus: [
        { status: 'Draft', value: 10 },
        { status: 'Sent', value: 25 },
        { status: 'Accepted', value: 15 },
        { status: 'Rejected', value: 5 },
      ],
      topSalespersons: [
        { name: 'Alice', sales: 2500000 },
        { name: 'Bob', sales: 2000000 },
        { name: 'Charlie', sales: 1800000 },
      ],
    },
    recentSalesActivities: [
      { id: 1, type: 'Quote', description: 'Quote #QT-0012 for ABC Farm', timestamp: '10 min ago', link: '/dealer/sales/quotes/QT-0012' },
      { id: 2, type: 'Order', description: 'Order #SO-0035 placed by Green Acres', timestamp: '1 hour ago', link: '/dealer/sales/orders/SO-0035' },
      { id: 3, type: 'Payment', description: 'Payment recorded for Invoice #INV-0087', timestamp: '3 hours ago', link: '/dealer/finance/payments' },
    ],
  };
};

/**
 * Fetches a list of sales orders or quotes based on current tab/filters.
 * This is a generic placeholder; you'd likely have more specific functions.
 * @param {string} type - 'quotes' or 'orders'
 * @param {object} filters
 * @returns {Promise<Array<object>>}
 */
export const fetchSalesEntities = async (type, filters) => {
  console.log(`Fetching ${type} with filters:`, filters);
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay

  if (type === 'quotes') {
    return [
      { id: 'QT-0012', customer: 'ABC Farm', amount: 500000, status: 'Sent', date: '2025-06-20' },
      { id: 'QT-0011', customer: 'XYZ Agri', amount: 750000, status: 'Accepted', date: '2025-06-18' },
      { id: 'QT-0010', customer: 'Rural Growers', amount: 300000, status: 'Draft', date: '2025-06-15' },
    ];
  } else if (type === 'orders') {
    return [
      { id: 'SO-0035', customer: 'Green Acres', amount: 1200000, status: 'Processing', date: '2025-06-21' },
      { id: 'SO-0034', customer: 'Harvest Hub', amount: 800000, status: 'Shipped', date: '2025-06-19' },
      { id: 'SO-0033', customer: 'Farm Connect', amount: 950000, status: 'Delivered', date: '2025-06-17' },
    ];
  }
  return [];
};
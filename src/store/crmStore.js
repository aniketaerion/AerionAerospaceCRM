// src/store/crmStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { faker } from '@faker-js/faker'; // Import faker for generating dummy data
import {
  getDateRangeDates,
  isDateInRange,
  getPeriodLabel, // Keeping this import even if not directly used in the store, as it's from utils.
} from '@/components/shared/utils/dateHelpers'; // Assuming these utilities exist

// CRITICAL FIX: Import mockApi
import * as mockApi from '@/api/crm';

// Utility to debounce API calls or heavy computations
/**
 * Debounces a function, delaying its execution until after a specified delay.
 * Useful for limiting the rate at which a function is called.
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

// --- Helper Functions for Dummy Data Generation ---

/**
 * Generates a random date between two given dates, ensuring fromDate <= toDate.
 * @param {string | Date} date1 - The first date.
 * @param {string | Date} date2 - The second date.
 * @returns {Date} A randomly generated Date object.
 */
function generateRandomDate(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Ensure fromDate is chronologically before or equal to toDate
  const fromDate = d1 <= d2 ? d1 : d2;
  const toDate = d1 <= d2 ? d2 : d1;

  return faker.date.between({ from: fromDate, to: toDate });
}

/**
 * Generates an array of mock lead objects.
 * @param {number} count - The number of leads to generate.
 * @returns {Array<Object>} An array of mock lead data.
 */
const generateLeads = (count) => {
  const leads = [];
  for (let i = 0; i < count; i++) {
    leads.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number('##-##########'),
      status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Pitched', 'Follow-up', 'Disqualified']),
      source: faker.helpers.arrayElement(['Website', 'Referral', 'Campaign', 'Cold Call']),
      assignedTo: faker.helpers.arrayElement([faker.string.uuid(), null]), // Can be unassigned
      estimatedValue: faker.number.int({ min: 10000, max: 500000 }),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      lastActivity: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      disqualificationReason: faker.helpers.arrayElement(['No Budget', 'Not Interested', 'Wrong Fit', null]),
    });
  }
  return leads;
};

/**
 * Generates an array of mock customer objects.
 * @param {number} count - The number of customers to generate.
 * @returns {Array<Object>} An array of mock customer data.
 */
const generateCustomers = (count) => {
  const customers = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number('##-##########'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'India',
      classification: faker.helpers.arrayElement(['Retail', 'Wholesale', 'Enterprise']),
      status: faker.helpers.arrayElement(['Active', 'Churned', 'On Hold']),
      totalPurchases: faker.number.int({ min: 1, max: 20 }),
      totalSpent: faker.number.float({ min: 10000, max: 1000000, precision: 0.01 }),
      createdAt: generateRandomDate('2023-01-01T00:00:00.000Z', new Date()).toISOString(),
      lastActivity: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return customers;
};

/**
 * Generates an array of mock product objects.
 * @param {number} count - The number of products to generate.
 * @returns {Array<Object>} An array of mock product data.
 */
const generateProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      sku: faker.string.alpha({ length: 8, casing: 'upper', exclude: ['A'] }),
      price: faker.commerce.price({ min: 5000, max: 200000, dec: 2 }),
      currentStock: faker.number.int({ min: 0, max: 500 }),
      reorderPoint: faker.number.int({ min: 10, max: 50 }),
      warehouseLocation: faker.helpers.arrayElement(['WH-A1', 'WH-B2', 'WH-C3']),
      manufacturer: faker.company.name(),
      unitCost: faker.commerce.price({ min: 2000, max: 150000, dec: 2 }),
      status: faker.helpers.arrayElement(['Available', 'Low Stock', 'Out of Stock']),
      createdAt: generateRandomDate('2023-06-01T00:00:00.000Z', new Date()).toISOString(),
      lastActivity: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      salesVolume: faker.number.int({ min: 1, max: 1000 }),
    });
  }
  return products;
};

/**
 * Generates an array of mock sales order objects.
 * @param {number} count - The number of sales orders to generate.
 * @param {string[]} customerIds - An array of customer IDs to link orders to.
 * @returns {Array<Object>} An array of mock sales order data.
 */
const generateSalesOrders = (count, customerIds) => {
  const orders = [];
  for (let i = 0; i < count; i++) {
    const customerId = faker.helpers.arrayElement(customerIds);
    orders.push({
      id: faker.string.uuid(),
      customerId: customerId,
      orderDate: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      totalValue: faker.number.float({ min: 10000, max: 500000, precision: 0.01 }),
      status: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered', 'Cancelled']),
      paymentStatus: faker.helpers.arrayElement(['Paid', 'Pending', 'Overdue']),
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        productId: faker.string.uuid(), // Note: these product IDs might not exist in _mockProducts
        quantity: faker.number.int({ min: 1, max: 10 }),
        unitPrice: faker.number.float({ min: 100, max: 5000, precision: 0.01 }),
      })),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return orders;
};

/**
 * Generates an array of mock marketing campaign objects.
 * @param {number} count - The number of campaigns to generate.
 * @returns {Array<Object>} An array of mock marketing campaign data.
 */
const generateMarketingCampaigns = (count) => {
  const campaigns = [];
  for (let i = 0; i < count; i++) {
    const startDate = generateRandomDate('2024-01-01T00:00:00.000Z', '2024-06-01T00:00:00.000Z');
    const endDate = generateRandomDate(startDate, '2025-01-01T00:00:00.000Z'); // End date after start date

    campaigns.push({
      id: faker.string.uuid(),
      name: faker.commerce.productAdjective() + ' ' + faker.lorem.words(2) + ' Campaign',
      type: faker.helpers.arrayElement(['Email', 'Social Media', 'Webinar', 'Event']),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: faker.helpers.arrayElement(['Planned', 'Active', 'Completed', 'Paused']),
      budget: faker.number.int({ min: 50000, max: 500000 }),
      actualSpend: faker.number.int({ min: 10000, max: 400000 }),
      leadsGenerated: faker.number.int({ min: 0, max: 300 }),
      roi: faker.number.float({ min: -0.5, max: 3.0, precision: 0.01 }),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return campaigns;
};

/**
 * Generates an array of mock service ticket objects.
 * @param {number} count - The number of tickets to generate.
 * @param {string[]} customerIds - An array of customer IDs to link tickets to.
 * @returns {Array<Object>} An array of mock service ticket data.
 */
const generateServiceTickets = (count, customerIds) => {
  const tickets = [];
  for (let i = 0; i < count; i++) {
    const customerId = faker.helpers.arrayElement(customerIds);
    const createdAt = generateRandomDate('2024-01-01T00:00:00.000Z', new Date());
    const resolvedAt = faker.helpers.maybe(() =>
      generateRandomDate(createdAt, new Date()), // Resolved after created
      { probability: 0.7 }
    )?.toISOString();

    tickets.push({
      id: faker.string.uuid(),
      customerId: customerId,
      issue: faker.lorem.sentence(5),
      status: faker.helpers.arrayElement(['Open', 'In Progress', 'Resolved', 'Closed', 'On Hold']),
      priority: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
      assignedTo: faker.helpers.arrayElement([faker.string.uuid(), null]),
      createdAt: createdAt.toISOString(),
      resolvedAt: resolvedAt,
      resolutionTimeHours: resolvedAt ? faker.number.int({ min: 1, max: 72 }) : null,
    });
  }
  return tickets;
};

/**
 * Generates an array of mock invoice objects.
 * @param {number} count - The number of invoices to generate.
 * @param {string[]} customerIds - An array of customer IDs to link invoices to.
 * @returns {Array<Object>} An array of mock invoice data.
 */
const generateInvoices = (count, customerIds) => {
  const invoices = [];
  for (let i = 0; i < count; i++) {
    const customerId = faker.helpers.arrayElement(customerIds);
    const totalAmount = faker.number.float({ min: 5000, max: 200000, precision: 0.01 });
    const amountPaid = faker.helpers.arrayElement([totalAmount, faker.number.float({ min: 0, max: totalAmount, precision: 0.01 })]);

    const issueDate = generateRandomDate('2024-01-01T00:00:00.000Z', new Date());
    const futureDueDate = new Date(issueDate);
    futureDueDate.setDate(futureDueDate.getDate() + faker.number.int({ min: 7, max: 60 }));

    invoices.push({
      id: faker.string.uuid(),
      customerId: customerId,
      invoiceNumber: `INV-${faker.string.numeric(6)}`,
      dateIssued: issueDate.toISOString(),
      dueDate: futureDueDate.toISOString(),
      totalAmount: totalAmount,
      amountDue: totalAmount - amountPaid,
      status: faker.helpers.arrayElement(['Paid', 'Due', 'Overdue', 'Partial']),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return invoices;
};

/**
 * Generates an array of mock expense objects.
 * @param {number} count - The number of expenses to generate.
 * @returns {Array<Object>} An array of mock expense data.
 */
const generateExpenses = (count) => {
  const expenses = [];
  for (let i = 0; i < count; i++) {
    expenses.push({
      id: faker.string.uuid(),
      date: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      category: faker.helpers.arrayElement(['Travel', 'Office Supplies', 'Utilities', 'Maintenance', 'Marketing']),
      amount: faker.number.float({ min: 100, max: 10000, precision: 0.01 }),
      description: faker.lorem.sentence(5),
      status: faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected']),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return expenses;
};

/**
 * Generates an array of mock payment objects.
 * @param {number} count - The number of payments to generate.
 * @returns {Array<Object>} An array of mock payment data.
 */
const generatePayments = (count = 10) => {
  return Array.from({ length: count }, (_, idx) => ({
    id: `PAY-${1000 + idx}`,
    customer: `Customer ${idx + 1}`,
    amount: parseFloat((Math.random() * 10000).toFixed(2)),
    method: ['UPI', 'Bank Transfer', 'Card'][idx % 3],
    status: ['Paid', 'Pending'][idx % 2],
    date: new Date(Date.now() - idx * 86400000).toISOString(),
  }));
};

/**
 * Generates an array of mock user objects (for assignedTo, etc.).
 * @param {number} count - The number of users to generate.
 * @returns {Array<Object>} An array of mock user data.
 */
const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['Sales Rep', 'Service Tech', 'Admin', 'Marketing Spec', 'Finance Manager']),
      type: faker.helpers.arrayElement(['Dealer Staff', 'Aerion Brand Representative']),
      lastActivity: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return users;
};

/**
 * Generates an array of mock task objects.
 * @param {number} count - The number of tasks to generate.
 * @param {string[]} userIds - An array of user IDs to assign tasks to.
 * @returns {Array<Object>} An array of mock task data.
 */
const generateTasks = (count, userIds) => {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: faker.string.uuid(),
      description: faker.lorem.sentence(8),
      dueDate: generateRandomDate('2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z').toISOString(),
      status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed', 'Overdue']),
      assignedTo: faker.helpers.arrayElement(userIds),
      module: faker.helpers.arrayElement(['CRM', 'Sales', 'Service', 'Inventory', 'Finance', 'Team']),
      link: faker.helpers.arrayElement(['/dealer/crm/leads/detail/123', '/dealer/sales/orders/456', '/dealer/service/tickets/789']),
      createdAt: generateRandomDate('2024-01-01T00:00:00.000Z', new Date()).toISOString(),
    });
  }
  return tasks;
};

// --- Mock Data Storage (simulating a database) ---
// Generate base data once
const _mockCustomers = generateCustomers(200);
const _mockUsers = generateUsers(20);
let _mockLeads = generateLeads(500);
let _mockProducts = generateProducts(150);
let _mockSalesOrders = generateSalesOrders(300, _mockCustomers.map(c => c.id));
let _mockMarketingCampaigns = generateMarketingCampaigns(30);
let _mockServiceTickets = generateServiceTickets(180, _mockCustomers.map(c => c.id));
let _mockInvoices = generateInvoices(250, _mockCustomers.map(c => c.id));
let _mockExpenses = generateExpenses(100);
let _mockTasks = generateTasks(80, _mockUsers.map(u => u.id));
let _mockPayments = generatePayments(120);

// --- Exported Mock API Fetching Functions ---
export const getLeads = () => ({ data: _mockLeads, delay: 300 });
export const getCustomers = () => ({ data: _mockCustomers, delay: 250 });
export const getProducts = () => ({ data: _mockProducts, delay: 200 });
export const getSalesOrders = () => ({ data: _mockSalesOrders, delay: 350 });
export const getMarketingCampaigns = () => ({ data: _mockMarketingCampaigns, delay: 300 });
export const getServiceTickets = () => ({ data: _mockServiceTickets, delay: 280 });
export const getInvoices = () => ({ data: _mockInvoices, delay: 320 });
export const getExpenses = () => ({ data: _mockExpenses, delay: 180 });
export const getPayments = () => ({ data: _mockPayments, delay: 300 });
export const getUsers = () => ({ data: _mockUsers, delay: 150 });
export const getTasks = () => ({ data: _mockTasks, delay: 170 });

// --- Mock Data Update Functions (simplified examples) ---
export const updateLead = (id, updates) => { _mockLeads = _mockLeads.map(lead => lead.id === id ? { ...lead, ...updates } : lead); return { success: true }; };
export const createLead = (newLead) => { const lead = { ...newLead, id: faker.string.uuid(), createdAt: new Date().toISOString() }; _mockLeads.push(lead); return { success: true, id: lead.id }; };
export const createProduct = (newProduct) => { const product = { ...newProduct, id: faker.string.uuid(), createdAt: new Date().toISOString() }; _mockProducts.push(product); return { success: true, id: product.id }; };
export const deleteProduct = (productId) => { _mockProducts = _mockProducts.filter(p => p.id !== productId); return { success: true }; };


// --- Store Definition ---
export const useCrmStore = create(
  persist(
    (set, get) => ({
      // States (Comprehensive list for all modules)
      leads: [],
      customers: [],
      users: [], // Ensure users state is present
      products: [],
      salesOrders: [],
      marketingCampaigns: [], // This will be managed by fetchMarketingCampaigns
      serviceTickets: [],
      invoices: [], // This will be managed by fetchInvoices
      expenses: [], // This will be managed by fetchExpenses
      payments: [], // This will be managed by fetchPayments
      tasks: [],
      campaigns: [], // Explicitly for marketing campaigns, as per your simplified structure
      loading: false,
      error: null,

      // --- Universal Fetching Actions ---
      /**
       * Internal debounced function to fetch and filter data from mock API.
       * This is a general-purpose fetcher for data types that use the comprehensive mockApi.
       * @param {string} dataType - The type of data to fetch (e.g., 'Leads', 'Customers', 'Users').
       * @param {object} [params={}] - Optional parameters for filtering data.
       * @returns {Promise<void>}
       */
      _fetchData: debounce(async (dataType, params = {}) => {
        set({ loading: true, error: null });
        try {
          const apiMethod = mockApi[`get${dataType}`];
          if (!apiMethod || typeof apiMethod !== 'function') {
            throw new Error(`Mock API method get${dataType} not found. Ensure it's exported from '@/api/crm'.`);
          }

          const { data, delay } = apiMethod();
          await new Promise((resolve) => setTimeout(resolve, delay));

          let filteredData = [...data];

          // Apply date range filter
          if (params.dateRange) {
            const { startDate, endDate } = getDateRangeDates(params.dateRange);
            filteredData = filteredData.filter((item) => {
              const itemDateStr = item.createdAt || item.dateIssued || item.orderDate || item.date || item.startDate;
              if (!itemDateStr) return false;
              const itemDate = new Date(itemDateStr);
              return isDateInRange(itemDate, startDate, endDate);
            });
          }

          // Apply general search filter
          if (params.search) {
            const searchTerm = params.search.toLowerCase();
            filteredData = filteredData.filter(item =>
              Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm)
              )
            );
          }

          // Apply specific filters
          Object.keys(params).forEach(key => {
            const paramValue = params[key];
            if (key === 'dateRange' || key === 'search' || paramValue === 'all' || paramValue === 'All' || paramValue === undefined || paramValue === null) {
              return;
            }

            if (key === 'assignedTo' && paramValue === 'unassigned') {
              filteredData = filteredData.filter(item => !item.assignedTo);
            } else if (key === 'approved' && typeof paramValue === 'boolean') {
              filteredData = filteredData.filter(item => item.approved === paramValue);
            } else if (item => item.hasOwnProperty(key)) {
              filteredData = filteredData.filter(item => item[key] === paramValue);
            }
          });

          const stateKey = dataType.charAt(0).toLowerCase() + dataType.slice(1);
          set({ [stateKey]: filteredData, loading: false });

        } catch (err) {
          set({ error: `Failed to fetch ${dataType}.`, loading: false });
          console.error(`Error fetching ${dataType}:`, err);
        }
      }, 300), // Debounce delay

      // Individual Fetch Wrappers for all modules (using _fetchData for consistency)
      fetchLeads: (params) => get()._fetchData('Leads', params),
      fetchCustomers: (params) => get()._fetchData('Customers', params),
      fetchUsers: (params) => get()._fetchData('Users', params), // This is now correctly defined
      fetchProducts: (params) => get()._fetchData('Products', params),
      fetchSalesOrders: (params) => get()._fetchData('SalesOrders', params),
      fetchServiceTickets: (params) => get()._fetchData('ServiceTickets', params),
      fetchTasks: (params) => get()._fetchData('Tasks', params),

      // Finance functions (as provided by user, these override the _fetchData for these specific types)
      fetchInvoices: async ({ dateRange }) => {
        set({ loading: true });
        const mock = [{ name: 'Jan', value: 1000 }, { name: 'Feb', value: 1500 }];
        set({ invoices: mock, loading: false });
      },

      fetchExpenses: async ({ dateRange }) => {
        set({ loading: true });
        const mock = [{ name: 'Jan', value: 400 }, { name: 'Feb', value: 600 }];
        set({ expenses: mock, loading: false });
      },

      fetchPayments: async ({ dateRange }) => {
        set({ loading: true });
        const mock = [{ name: 'Jan', value: 900 }, { name: 'Feb', value: 1100 }];
        set({ payments: mock, loading: false });
      },

      // Marketing functions (as provided by user, these override the _fetchData for this specific type)
      fetchMarketingCampaigns: async () => {
        set({ loading: true });
        const mockCampaigns = [
          { id: 1, name: 'Email Blast Jan', status: 'Active', leads: 42, budget: 5000, actualSpend: 4500 },
          { id: 2, name: 'Google Ads Feb', status: 'Paused', leads: 15, budget: 3000, actualSpend: 2800 },
          { id: 3, name: 'Social Media Mar', status: 'Completed', leads: 70, budget: 7000, actualSpend: 6800 },
          { id: 4, name: 'Webinar Apr', status: 'Planned', leads: 0, budget: 2000, actualSpend: 0 },
        ];
        set({ campaigns: mockCampaigns, loading: false });
      },

      // Added fetchMarketingActivities as it was missing
      fetchMarketingActivities: async ({ dateRange }) => {
        set({ loading: true });
        // Mock data for marketing activities
        const mockActivities = [
          { id: 'act1', name: 'Email Send', date: '2024-07-15', type: 'Email', status: 'Sent' },
          { id: 'act2', name: 'Social Post', date: '2024-07-10', type: 'Social', status: 'Posted' },
          { id: 'act3', name: 'Ad Campaign Launch', date: '2024-07-01', type: 'Ad', status: 'Active' },
        ];
        // Apply date range filter if needed (similar to _fetchData)
        let filteredActivities = [...mockActivities];
        if (dateRange) {
          const { startDate, endDate } = getDateRangeDates(dateRange);
          filteredActivities = filteredActivities.filter((item) => {
            const itemDate = new Date(item.date);
            return isDateInRange(itemDate, startDate, endDate);
          });
        }
        set({ marketingActivities: filteredActivities, loading: false });
      },


      /**
       * Calculates and returns analytics data based on the specified type.
       * This function now handles finance, marketing, and team-related analytics.
       * @param {string} type - The type of data to analyze ('invoices', 'expenses', 'payments', 'campaigns', 'users').
       * @param {object} [params={}] - Parameters for analytics (e.g., dateRange). Default to empty object.
       * @param {string} [params.dateRange] - The date range string (e.g., 'Last 30 Days').
       * @returns {object} An object containing various KPIs and chart data.
       */
      getAnalyticsData: (type, { dateRange } = {}) => { // Added default empty object for params
        const { invoices, expenses, campaigns, users } = get(); // Get all relevant states
        let data = [];

        if (type === 'invoices') data = invoices;
        else if (type === 'expenses') data = expenses;
        else if (type === 'payments') data = get().payments;
        else if (type === 'campaigns') data = campaigns;
        else if (type === 'users') {
          // Calculate team-specific analytics here
          const totalStaff = users.filter(user => user.type === 'Dealer Staff').length;
          const aerionReps = users.filter(user => user.type === 'Aerion Brand Representative').length;
          // Placeholder for certificationsDue - you'd need a 'certifications' data structure for this
          const certificationsDue = faker.number.int({ min: 0, max: 5 }); // Mock value
          const rolesDistributionData = Object.entries(users.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
          }, {})).map(([role, count]) => ({ name: role, value: count }));

          return {
            totalStaff,
            aerionReps,
            certificationsDue,
            rolesDistributionData,
            // Add other user-related analytics here if needed
          };
        }

        // Common calculations for finance data (if type is not 'users')
        const totalRevenue = invoices.reduce((sum, i) => sum + (i.value || 0), 0);
        const totalExpenses = expenses.reduce((sum, e) => sum + (e.value || 0), 0);

        // Marketing specific calculations (if type is not 'users')
        const activeCampaignsCount = campaigns.filter(c => c.status === 'Active').length;
        const totalLeadsFromCampaigns = campaigns.reduce((sum, c) => sum + (c.leads || 0), 0);

        // Return structure based on type
        if (type === 'invoices' || type === 'expenses' || type === 'payments') {
          return {
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
            arOutstanding: 2500, // Static mock for now
            apOutstanding: 1800, // Static mock for now
            revenueTrendChartData: invoices, // Using invoices as revenue trend
            expenseByCategoryChartData: expenses, // Using expenses as expense by category
          };
        } else if (type === 'campaigns') {
          return {
            activeCampaignsCount,
            totalLeadsFromCampaigns,
            campaignStatusData: Object.entries(campaigns.reduce((acc, c) => {
              acc[c.status] = (acc[c.status] || 0) + 1;
              return acc;
            }, {})).map(([status, count]) => ({ name: status, value: count })),
          };
        }

        // Default return if type is not handled (should ideally not happen if all types are covered)
        return {};
      },

      // Marketing functions (as provided by user, these override the _fetchData for this specific type)
      fetchMarketingCampaigns: async () => {
        set({ loading: true });
        const mockCampaigns = [
          { id: 1, name: 'Email Blast Jan', status: 'Active', leads: 42, budget: 5000, actualSpend: 4500 },
          { id: 2, name: 'Google Ads Feb', status: 'Paused', leads: 15, budget: 3000, actualSpend: 2800 },
          { id: 3, name: 'Social Media Mar', status: 'Completed', leads: 70, budget: 7000, actualSpend: 6800 },
          { id: 4, name: 'Webinar Apr', status: 'Planned', leads: 0, budget: 2000, actualSpend: 0 },
        ];
        set({ campaigns: mockCampaigns, loading: false });
      },

      // --- Data Manipulation Actions (re-added for completeness) ---
      updateLead: async (leadId, updates) => {
        set({ loading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          set((state) => ({
            leads: state.leads.map((lead) =>
              lead.id === leadId ? { ...lead, ...updates, lastActivity: new Date().toISOString() } : lead
            ),
            loading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ error: 'Failed to update lead.', loading: false });
          console.error('Update Lead Error:', err);
          return { success: false, error: err.message };
        }
      },

      createLead: async (newLead) => {
        set({ loading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 400));
          const leadToSave = {
            id: `lead-${Date.now()}-${faker.string.alphanumeric(8)}`,
            status: newLead.status || 'New',
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            ...newLead,
          };
          set((state) => ({
            leads: [...state.leads, leadToSave],
            loading: false,
          }));
          return { success: true, leadId: leadToSave.id };
        } catch (err) {
          set({ error: 'Failed to create lead.', loading: false });
          console.error('Create Lead Error:', err);
          return { success: false, error: err.message };
        }
      },

      createProduct: async (newProduct) => {
        set({ loading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 400));
          const productToSave = {
            id: `PROD-${Date.now()}-${faker.string.alphanumeric(8)}`,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            ...newProduct,
            currentStock: parseInt(newProduct.currentStock, 10) || 0,
            price: parseFloat(newProduct.price) || 0,
            unitCost: parseFloat(newProduct.unitCost) || 0,
            reorderPoint: parseInt(newProduct.reorderPoint, 10) || 0,
            salesVolume: parseInt(newProduct.salesVolume, 10) || 0,
          };
          set((state) => ({
            products: [...state.products, productToSave],
            loading: false,
          }));
          return { success: true, productId: productToSave.id };
        } catch (err) {
          set({ error: 'Failed to create product.', loading: false });
          console.error('Create Product Error:', err);
          return { success: false, error: err.message };
        }
      },

      deleteProduct: async (productId) => {
        set({ loading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          set((state) => ({
            products: state.products.filter(product => product.id !== productId),
            loading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ error: 'Failed to delete product.', loading: false });
          console.error('Delete Product Error:', err);
          return { success: false, error: err.message };
        }
      },

      bulkAssignLeads: async (leadIds, assignedToUserId) => {
        set({ loading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 800));
          set((state) => ({
            leads: state.leads.map((lead) =>
              leadIds.includes(lead.id)
                ? { ...lead, assignedTo: assignedToUserId, lastActivity: new Date().toISOString() }
                : lead
            ),
            loading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ error: 'Failed to bulk assign leads.', loading: false });
          console.error('Bulk Assign Leads Error:', err);
          return { success: false, error: err.message };
        }
      },

      bulkImportLeads: async (leadsToImport) => {
        set({ loading: true, error: null });
        try {
          const importedLeads = [];
          for (const newLead of leadsToImport) {
            const leadToSave = {
              id: `lead-${Date.now()}-${faker.string.alphanumeric(8)}`,
              status: newLead.status || 'New',
              createdAt: new Date().toISOString(),
              lastActivity: new Date().toISOString(),
              ...newLead,
            };
            importedLeads.push(leadToSave);
            await new Promise(resolve => setTimeout(resolve, 10));
          }

          set((state) => ({
            leads: [...state.leads, ...importedLeads],
            loading: false,
          }));
          return { success: true, importedCount: leadsToImport.length };
        } catch (err) {
          set({ error: 'Failed to import leads.', loading: false });
          console.error('Bulk Import Leads Error:', err);
          return { success: false, error: err.message };
        }
      },

      // --- Comprehensive Analytics Functions (re-added and modified for 'users' type) ---
      getGlobalDashboardAnalytics: ({ dateRange, search, ...filters }) => {
        const state = get();
        const { leads, customers, products, salesOrders, serviceTickets, marketingCampaigns, invoices, expenses, tasks, payments, users: allUsers } = state; // Renamed users to allUsers to avoid conflict with `users` param in the `getAnalyticsData` call

        const filterByDateAndGlobalParams = (item) => {
          const itemDateStr = item.createdAt || item.dateIssued || item.orderDate || item.date || item.startDate;
          if (!itemDateStr) return false;
          const itemDate = new Date(itemDateStr);

          const { startDate, endDate } = getDateRangeDates(dateRange);
          const inDateRange = isDateInRange(itemDate, startDate, endDate);
          const matchesSearch = !search || Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
          );
          return inDateRange && matchesSearch;
        };

        const filteredLeads = leads.filter(filterByDateAndGlobalParams);
        const filteredCustomers = customers.filter(filterByDateAndGlobalParams);
        const filteredSalesOrders = salesOrders.filter(filterByDateAndGlobalParams);
        const filteredProducts = products.filter(filterByDateAndGlobalParams);
        const filteredServiceTickets = serviceTickets.filter(filterByDateAndGlobalParams);
        const filteredMarketingCampaigns = marketingCampaigns.filter(filterByDateAndGlobalParams);
        const filteredInvoices = invoices.filter(filterByDateAndGlobalParams);
        const filteredExpenses = expenses.filter(filterByDateAndGlobalParams);
        const filteredPayments = payments.filter(filterByDateAndGlobalParams);
        const filteredTasks = tasks.filter(filterByDateAndGlobalParams);
        const filteredUsers = allUsers.filter(filterByDateAndGlobalParams);


        // CRM Analytics
        const newLeadsCount = filteredLeads.filter(l => l.status === 'New').length;
        const totalCustomersCount = filteredCustomers.length;
        const leadConversionFunnelData = ['New', 'Contacted', 'Qualified', 'Pitched', 'Follow-up'].map(stage => ({
          stage: stage,
          count: filteredLeads.filter(l => l.status === stage).length,
        }));

        // Sales Analytics
        const totalSalesRevenue = filteredSalesOrders.reduce((sum, order) => sum + (order.totalValue || 0), 0);
        const salesOrdersPastDueCount = filteredSalesOrders.filter(order =>
          order.status !== 'Delivered' && new Date(order.orderDate) < new Date() && order.paymentStatus !== 'Paid'
        ).length;

        const salesTrendData = [
          { name: 'Jan', value: faker.number.int({ min: 100000, max: 500000 }) },
          { name: 'Feb', value: faker.number.int({ min: 100000, max: 500000 }) },
          { name: 'Mar', value: faker.number.int({ min: 100000, max: 500000 }) },
          { name: 'Apr', value: faker.number.int({ min: 100000, max: 500000 }) },
          { name: 'May', value: faker.number.int({ min: 100000, max: 500000 }) },
          { name: 'Jun', value: faker.number.int({ min: 100000, max: 500000 }) },
        ];

        // Inventory Analytics
        const lowStockItemsCount = filteredProducts.filter(p => p.currentStock <= p.reorderPoint && p.currentStock > 0).length;
        const outOfStockItemsCount = filteredProducts.filter(p => p.currentStock === 0).length;
        const availableInventoryUnits = filteredProducts.reduce((sum, p) => sum + p.currentStock, 0);
        const inventoryTurnover = 5.5;
        const bestsellingProducts = [...filteredProducts]
          .sort((a, b) => (b.salesVolume || 0) - (a.salesVolume || 0))
          .slice(0, 5)
          .map(p => ({ name: p.name, value: (p.salesVolume || 0) }));

        // Service Analytics
        const urgentSupportTicketsCount = filteredServiceTickets.filter(t => t.priority === 'Critical' || t.priority === 'High').length;
        const openSupportRequests = filteredServiceTickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
        const avgTicketResolutionTime =
          filteredServiceTickets.filter(t => t.resolvedAt && t.resolutionTimeHours).length > 0
            ? filteredServiceTickets.filter(t => t.resolvedAt && t.resolutionTimeHours).reduce((sum, t) => sum + t.resolutionTimeHours, 0) / filteredServiceTickets.filter(t => t.resolvedAt && t.resolutionTimeHours).length
            : 0;
        const ticketStatusData = Object.keys(filteredServiceTickets.reduce((acc, ticket) => { acc[ticket.status] = (acc[ticket.status] || 0) + 1; return acc; }, {})).map((status) => ({ name: status, value: filteredServiceTickets.filter(t => t.status === status).length }));

        // Marketing Analytics
        const activeMarketingCampaigns = filteredMarketingCampaigns.filter(c => c.status === 'Active').length;
        const marketingROI = filteredMarketingCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0) / (activeMarketingCampaigns || 1);

        // Finance Analytics
        const overdueInvoices = filteredInvoices.filter(inv => inv.status === 'Overdue');
        const overdueInvoicesAmount = overdueInvoices.reduce((sum, inv) => sum + (inv.amountDue || 0), 0);
        const overdueInvoicesCount = overdueInvoices.length;
        const cashBalance = filteredPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0) - filteredExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
        const billsDueNext7Days = filteredInvoices.filter(inv =>
          (inv.status === 'Due' || inv.status === 'Partial') &&
          new Date(inv.dueDate) > new Date() &&
          new Date(inv.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ).reduce((sum, inv) => sum + (inv.amountDue || 0), 0);

        const totalRevenue = filteredSalesOrders.reduce((sum, order) => sum + (order.totalValue || 0), 0);
        const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
        const revenueExpensesData = [
          { name: 'Revenue', value: totalRevenue },
          { name: 'Expenses', value: totalExpenses },
        ];

        // Team/HR Analytics (using filteredUsers for consistency)
        const totalStaff = filteredUsers.filter(user => user.type === 'Dealer Staff').length;
        const aerionReps = filteredUsers.filter(user => user.type === 'Aerion Brand Representative').length;
        const certificationsDue = faker.number.int({ min: 0, max: 5 }); // Mock value for now
        const teamPerformanceScore = 85;
        const overdueTasksGlobal = filteredTasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'Completed');


        // Recent Activities (Global)
        const allRecentActivities = [
          ...filteredLeads.map(l => ({ type: 'Lead', description: `New lead: ${l.firstName} ${l.lastName}`, timestamp: l.createdAt, link: `/dealer/crm/leads/detail/${l.id}` })),
          ...filteredSalesOrders.map(o => ({ type: 'Order', description: `Order #${o.id.substring(0, 8)} shipped`, timestamp: o.createdAt, link: `/dealer/sales/orders/${o.id}` })),
          ...filteredServiceTickets.map(t => ({ type: 'Service Ticket', description: `Ticket #${t.id.substring(0, 8)} resolved`, timestamp: t.resolvedAt || t.createdAt, link: `/dealer/service/tickets/${t.id}` })),
          ...filteredPayments.map(p => ({ type: 'Payment', description: `Payment of $${p.amount} received from ${p.customer}`, timestamp: p.date, link: `/dealer/finance/payments/${p.id}` })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 7);

        return {
          // KPIs for Global Dashboard
          kpis: {
            totalSalesRevenue: totalSalesRevenue,
            newLeadsCount: newLeadsCount,
            totalCustomersCount: totalCustomersCount,
            overdueInvoicesAmount: overdueInvoicesAmount,
            overdueInvoicesCount: overdueInvoicesCount,
            lowStockItemsCount: lowStockItemsCount,
            outOfStockItemsCount: outOfStockItemsCount,
            urgentSupportTicketsCount: urgentSupportTicketsCount,
            salesOrdersPastDueCount: salesOrdersPastDueCount,
            availableInventoryUnits: availableInventoryUnits,
            cashBalance: cashBalance,
            billsDueNext7Days: billsDueNext7Days,
            openSupportRequests: openSupportRequests,
            avgTicketResolutionTime: avgTicketResolutionTime.toFixed(1),
            activeMarketingCampaigns: activeMarketingCampaigns,
            marketingROI: marketingROI.toFixed(2),
            teamPerformanceScore: teamPerformanceScore,
            totalStaff: totalStaff, // Added for Team Dashboard
            aerionReps: aerionReps, // Added for Team Dashboard
            certificationsDue: certificationsDue, // Added for Team Dashboard
          },
          // Charts for Global Dashboard
          charts: {
            salesTrend: salesTrendData,
            leadConversionFunnel: leadConversionFunnelData,
            productSales: bestsellingProducts,
            revenueExpenses: revenueExpensesData,
            ticketStatus: ticketStatusData,
            inventoryTurnover: inventoryTurnover,
            salesByRegion: [
              { name: 'North', value: faker.number.int({ min: 100000, max: 500000 }) },
              { name: 'South', value: faker.number.int({ min: 100000, max: 500000 }) },
              { name: 'East', value: faker.number.int({ min: 100000, max: 500000 }) },
              { name: 'West', value: faker.number.int({ min: 100000, max: 500000 }) },
            ],
            // Add rolesDistributionData here for global dashboard if needed, or keep it in getCrmModuleAnalytics
          },
          recentActivities: allRecentActivities,
          overdueTasks: overdueTasksGlobal,
          upcomingEvents: [],
        };
      },

      getCrmModuleAnalytics: ({ dateRange, search, ...filters }) => {
        const state = get();
        const allLeads = state.leads || [];
        const allCustomers = state.customers || [];
        const allTasks = state.tasks || [];
        const allUsers = state.users || []; // Get users for team analytics within CRM module context

        const filterItemBase = (item) => {
          const itemDateStr = item.createdAt || item.dateIssued || item.orderDate || item.date || item.startDate;
          if (!itemDateStr) return false;
          const itemDate = new Date(itemDateStr);

          const { startDate, endDate } = getDateRangeDates(dateRange);
          const inDateRange = isDateInRange(itemDate, startDate, endDate);
          const matchesSearch = !search || Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
          );
          return inDateRange && matchesSearch;
        };

        const filteredLeads = allLeads.filter(lead => {
          return filterItemBase(lead) &&
            (filters.leadStatus === undefined || filters.leadStatus === 'All' || lead.status === filters.leadStatus) &&
            (filters.assignedTo === undefined || filters.assignedTo === 'All' || (filters.assignedTo === 'unassigned' ? !lead.assignedTo : lead.assignedTo === filters.assignedTo));
        });

        const filteredCustomers = allCustomers.filter(customer => {
          return filterItemBase(customer) &&
            (filters.customerClassification === undefined || filters.customerClassification === 'All' || customer.classification === filters.customerClassification);
        });

        // Team analytics specific to CRM module (if needed, otherwise rely on getGlobalDashboardAnalytics)
        const filteredUsers = allUsers.filter(filterItemBase);
        const rolesDistributionData = Object.entries(filteredUsers.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {})).map(([role, count]) => ({ name: role, value: count }));


        // KPIs
        const newLeadsCount = filteredLeads.filter(l => l.status === 'New').length;
        const totalCustomersCount = filteredCustomers.length;
        const unassignedLeadsCount = filteredLeads.filter(l => !l.assignedTo).length;
        const potentialQualifiedValue = filteredLeads.filter(l => l.status === 'Qualified').reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

        // Chart Data
        const leadStatusData = Object.entries(filteredLeads.reduce((acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        }, {})).map(([status, count]) => ({ name: status, value: count }));

        const leadConversionData = ['New', 'Contacted', 'Pitched', 'Qualified', 'Follow-up', 'Disqualified'].map(stage => ({
          stage: stage,
          count: filteredLeads.filter(l => l.status === stage).length
        }));
        
        const leadsBySourceData = Object.entries(filteredLeads.reduce((acc, l) => {
          acc[l.source || 'Unknown'] = (acc[l.source || 'Unknown'] || 0) + 1;
          return acc;
        }, {})).map(([source, count]) => ({ name: source, value: count }));

        const customersBySegmentData = Object.entries(filteredCustomers.reduce((acc, c) => {
          acc[c.classification || 'Other'] = (acc[c.classification || 'Other'] || 0) + 1;
          return acc;
        }, {})).map(([segment, count]) => ({ name: segment, value: count }));

        // List Data
        const recentLeads = [...filteredLeads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
        const newCustomers = [...filteredCustomers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
        const overdueCrmTasks = allTasks.filter(task =>
          task.module === 'CRM' && new Date(task.dueDate) < new Date() && task.status !== 'Completed'
        );

        return {
          newLeadsCount,
          totalCustomersCount,
          unassignedLeadsCount,
          potentialQualifiedValue,
          leadStatusData,
          leadConversionData,
          leadsBySourceData,
          customersBySegmentData,
          recentLeads,
          newCustomers,
          overdueCrmTasks,
          rolesDistributionData, // Added for Team Dashboard if called from CRM module
        };
      },
    }),
    {
      name: 'crm-store',
    }
  )
);

// src/api/crm.js
import { v4 as uuidv4 } from 'uuid'; // npm install uuid
import { faker } from '@faker-js/faker'; // npm install @faker-js/faker

// Helper to generate a random date within the last year
const getRandomDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return faker.date.between({ from: pastDate, to: now }).toISOString();
};

// --- Data Generators ---
export const generateMockLeads = (count = 100) => {
  const statuses = ['New', 'Contacted', 'Pitched', 'Qualified', 'Disqualified'];
  const sources = ['Website', 'Referral', 'Campaign', 'Partnership', 'Social Media'];
  const disqualificationReasons = ['Not a good fit', 'No budget', 'Already purchased', 'No response', 'Duplicate'];

  const leads = [];
  for (let i = 0; i < count; i++) {
    const status = faker.helpers.arrayElement(statuses);
    const assignedTo = faker.helpers.arrayElement(['user-1', 'user-2', 'user-3', null]);
    const createdAt = getRandomDate();
    const lastActivity = faker.date.soon({ refDate: createdAt }).toISOString();

    leads.push({
      id: uuidv4(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      title: faker.person.jobTitle(),
      status,
      leadSource: faker.helpers.arrayElement(sources),
      estimatedValue: (status === 'Qualified' || status === 'Pitched') ? faker.number.int({ min: 1000, max: 100000 }) : 0,
      assignedTo,
      createdAt,
      lastActivity,
      notes: faker.lorem.sentences(1),
      disqualificationReason: status === 'Disqualified' ? faker.helpers.arrayElement(disqualificationReasons) : null,
    });
  }
  return leads;
};

export const generateMockCustomers = (count = 30) => {
  const classifications = ['A', 'B', 'C', 'Strategic'];
  const customers = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      id: uuidv4(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      classification: faker.helpers.arrayElement(classifications),
      totalPurchases: faker.number.int({ min: 1, max: 20 }),
      lastPurchaseDate: faker.date.recent({ days: 180 }).toISOString(),
      createdAt: getRandomDate(),
    });
  }
  return customers;
};

export const generateMockUsers = () => {
  return [
    { id: 'user-1', name: 'Alice Sales', email: 'alice@example.com', role: 'Sales Rep' },
    { id: 'user-2', name: 'Bob Marketing', email: 'bob@example.com', role: 'Marketing Specialist' },
    { id: 'user-3', name: 'Charlie Manager', email: 'charlie@example.com', role: 'Sales Manager' },
  ];
};

// --- API-style Methods (expected by crmStore.js) ---
export const getLeads = () => ({
  data: generateMockLeads(50),
  delay: 300,
});

export const getCustomers = () => ({
  data: generateMockCustomers(30),
  delay: 300,
});

export const getUsers = () => ({
  data: generateMockUsers(),
  delay: 200,
});

// Extend similarly as needed:
export const getProducts = () => ({
  data: [], // Replace with generateMockProducts() if needed
  delay: 300,
});

export const getSalesOrders = () => ({
  data: [],
  delay: 300,
});

export const getQuotes = () => ({
  data: [],
  delay: 200,
});

export const getMarketingCampaigns = () => ({
  data: [],
  delay: 300,
});

export const getMarketingActivities = () => ({
  data: [],
  delay: 200,
});

export const getReimbursementClaims = () => ({
  data: [],
  delay: 300,
});

export const getInvoices = () => ({
  data: [],
  delay: 200,
});

export const getPayments = () => ({
  data: [],
  delay: 200,
});

export const getExpenses = () => ({
  data: [],
  delay: 200,
});

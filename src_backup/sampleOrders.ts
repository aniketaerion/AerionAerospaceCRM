// src/data/sampleOrders.ts
export const sampleOrders = [
  {
    id: 'ORD001',
    date: '2024-05-20',
    total: 160000,
    status: 'Shipped',
    trackingNumber: 'SHIP123456789',
    expectedDelivery: '2024-05-25',
    // --- IMPORTANT: Ensure this 'items' array exists ---
    items: [
      { productId: 'prod001', name: 'Aerion X-Series Drone', quantity: 1, price: 150000 },
      { productId: 'part001', name: 'X-Series Propeller Set (4)', quantity: 2, price: 1500 }
    ]
  },
  {
    id: 'ORD002',
    date: '2024-05-15',
    total: 75000,
    status: 'Delivered',
    trackingNumber: 'SHIP987654321',
    expectedDelivery: '2024-05-20',
    items: [
      { productId: 'prod002', name: 'Aerion Y-Series Drone', quantity: 1, price: 75000 }
    ]
  },
  {
    id: 'ORD003',
    date: '2024-06-01',
    total: 10000,
    status: 'Processing',
    trackingNumber: null,
    expectedDelivery: '2024-06-07',
    items: [
      { productId: 'service001', name: 'Drone Maintenance Service (Annual)', quantity: 1, price: 10000 }
    ]
  },
];

export type Order = typeof sampleOrders[0];
// src/sampleProducts.ts
export const sampleProducts = [
  { id: 'prod001', name: 'Aerion X-Series Drone', category: 'Commercial Drones', price: 150000, description: 'High-performance drone for surveying.' },
  { id: 'prod002', name: 'Aerion Y-Series Drone', category: 'Consumer Drones', price: 75000, description: 'User-friendly drone for recreational use.' },
  { id: 'prod003', name: 'Aerion Z-Series Drone', category: 'Commercial Drones', price: 250000, description: 'Heavy-lift drone for industrial applications.' },
  { id: 'part001', name: 'X-Series Propeller Set (4)', category: 'Parts', price: 1500, description: 'Replacement propeller set for X-Series.' },
  { id: 'part002', name: 'Y-Series Battery Pack', category: 'Parts', price: 5000, description: 'Extended life battery for Y-Series.' },
  { id: 'service001', name: 'Drone Maintenance Service (Annual)', category: 'Services', price: 10000, description: 'Annual check-up and tuning.' },
  { id: 'service002', name: 'Software Update Package', category: 'Services', price: 2500, description: 'Latest flight software updates.' },
];

// You might also have a type definition if using TypeScript, but for .jsx, this is fine.
// export type Product = typeof sampleProducts[0];
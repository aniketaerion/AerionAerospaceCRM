// src/pages/dealer/inventory/dashboard/index.jsx
import { useState, useEffect } from 'react';
import WidgetCard from '@/components/common/WidgetCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/Cards'; // Assuming you have shadcn/ui or similar components
import { DollarSign, Package, AlertTriangle, XCircle, TrendingUp } from 'lucide-react'; // Assuming lucide-react for icons
import { Skeleton } from '@/components/shared/ui/Skeleton.jsx'; // Assuming shadcn/ui Skeleton component
import { Button } from '@/components/shared/ui/Button.jsx'; // Assuming shadcn/ui Button component
import {Link} from 'next'; // Or react-router-dom Link if not Next.js

// Mock API call function - replace with actual API calls
async function fetchInventoryData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful data
      // resolve({
      //   inStock: 425,
      //   lowStockItems: 12,
      //   outOfStock: 7,
      //   inventoryValue: 1900000, // Stored as number for calculations
      //   lastUpdated: new Date().toLocaleString(),
      //   recentStockMovement: [
      //     { date: '2025-07-15', itemsIn: 50, itemsOut: 30 },
      //     { date: '2025-07-16', itemsIn: 20, itemsOut: 25 },
      //     { date: '2025-07-17', itemsIn: 40, itemsOut: 15 },
      //   ]
      // });

      // Simulate error
      // reject(new Error("Failed to fetch inventory data. Please try again."));

      // Simulate no data
      resolve(null); // Or specific empty state indication
    }, 1500); // Simulate network delay
  });
}

export default function InventoryDashboard() {
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventoryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInventoryData();
        setInventoryData(data);
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError("Failed to load inventory data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getInventoryData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact', // For '₹19L' style
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-8" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button> {/* Simple retry for demonstration */}
        </div>
      );
    }

    if (!inventoryData) {
        return (
          <div className="text-center p-8 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-600 font-medium mb-4">No inventory data available at the moment. Please check back later or add new inventory.</p>
            <Button asChild>
                <Link href="/dealer/inventory/add">Add New Inventory</Link>
            </Button>
          </div>
        );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <WidgetCard
            title="Total In Stock"
            value={inventoryData.inStock.toLocaleString()}
            icon={<Package className="h-5 w-5 text-muted-foreground" />}
            description="All items currently in your inventory"
          />
          <WidgetCard
            title="Low Stock Items"
            value={inventoryData.lowStockItems.toLocaleString()}
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
            description={`Items below reorder point. ${inventoryData.lowStockItems > 0 ? 'Action required!' : ''}`}
            footer={inventoryData.lowStockItems > 0 && <Link href="/dealer/inventory/low-stock" className="text-sm text-blue-600 hover:underline">View Low Stock Items</Link>}
          />
          <WidgetCard
            title="Out of Stock"
            value={inventoryData.outOfStock.toLocaleString()}
            icon={<XCircle className="h-5 w-5 text-red-500" />}
            description="Items with zero quantity"
            footer={inventoryData.outOfStock > 0 && <Link href="/dealer/inventory/out-of-stock" className="text-sm text-blue-600 hover:underline">View Out of Stock Items</Link>}
          />
          <WidgetCard
            title="Total Inventory Value"
            value={formatCurrency(inventoryData.inventoryValue)}
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
            description="Estimated value of all current inventory"
            footer="Based on average cost price"
          />
        </div>

        {/* --- */}
        {/*
          ## Advanced Analytics & Visualizations (Placeholders)

          For a truly enterprise-grade dashboard, you'd integrate more complex
          components here, such as:

          ### Inventory Movement Trend (e.g., using Recharts, Nivo, Chart.js)
          <Card>
            <CardHeader>
              <CardTitle>Daily Stock In/Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                {/* <LineChart data={inventoryData.recentStockMovement} ... /> *\/ }
                <p>Chart: Stock In/Out Trend Over Time</p>
              </div>
            </CardContent>
          </Card>

          ### Inventory Breakdown by Category/Warehouse
          <Card>
            <CardHeader>
              <CardTitle>Inventory Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-gray-50 flex items-center justify-center text-gray-500">
                {/* <PieChart data={inventoryData.categoryBreakdown} ... /> *\/ }
                <p>Chart: Inventory Breakdown (e.g., by Category, Warehouse)</p>
              </div>
            </CardContent>
          </Card>
        */}

        <div className="text-sm text-muted-foreground mt-4">
          Last updated: {inventoryData.lastUpdated}
        </div>
      </>
    );
  };

  return (
    <div className="grid gap-6 p-6"> {/* Increased padding for better spacing */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Dashboard</h2>
        <Button asChild variant="outline">
            <Link href="/dealer/inventory/reports">View Full Reports</Link>
        </Button>
      </div>
      ---
      {renderContent()}
    </div>
  );
}
// src/pages/dealer/inventory/dashboard/index.jsx
import { WidgetCard } from '@/components/common/WidgetCard';

export default function InventoryDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Inventory Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="In Stock" value="425" icon="📦" />
        <WidgetCard title="Low Stock Items" value="12" icon="⚠️" />
        <WidgetCard title="Out of Stock" value="7" icon="❌" />
        <WidgetCard title="Inventory Value" value="₹19L" icon="💰" />
      </div>
    </div>
  );
}

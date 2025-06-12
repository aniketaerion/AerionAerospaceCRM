// src/pages/dealer/profile/index.jsx
import { WidgetCard } from '@/components/WidgetCard';

export default function DealerProfile() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Dealer Business Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WidgetCard title="Dealer Code" value="SHK001" icon="🏷️" />
        <WidgetCard title="Location" value="Nagpur, MH" icon="📍" />
        <WidgetCard title="GSTIN" value="27ABCDE1234F2Z5" icon="🧾" />
        <WidgetCard title="PAN" value="ABCDE1234F" icon="🪪" />
      </div>
    </div>
  );
}

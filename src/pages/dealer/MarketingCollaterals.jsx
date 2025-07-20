// src/pages/dealer/marketing/MarketingCollaterals.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function MarketingCollaterals() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Marketing Collaterals" showBack={true} backTo="/dealer/marketing/dashboard" />
      <p className="mt-1 text-gray-600">
        Download marketing materials, brochures, and other collaterals here.
      </p>
      {/* Add your download links or content here */}
    </div>
  );
}
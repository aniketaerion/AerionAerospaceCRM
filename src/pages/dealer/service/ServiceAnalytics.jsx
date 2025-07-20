// src/pages/dealer/service/ServiceAnalytics.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function ServiceAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Service Analytics" showBack={true} backTo="/dealer/service/dashboard" />
      <p className="mt-1 text-gray-600">
        View detailed analytics and performance metrics for the service department.
      </p>
      {/* Add your charts and data here */}
    </div>
  );
}
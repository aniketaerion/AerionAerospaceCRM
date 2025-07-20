// src/pages/dealer/service/ServiceDownloads.jsx
import React from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';

export default function ServiceDownloads() {
  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Service Downloads" showBack={true} backTo="/dealer/service/dashboard" />
      <p className="mt-1 text-gray-600">
        Access and download service manuals, guides, and diagnostic tools.
      </p>
      {/* Add your download links or content here */}
    </div>
  );
}
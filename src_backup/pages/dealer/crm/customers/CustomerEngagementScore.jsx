// src/pages/dealer/crm/customers/CustomerEngagementScore.jsx

import React from 'react';
import { ProgressMeter } from '@/components/shared/charts/ProgressMeter';
import StatusBadge from '@/components/shared/widgets/StatusBadge';

export default function CustomerEngagementScore({ engagementData }) {
  const {
    repeatPurchases = 0,
    lastInteractionDays = 18,
    followUpRate = 70, // %
    campaignResponses = 2,
    totalCampaigns = 5,
    assignedTo = '',
    currentStatus = 'Active',
  } = engagementData || {};

  const responseRate = totalCampaigns ? Math.round((campaignResponses / totalCampaigns) * 100) : 0;
  const daysSinceLastInteraction = lastInteractionDays;

  // Scoring Logic (customizable)
  let score = 0;
  if (repeatPurchases > 1) score += 25;
  if (daysSinceLastInteraction <= 7) score += 25;
  if (followUpRate >= 75) score += 25;
  if (responseRate >= 50) score += 25;

  let label = 'Dormant';
  let color = 'warning';
  if (score >= 90) {
    label = 'Loyal';
    color = 'success';
  } else if (score >= 70) {
    label = 'Prime';
    color = 'accent';
  } else if (score >= 50) {
    label = 'Active';
    color = 'primary';
  }

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">🎯 Engagement Score</h2>
        <StatusBadge status={label} type={color} />
      </div>

      <ProgressMeter value={score} label="Engagement Health" color={color} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 mt-4">
        <p><strong>Repeat Purchases:</strong> {repeatPurchases}</p>
        <p><strong>Days Since Last Interaction:</strong> {daysSinceLastInteraction} days</p>
        <p><strong>Follow-Up Completion:</strong> {followUpRate}%</p>
        <p><strong>Campaign Response Rate:</strong> {responseRate}%</p>
        <p><strong>Assigned To:</strong> {assignedTo || '—'}</p>
      </div>
    </div>
  );
}

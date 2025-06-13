// src/pages/dealer/crm/leads/LeadDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function LeadDetail() {
  const { leadId } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Lead Detail - ID #{leadId}</h2>
      <div className="bg-white p-4 shadow rounded">
        <p><strong>Status:</strong> New</p>
        <p><strong>Location:</strong> Haryana</p>
        <p><strong>Customer Type:</strong> Farmer</p>
        <p><strong>Acreage:</strong> 12 acres</p>
        <p><strong>Source:</strong> Aerion Marketing</p>
        <p><strong>LTV:</strong> ₹1.4L</p>
        <p><strong>Assigned To:</strong> Sales Executive 3</p>
      </div>
    </div>
  );
}

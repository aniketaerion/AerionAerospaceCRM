// File 11: RepairRequests.jsx

import React, { useState } from 'react';

export default function RepairRequests() {
  const [requests, setRequests] = useState([
    { id: 1, requestId: 'RR1001', product: 'Trident Mule-VTOL 50', status: 'Under Review' },
    { id: 2, requestId: 'RR1002', product: 'Trident Recon-X', status: 'Completed' }
  ]);

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Repair Requests</h1>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Request ID</th>
            <th className="p-3">Product</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td className="p-3">{req.requestId}</td>
              <td className="p-3">{req.product}</td>
              <td className="p-3">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

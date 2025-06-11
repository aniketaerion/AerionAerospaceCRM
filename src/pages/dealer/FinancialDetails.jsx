// File 5: FinancialDetails.jsx

import React, { useState } from 'react';

export default function FinancialDetails() {
  const [financials, setFinancials] = useState({
    balance: 150000,
    ledgerLink: '/dealer/ledger.pdf'
  });

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Financial Details</h1>
      <div className="bg-white text-black p-4 rounded mb-6">
        <strong>Account Balance:</strong> ₹ {financials.balance.toLocaleString()}
      </div>
      <a href={financials.ledgerLink} download className="bg-[#FFE500] text-[#003DA5] p-4 rounded font-bold">
        Download Ledger
      </a>
    </div>
  );
}

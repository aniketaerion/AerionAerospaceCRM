// src/pages/dealer/crm/customers/CustomerProfileDownload.jsx

import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function CustomerProfileDownload({ customer }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Customer Profile - ${customer.name}`, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Customer ID', customer.id],
        ['Name', customer.name],
        ['Phone', customer.phone],
        ['Email', customer.email || '—'],
        ['DOB', customer.dob || '—'],
        ['Acreage', customer.acreage],
        ['Language', customer.language],
        ['Classification', customer.classification],
        ['Buying Cycle', customer.buyingCycle],
        ['Assigned To', customer.assignedTo || '—'],
      ],
    });

    autoTable(doc, {
      head: [['Date', 'Invoice', 'Product', 'Amount']],
      body: customer.purchaseHistory.map((p) => [p.date, p.invoice, p.product, p.amount]),
      margin: { top: doc.lastAutoTable.finalY + 10 },
    });

    doc.save(`${customer.id}_Profile.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm"
    >
      ⬇️ Download PDF Summary
    </button>
  );
}

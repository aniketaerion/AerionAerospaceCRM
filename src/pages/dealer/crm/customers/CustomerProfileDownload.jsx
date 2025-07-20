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
        ['Phone', customer.phone || '—'],
        ['Email', customer.email || '—'],
        ['DOB', customer.dob || '—'],
        ['Language', customer.language || '—'],
        ['Acreage', customer.acreage || '—'],
        ['Classification', customer.classification || '—'],
        ['Buying Cycle', customer.buyingCycle || '—'],
        ['Assigned To', customer.assignedTo || '—'],
      ],
      styles: { fontSize: 10 },
    });

    if (customer.purchaseHistory?.length > 0) {
      autoTable(doc, {
        head: [['Date', 'Invoice', 'Product', 'Amount']],
        body: customer.purchaseHistory.map(p => [p.date, p.invoice, p.product, `₹${p.amount}`]),
        startY: doc.lastAutoTable.finalY + 10,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }
      });
    }

    const filename = `${customer.name.replace(/\s+/g, '_')}_${customer.id}_Profile.pdf`;
    doc.save(filename);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm"
    >
      📄 Download PDF Summary
    </button>
  );
}

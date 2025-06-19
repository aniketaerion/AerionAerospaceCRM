// src/pages/dealer/crm/leads/BulkImport.jsx
import React, { useState } from 'react';
import Papa from 'papaparse';

export default function BulkImport() {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const requiredColumns = ['firstName', 'lastName', 'mobile', 'pinCode', 'language', 'productInterest'];
        const headers = results.meta.fields;
        const missing = requiredColumns.filter(col => !headers.includes(col));
        if (missing.length) {
          setError(`Missing required columns: ${missing.join(', ')}`);
          setCsvData([]);
          return;
        }
        setError('');
        setCsvData(results.data);
      },
      error: function () {
        setError('Error parsing CSV file');
      }
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold">⬆️ Bulk Import Leads (CSV)</h2>

      <div className="space-y-2">
        <input type="file" accept=".csv" onChange={handleFileUpload} className="block" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {csvData.length > 0 && (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key} className="p-2 text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, i) => (
                <tr key={i} className="border-t">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="p-2">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// src/pages/dealer/crm/leads/BulkImport.jsx
import React, { useState } from 'react';
import { useCrmStore } from '@/store/crmStore';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { CloudArrowUpIcon, DocumentCheckIcon, DocumentMinusIcon } from '@heroicons/react/24/outline';

export default function BulkImport() {
  const bulkImportLeads = useCrmStore((state) => state.bulkImportLeads);
  const loading = useCrmStore((state) => state.loading);

  const [file, setFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
      setPreviewData(null); // Clear previous preview
      // Simulate file parsing (in a real app, use PapaParse or similar for CSV/Excel)
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Simple mock parsing for demonstration
          const csvText = e.target.result;
          const lines = csvText.split('\n').filter(line => line.trim() !== '');
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.trim());
            const data = lines.slice(1).map(line => {
              const values = line.split(',').map(v => v.trim());
              return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
              }, {});
            });
            setPreviewData(data);
          } else {
            setMessage('File is empty or malformed.');
            setPreviewData(null);
          }
        } catch (error) {
          setMessage('Error parsing file. Please ensure it is a valid CSV.');
          setPreviewData(null);
        }
      };
      reader.readAsText(selectedFile); // Or readAsArrayBuffer for Excel
    } else {
      setFile(null);
      setMessage('');
      setPreviewData(null);
    }
  };

  const handleImport = async () => {
    if (!file || !previewData || previewData.length === 0) {
      setMessage('Please select a valid file with data to import.');
      setIsSuccess(false);
      return;
    }

    setMessage('Importing leads...');
    setIsSuccess(false);
    setImportProgress(0);

    try {
      // Simulate chunking and progress updates
      const chunkSize = 10;
      let processedCount = 0;
      for (let i = 0; i < previewData.length; i += chunkSize) {
        const chunk = previewData.slice(i, i + chunkSize);
        // Simulate API call for each chunk
        await bulkImportLeads(chunk); // This will update the store directly
        processedCount += chunk.length;
        setImportProgress(Math.min(100, Math.round((processedCount / previewData.length) * 100)));
      }

      setMessage(`Successfully imported ${previewData.length} leads!`);
      setIsSuccess(true);
      setFile(null);
      setPreviewData(null);
      setImportProgress(0);
    } catch (error) {
      setMessage(`Failed to import leads: ${error.message || 'Unknown error'}`);
      setIsSuccess(false);
      setImportProgress(0);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <TopHeaderBar title="Bulk Upload Leads" showBack={true} backTo="/dealer/crm/leads/panel?tab=list" />

      {message && (
        <div className={`p-4 rounded-md ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center gap-2`}>
          {isSuccess ? <DocumentCheckIcon className="h-5 w-5" /> : <DocumentMinusIcon className="h-5 w-5" />}
          {message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload CSV/Excel File</h2>
        <div className="flex items-center space-x-4 mb-6">
          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-4 py-2 border border-gray-300 shadow-sm">
            <CloudArrowUpIcon className="inline-block h-5 w-5 mr-2" />
            <span>Select File</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileChange}
            />
          </label>
          {file && (
            <span className="text-gray-700 text-sm">Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
          )}
          {!file && <span className="text-gray-500 text-sm">No file selected.</span>}
        </div>

        {previewData && previewData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">File Preview ({previewData.length} rows)</h3>
            <div className="overflow-x-auto border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th key={key} scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {previewData.slice(0, 5).map((row, rowIndex) => ( // Show first 5 rows
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="px-4 py-2 whitespace-nowrap text-gray-800">
                          {String(value).substring(0, 30)}{String(value).length > 30 ? '...' : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {previewData.length > 5 && (
                    <tr>
                      <td colSpan={Object.keys(previewData[0]).length} className="px-4 py-2 text-center text-gray-600 italic">
                        ... {previewData.length - 5} more rows ...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">Please ensure headers match your lead fields (e.g., firstName, lastName, email, company, leadSource, estimatedValue, etc.).</p>
          </div>
        )}

        {loading && importProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${importProgress}%` }}
            ></div>
            <p className="text-sm text-gray-600 mt-1 text-center">Importing {importProgress}%</p>
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={!file || loading || !previewData || previewData.length === 0}
          className={`px-6 py-3 rounded-md text-white font-semibold transition-colors duration-200 ${
            !file || loading || !previewData || previewData.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Importing...' : 'Import Leads'}
        </button>
      </div>
    </div>
  );
}
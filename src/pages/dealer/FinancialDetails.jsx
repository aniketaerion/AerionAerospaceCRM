// src/pages/dealer/FinancialDetails.jsx
import React, { useState, useEffect } from 'react';

const dummyFinancialData = {
    bank_name: 'State Bank of India',
    account_number: 'XXXX-XXXX-XXXX-1234',
    ifsc_code: 'SBIN0001234',
    account_holder_name: 'Example Aero Solutions Pvt. Ltd.',
    account_type: 'Current Account',
    gstin: '27ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    credit_notes: [
        { id: 'CN-2025-001', date: '2025-05-10', amount: 5000.00, reason: 'Return of spare parts', status: 'Issued', downloadUrl: 'https://placehold.co/100x40?text=Download' },
        { id: 'CN-2025-002', date: '2025-06-01', amount: 1500.00, reason: 'Marketing claim adjustment', status: 'Issued', downloadUrl: 'https://placehold.co/100x40?text=Download' },
    ],
    debit_notes: [
        { id: 'DN-2025-001', date: '2025-04-20', amount: 2500.00, reason: 'Damaged goods received', status: 'Issued', downloadUrl: 'https://placehold.co/100x40?text=Download' },
    ],
};

const FinancialDetails = () => {
    const [financialInfo, setFinancialInfo] = useState(dummyFinancialData);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // In Phase 3, this would fetch real data from backend
    useEffect(() => {
        // Simulating data fetch for dummy data
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFinancialInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        console.log('Simulating financial details update:', financialInfo);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setSuccessMessage('Financial details updated successfully (dummy)!');
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update financial details (dummy error).');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                <p className="ml-4 text-blue-800">Loading financial details...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 pb-2 border-yellow-500">
                Financial & Billing Details
            </h2>
            <p className="text-gray-600 mb-8">Manage your bank account, GST details, and view financial documents.</p>

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 border border-green-200">
                    {successMessage}
                </div>
            )}
            {error && isEditing && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 border border-red-200">
                    {error}
                </div>
            )}

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Bank Details */}
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Bank Account Information</h3>
                    <div>
                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input type="text" id="bank_name" name="bank_name" value={financialInfo.bank_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input type="text" id="account_number" name="account_number" value={financialInfo.account_number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="ifsc_code" className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                        <input type="text" id="ifsc_code" name="ifsc_code" value={financialInfo.ifsc_code} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="account_holder_name" className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                        <input type="text" id="account_holder_name" name="account_holder_name" value={financialInfo.account_holder_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="account_type" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                        <input type="text" id="account_type" name="account_type" value={financialInfo.account_type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>

                    {/* GST & PAN Details */}
                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">Taxation Details</h3>
                    <div>
                        <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                        <input type="text" id="gstin" name="gstin" value={financialInfo.gstin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
                        <input type="text" id="pan" name="pan" value={financialInfo.pan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={() => { setIsEditing(false); setError(null); setSuccessMessage(null); }}
                            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4 text-gray-800">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Bank Account Information</h3>
                    <p><strong>Bank Name:</strong> {financialInfo.bank_name || 'N/A'}</p>
                    <p><strong>Account Number:</strong> {financialInfo.account_number || 'N/A'}</p>
                    <p><strong>IFSC Code:</strong> {financialInfo.ifsc_code || 'N/A'}</p>
                    <p><strong>Account Holder Name:</strong> {financialInfo.account_holder_name || 'N/A'}</p>
                    <p><strong>Account Type:</strong> {financialInfo.account_type || 'N/A'}</p>

                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">Taxation Details</h3>
                    <p><strong>GSTIN:</strong> {financialInfo.gstin || 'N/A'}</p>
                    <p><strong>PAN:</strong> {financialInfo.pan || 'N/A'}</p>

                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">Credit Notes</h3>
                    {financialInfo.credit_notes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-blue-50 text-blue-800 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-right">Amount</th>
                                        <th className="py-3 px-6 text-left">Reason</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Download</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm font-light">
                                    {financialInfo.credit_notes.map((note) => (
                                        <tr key={note.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">{note.id}</td>
                                            <td className="py-3 px-6 text-left">{note.date}</td>
                                            <td className="py-3 px-6 text-right">₹{note.amount.toFixed(2)}</td>
                                            <td className="py-3 px-6 text-left">{note.reason}</td>
                                            <td className="py-3 px-6 text-center">{note.status}</td>
                                            <td className="py-3 px-6 text-center">
                                                <a href={note.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No credit notes available.</p>
                    )}

                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">Debit Notes</h3>
                    {financialInfo.debit_notes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-blue-50 text-blue-800 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-right">Amount</th>
                                        <th className="py-3 px-6 text-left">Reason</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Download</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm font-light">
                                    {financialInfo.debit_notes.map((note) => (
                                        <tr key={note.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">{note.id}</td>
                                            <td className="py-3 px-6 text-left">{note.date}</td>
                                            <td className="py-3 px-6 text-right">₹{note.amount.toFixed(2)}</td>
                                            <td className="py-3 px-6 text-left">{note.reason}</td>
                                            <td className="py-3 px-6 text-center">{note.status}</td>
                                            <td className="py-3 px-6 text-center">
                                                <a href={note.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No debit notes available.</p>
                    )}

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-8 px-6 py-3 bg-yellow-500 text-blue-800 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        Edit Financial Details
                    </button>
                </div>
            )}
        </div>
    );
};

export default FinancialDetails;

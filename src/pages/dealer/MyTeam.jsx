// src/pages/dealer/MyTeam.jsx
import React, { useState, useEffect } from 'react';

const dummyTeamMembers = {
    salesManager: {
        name: 'Arjun Singh',
        role: 'Regional Sales Manager',
        email: 'arjun.s@aerion.com',
        phone: '+91 9876543210',
        photo_url: 'https://placehold.co/100x100/1E90FF/FFFFFF?text=Arjun' // Placeholder image
    },
    serviceManager: {
        name: 'Priya Sharma',
        role: 'Technical Service Lead',
        email: 'priya.s@aerion.com',
        phone: '+91 9988776655',
        photo_url: 'https://placehold.co/100x100/32CD32/FFFFFF?text=Priya' // Placeholder image
    },
    // Add other relevant team members if needed
};

const MyTeam = () => {
    const [teamInfo, setTeamInfo] = useState(dummyTeamMembers);
    const [loading, setLoading] = useState(false); // No loading for dummy data
    const [error, setError] = useState(null);

    // In Phase 3, this would fetch real data from backend (e.g., from crm.accounts linked profiles)
    useEffect(() => {
        // Simulating data fetch for dummy data
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                <p className="ml-4 text-blue-800">Loading team details...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 pb-2 border-yellow-500">
                My Support Team
            </h2>
            <p className="text-gray-600 mb-8">
                Your dedicated contacts at Aerion Aerospace for sales, service, and support.
            </p>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 border border-red-200">
                    Error: {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sales Account Manager Card */}
                {teamInfo.salesManager && (
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100 flex items-center space-x-4">
                        {teamInfo.salesManager.photo_url && (
                            <img src={teamInfo.salesManager.photo_url} alt="Sales Manager" className="w-24 h-24 rounded-full object-cover border-2 border-blue-300 shadow-sm" />
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-blue-800">{teamInfo.salesManager.name}</h3>
                            <p className="text-blue-600 text-sm mb-2">{teamInfo.salesManager.role}</p>
                            <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${teamInfo.salesManager.email}`} className="text-blue-600 hover:underline">{teamInfo.salesManager.email}</a></p>
                            <p className="text-gray-700"><strong>Phone:</strong> <a href={`tel:${teamInfo.salesManager.phone}`} className="text-blue-600 hover:underline">{teamInfo.salesManager.phone}</a></p>
                        </div>
                    </div>
                )}

                {/* Service Manager Card */}
                {teamInfo.serviceManager && (
                    <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-100 flex items-center space-x-4">
                        {teamInfo.serviceManager.photo_url && (
                            <img src={teamInfo.serviceManager.photo_url} alt="Service Manager" className="w-24 h-24 rounded-full object-cover border-2 border-green-300 shadow-sm" />
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-green-800">{teamInfo.serviceManager.name}</h3>
                            <p className="text-green-600 text-sm mb-2">{teamInfo.serviceManager.role}</p>
                            <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${teamInfo.serviceManager.email}`} className="text-blue-600 hover:underline">{teamInfo.serviceManager.email}</a></p>
                            <p className="text-gray-700"><strong>Phone:</strong> <a href={`tel:${teamInfo.serviceManager.phone}`} className="text-blue-600 hover:underline">{teamInfo.serviceManager.phone}</a></p>
                        </div>
                    </div>
                )}
            </div>
            {/* Add placeholder for general support contact if applicable */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">General Support</h3>
                <p className="text-gray-700">For general inquiries or urgent support, please contact our main line or visit our support page:</p>
                <p className="mt-2"><strong>Phone:</strong> +91-1234567890</p>
                <p><strong>Email:</strong> support@aerion.com</p>
                <p className="mt-3">
                    <Link to="/dealer/support" className="text-blue-600 hover:underline font-semibold">
                        Visit Support Page
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default MyTeam;
// src/pages/dealer/DealerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import the ROUTES constant from App.jsx or define it locally for clarity
// For simplicity, defining locally for this component's needs.
const ROUTES = {
    DEALER_NEW_ORDER: '/dealer/orders/new',
    DEALER_ADD_CUSTOMER: '/dealer/customers/add',
    DEALER_REPAIRS: '/dealer/repairs',
    DEALER_ORDERS: '/dealer/orders', // To view all orders
    DEALER_MARKETING: '/dealer/marketing', // To view all marketing claims
};

const DealerDashboard = () => {
    const navigate = useNavigate();

    // --- Dummy Data for Phase 1 ---
    const [dashboardData, setDashboardData] = useState({
        totalOrders: 125,
        pendingRepairs: 7,
        currentInventoryValue: 7500000, // In INR
        recentOrders: [
            { id: 'ORD-001', customer: 'Ramesh Singh', amount: 150000, status: 'Processing', date: '2025-06-08' },
            { id: 'ORD-002', customer: 'Priya Kumari', amount: 85000, status: 'Shipped', date: '2025-06-05' },
        ],
        recentRepairs: [
            { id: 'REQ-015', customer: 'Sunita Patil', drone: 'AgriDrone Pro', status: 'In Progress', date: '2025-06-07' },
            { id: 'REQ-016', customer: 'Deepak Kumar', drone: 'Surveillance X', status: 'Pending Parts', date: '2025-06-06' },
        ],
        recentMarketingClaims: [
            { id: 'MC-005', campaign: 'Monsoon Sale', amount: 10000, status: 'Pending Approval', date: '2025-06-09' },
        ]
    });
    // --- End Dummy Data ---

    const [loading, setLoading] = useState(false); // No loading for dummy data
    const [error, setError] = useState(null);

    // In Phase 3, this useEffect would fetch real data from various backend APIs
    useEffect(() => {
        // Example: Simulating a fetch delay if you want to see a loading spinner
        // setLoading(true);
        // setTimeout(() => {
        //     setDashboardData(dummyDashboardData); // Replace with real fetched data
        //     setLoading(false);
        // }, 800);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                <p className="ml-4 text-blue-800">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 bg-red-100 border border-red-200 rounded-md">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl font-inter">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 pb-2 border-yellow-500">
                Dealer Dashboard
            </h2>
            <p className="text-gray-600 mb-8">
                Welcome to your dashboard! Here's a quick overview of your key activities and metrics.
            </p>

            {/* Quick Actions */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate(ROUTES.DEALER_NEW_ORDER)}
                        className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700 transition-colors flex items-center justify-center font-semibold"
                    >
                        {/* Plus icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Place New Order
                    </button>
                    <button
                        onClick={() => navigate(ROUTES.DEALER_ADD_CUSTOMER)}
                        className="bg-purple-600 text-white p-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center font-semibold"
                    >
                        {/* User Plus icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                        Add New Customer
                    </button>
                    <button
                        onClick={() => navigate(ROUTES.DEALER_REPAIRS)}
                        className="bg-orange-600 text-white p-4 rounded-lg shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center font-semibold"
                    >
                        {/* Wrench icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                            <path d="M12.5 10a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm-2 0a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm-5 0a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Zm-2 0a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v3.5a1.5 1.5 0 0 1-.5 1.293L13 7.071V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 0 14.5V7.071l-.5-.278A1.5 1.5 0 0 1 0 5.5V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5Zm10 1.5H2a.5.5 0 0 0-.5.5v2.5H14V2a.5.5 0 0 0-.5-.5Z"/>
                            <path d="M0 8a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 8v6.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5V8Zm1 7a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H1.5A.5.5 0 0 0 1 8v6.5Z"/>
                        </svg>
                        Submit Repair Request
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                    <p className="text-sm text-blue-700 font-medium">Total Orders</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">{dashboardData.totalOrders}</p>
                </div>
                <div className="bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-600">
                    <p className="text-sm text-red-700 font-medium">Pending Repairs</p>
                    <p className="text-3xl font-bold text-red-900 mt-2">{dashboardData.pendingRepairs}</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
                    <p className="text-sm text-yellow-700 font-medium">Current Inventory Value</p>
                    <p className="text-3xl font-bold text-yellow-900 mt-2">₹{dashboardData.currentInventoryValue.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
                    {dashboardData.recentOrders.length === 0 ? (
                        <p className="text-gray-500">No recent orders.</p>
                    ) : (
                        <ul className="space-y-3">
                            {dashboardData.recentOrders.map(order => (
                                <li key={order.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                                    <div>
                                        <Link to={`${ROUTES.DEALER_ORDERS}/${order.id}`} className="text-blue-600 hover:underline font-medium">
                                            {order.id}
                                        </Link>
                                        <p className="text-gray-600 text-sm">{order.customer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-800 font-medium">₹{order.amount.toLocaleString('en-IN')}</p>
                                        <p className={`text-xs font-semibold ${
                                            order.status === 'Processing' ? 'text-orange-500' :
                                            order.status === 'Shipped' ? 'text-blue-500' : 'text-gray-500'
                                        }`}>{order.status}</p>
                                        <p className="text-gray-500 text-xs">{order.date}</p>
                                    </div>
                                </li>
                            ))}
                            <li className="text-center pt-3">
                                <Link to={ROUTES.DEALER_ORDERS} className="text-blue-600 hover:underline text-sm font-semibold">
                                    View All Orders &rarr;
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Recent Repair Requests */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Repair Requests</h3>
                    {dashboardData.recentRepairs.length === 0 ? (
                        <p className="text-gray-500">No recent repair requests.</p>
                    ) : (
                        <ul className="space-y-3">
                            {dashboardData.recentRepairs.map(repair => (
                                <li key={repair.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                                    <div>
                                        {/* Assuming repair requests have a detail page route, replace # */}
                                        <Link to={`${ROUTES.DEALER_REPAIRS}/${repair.id}`} className="text-blue-600 hover:underline font-medium">
                                            {repair.id}
                                        </Link>
                                        <p className="text-gray-600 text-sm">{repair.customer} - {repair.drone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xs font-semibold ${
                                            repair.status === 'In Progress' ? 'text-blue-500' :
                                            repair.status === 'Pending Parts' ? 'text-orange-500' : 'text-gray-500'
                                        }`}>{repair.status}</p>
                                        <p className="text-gray-500 text-xs">{repair.date}</p>
                                    </div>
                                </li>
                            ))}
                            <li className="text-center pt-3">
                                <Link to={ROUTES.DEALER_REPAIRS} className="text-blue-600 hover:underline text-sm font-semibold">
                                    View All Repair Requests &rarr;
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Recent Marketing Claims (New Section) */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 lg:col-span-2"> {/* Takes full width on large screens */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Marketing Claims</h3>
                    {dashboardData.recentMarketingClaims.length === 0 ? (
                        <p className="text-gray-500">No recent marketing claims.</p>
                    ) : (
                        <ul className="space-y-3">
                            {dashboardData.recentMarketingClaims.map(claim => (
                                <li key={claim.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                                    <div>
                                        {/* Assuming marketing claims have a detail page route, replace # */}
                                        <Link to={`${ROUTES.DEALER_MARKETING}/${claim.id}`} className="text-blue-600 hover:underline font-medium">
                                            {claim.id}
                                        </Link>
                                        <p className="text-gray-600 text-sm">Campaign: {claim.campaign}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-800 font-medium">₹{claim.amount.toLocaleString('en-IN')}</p>
                                        <p className={`text-xs font-semibold ${
                                            claim.status === 'Pending Approval' ? 'text-orange-500' : 'text-gray-500'
                                        }`}>{claim.status}</p>
                                        <p className="text-gray-500 text-xs">{claim.date}</p>
                                    </div>
                                </li>
                            ))}
                             <li className="text-center pt-3">
                                <Link to={ROUTES.DEALER_MARKETING} className="text-blue-600 hover:underline text-sm font-semibold">
                                    View All Marketing Claims &rarr;
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DealerDashboard;

// src/layouts/DealerPortalLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// Route constants (imported from App.jsx's global ROUTES)
// For simplicity, we'll redefine relevant ones or pass them as props if preferred
// But for now, let's assume direct usage based on App.jsx structure
const ROUTES = {
    DEALER_DASHBOARD: '/dealer/dashboard',
    DEALER_ORDERS: '/dealer/orders',
    DEALER_NEW_ORDER: '/dealer/orders/new', // Example specific sub-link
    DEALER_REPAIRS: '/dealer/repairs',
    DEALER_MARKETING: '/dealer/marketing',
    DEALER_INVENTORY: '/dealer/inventory',
    DEALER_ACCOUNT: '/dealer/account',
    LOGIN: '/login' // For logout link in a real app, though AuthContext handles it
};

const DealerPortalLayout = ({ dealerName = "Aerion Aerospace Dealers" }) => {
    // In a real application, you might use useAuth() to get logout function
    // For now, a simple logout placeholder
    const handleLogout = () => {
        // Implement actual logout logic here if needed, or rely on main app's logout
        console.log("Dealer logout attempted. Redirecting to login or home.");
        // Example: Redirect to login or home after logout
        // navigate(ROUTES.LOGIN);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: '#0A2558', // Dark blue background
                color: '#fff',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: '#F0B800', marginBottom: '30px', textAlign: 'center' }}>
                    {dealerName}
                </h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_DASHBOARD} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                Dashboard
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_ORDERS} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                Orders
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_REPAIRS} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                Repair Requests
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_MARKETING} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                Marketing Claims
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_INVENTORY} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                My Inventory
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_ACCOUNT} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                display: 'block',
                                borderRadius: '5px',
                                transition: 'background-color 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                Account Details
                            </Link>
                        </li>
                        <li style={{ marginTop: '30px' }}>
                             <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: '#F0B800', // Yellow button
                                    color: '#0A2558', // Dark blue text
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '1em',
                                    fontWeight: 'bold',
                                    width: '100%' // Full width button
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Outlet /> {/* This is where the nested routes (Dashboard, Orders, etc.) will render */}
            </main>
        </div>
    );
};

export default DealerPortalLayout;
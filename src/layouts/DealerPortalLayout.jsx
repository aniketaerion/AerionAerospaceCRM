// src/layouts/DealerPortalLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Uncomment in Phase 3 if you need actual logout/user info

const ROUTES = {
    DEALER_DASHBOARD: '/dealer/dashboard',
    DEALER_ORDERS: '/dealer/orders',
    DEALER_NEW_ORDER: '/dealer/orders/new',
    DEALER_REPAIRS: '/dealer/repairs',
    DEALER_MARKETING: '/dealer/marketing',
    DEALER_INVENTORY: '/dealer/inventory',
    DEALER_CUSTOMERS: '/dealer/customers',
    DEALER_ADD_CUSTOMER: '/dealer/customers/add',
    // UPDATED DEALER ACCOUNT/FINANCE/TEAM ROUTES
    DEALER_BUSINESS_PROFILE: '/dealer/profile', // Renamed from DEALER_ACCOUNT
    DEALER_FINANCIAL_DETAILS: '/dealer/finance', // NEW
    DEALER_MY_TEAM: '/dealer/team', // NEW
    LOGIN: '/login'
};

const DealerPortalLayout = ({ dealerName = "Aerion Aerospace Dealers" }) => {
    // const { logout } = useAuth(); // Uncomment in Phase 3

    const handleLogout = () => {
        console.log("Dealer logout attempted. Redirecting to login or home.");
        // In Phase 3, this would be: logout();
        // navigate(ROUTES.LOGIN); // Requires useNavigate hook if called directly here
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Inter, sans-serif' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px', // Slightly wider for branding
                backgroundColor: '#0A2558', // Dark blue background
                color: '#fff',
                padding: '20px',
                boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0 10px 10px 0' // Rounded right edge
            }}>
                {/* Aerion Aerospace Branding */}
                <div style={{ marginBottom: '30px', textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #1a3a6e' }}>
                    <img
                        src="https://placehold.co/120x40/F0B800/0A2558?text=Aerion+Logo" // Placeholder for Aerion Company Logo
                        alt="Aerion Aerospace Logo"
                        style={{ maxWidth: '120px', height: '40px', margin: '0 auto 10px auto', borderRadius: '5px' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/120x40/F0B800/0A2558?text=Aerion'; }} // Fallback
                    />
                    <h1 style={{ color: '#F0B800', fontSize: '1.8em', fontWeight: '800' }}>Aerion CRM</h1>
                    <p style={{ fontSize: '0.9em', color: '#bbb' }}>{dealerName}</p>
                </div>

                <nav style={{ flexGrow: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_DASHBOARD} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* CRM Home Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5Z"/>
                                    <path d="M12.5 14.5a.5.5 0 0 1 0-1h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5ZM13 12.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1ZM8 6a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V6Z"/>
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_ORDERS} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Order Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .5.5V4H14a2 2 0 0 1 2 2v1H.5a.5.5 0 0 1-.5-.5v-4ZM.5 7H16v5a2 2 0 0 1-2 2H2.5a.5.5 0 0 1 0-1H14a1 1 0 0 0 1-1V8H.5a.5.5 0 0 1-.5-.5v-1Z"/>
                                </svg>
                                Orders
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_REPAIRS} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Repair Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8Zm0 1c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7Zm0 3a.5.5 0 0 0-.5.5v3.293L5.646 9.646a.5.5 0 1 0 .708.708L8 7.707l1.646 1.647a.5.5 0 1 0 .708-.708L8.5 7.293V4.5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                                Repair Requests
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_MARKETING} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Marketing Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M14 6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12Zm-1.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1ZM2 7a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2H2Zm3.5 0a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2h-1Z"/>
                                </svg>
                                Marketing Claims
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_INVENTORY} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Inventory Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3ZM5 5v1h6V5h1.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H5Zm.5-1A.5.5 0 0 1 6 3.5h4a.5.5 0 0 1 .5.5v1A.5.5 0 0 1 10 5H6a.5.5 0 0 1-.5-.5v-1Z"/>
                                </svg>
                                My Inventory
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_CUSTOMERS} style={{
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Customers Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path fillRule="evenodd" d="M2 10a.5.5 0 0 0-.5.5v.5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5a.5.5 0 0 0-.5-.5H2Z"/>
                                </svg>
                                My Customers
                            </Link>
                        </li>

                        {/* New Section for Account & Finance */}
                        <li style={{ marginTop: '25px', marginBottom: '10px', color: '#ccc', fontSize: '0.8em', textTransform: 'uppercase', paddingLeft: '10px' }}>
                            Account & Finance
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_BUSINESS_PROFILE} style={{ // POINTS TO NEW BUSINESS PROFILE
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Profile Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1Z"/>
                                </svg>
                                Business Profile
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_FINANCIAL_DETAILS} style={{ // NEW FINANCIAL DETAILS PAGE
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Finance Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M4 10a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1Z"/>
                                    <path d="M12.5 0H3.5A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 12.5 0ZM13 1.5a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h9Z"/>
                                    <path d="M6 3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                                </svg>
                                Financial Details
                            </Link>
                        </li>

                        {/* New Section for Support */}
                        <li style={{ marginTop: '25px', marginBottom: '10px', color: '#ccc', fontSize: '0.8em', textTransform: 'uppercase', paddingLeft: '10px' }}>
                            Support
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to={ROUTES.DEALER_MY_TEAM} style={{ // NEW MY TEAM PAGE
                                color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* Team Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-9 1A2 2 0 0 0 0 11v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2Zm.5-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
                                </svg>
                                My Support Team
                            </Link>
                        </li>
                           <li style={{ marginBottom: '15px' }}>
                               <a href="https://aerion.com" target="_blank" rel="noopener noreferrer" style={{ // Aerion Company Website Link
                                   color: '#fff', textDecoration: 'none', padding: '12px 18px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background-color 0.2s', fontWeight: '600'
                               }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='#1a3a6e'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                                {/* External Link Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5Z"/>
                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.146L6.354 9.146a.5.5 0 1 0 .708.708L15 1.707V4.5a.5.5 0 0 0 1 0v-4Z"/>
                                </svg>
                                Aerion Website
                               </a>
                           </li>
                    </ul>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #1a3a6e' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '12px 18px',
                            backgroundColor: '#F0B800', // Gold color for logout button
                            color: '#0A2558', // Dark blue text
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            fontSize: '1em'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor='#d4a300'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor='#F0B800'}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default DealerPortalLayout;
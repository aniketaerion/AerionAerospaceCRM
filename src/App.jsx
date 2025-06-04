// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import supabase from './supabaseClient'; // Your Supabase client instance

// Existing main app pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard'; // This is your main app dashboard
import LeadForm from './pages/LeadForm';
import Navbar from './components/Navbar'; // Your main app Navbar

// --- NEW IMPORTS FOR DEALER MODULE PAGES AND LAYOUT ---
import DealerPortalLayout from './layouts/DealerPortalLayout'; // Assuming this is in src/layouts
import DealerDashboard from './pages/dealer/DealerDashboard';
import PlaceNewOrder from './pages/dealer/PlaceNewOrder';
import MyOrders from './pages/dealer/MyOrders';
import OrderDetail from './pages/dealer/OrderDetail'; // Your OrderDetail page
import RepairRequests from './pages/dealer/RepairRequests';
import MarketingClaims from './pages/dealer/MarketingClaims';
import MyInventory from './pages/dealer/MyInventory';
import AccountDetails from './pages/dealer/AccountDetails';
// --- END NEW IMPORTS ---

// --- ROUTE CONSTANTS (ONLY ONE DECLARATION OF 'ROUTES' SHOULD EXIST) ---
// This combines all your existing routes with the new dealer routes.
const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard', // Main CRM Dashboard
  LEAD_FORM: '/leadform',
  ROOT: '/',
  NOT_FOUND: '*',

  // --- NEW DEALER ROUTES ---
  DEALER_ROOT: '/dealer', // The base path for the entire dealer portal
  DEALER_DASHBOARD: '/dealer/dashboard',
  DEALER_ORDERS: '/dealer/orders',
  DEALER_NEW_ORDER: '/dealer/orders/new',
  DEALER_ORDER_DETAIL: '/dealer/orders/:orderId', // Specific Order Detail route
  DEALER_REPAIRS: '/dealer/repairs',
  DEALER_MARKETING: '/dealer/marketing',
  DEALER_INVENTORY: '/dealer/inventory',
  DEALER_ACCOUNT: '/dealer/account',
  // --- END NEW DEALER ROUTES ---
};
// --- END ROUTE CONSTANTS ---


// --- Auth Context (Keep as is) ---
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.access_token) {
          localStorage.setItem('authToken', session.access_token);
          setAuthToken(session.access_token);
        } else {
          localStorage.removeItem('authToken');
          setAuthToken(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- PrivateRoute (Keep as is) ---
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
};


// --- AppRoutes (Contains all your application's routing logic) ---
const AppRoutes = () => {
  const location = useLocation();

  // Logic to hide the main Navbar when on Login, Signup, or any Dealer Portal route
  const isDealerRoute = location.pathname.startsWith(ROUTES.DEALER_ROOT);
  const hideNavbarRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isDealerRoute;

  const { isAuthenticated } = useAuth(); // Uses your existing authentication state

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowNavbar && <Navbar />} {/* Your main Navbar, hidden on dealer routes */}

      <Routes>
        {/* Redirect from root based on authentication status */}
        <Route
          path={ROUTES.ROOT}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace /> // Authenticated users go to main dashboard
            ) : (
              <Navigate to={ROUTES.LOGIN} replace /> // Unauthenticated users go to login
            )
          }
        />

        {/* Login Page */}
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />
          }
        />

        {/* Signup Page */}
        <Route
          path={ROUTES.SIGNUP}
          element={
            isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <SignupPage />
          }
        />

        {/* Main CRM Dashboard (Protected) */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Lead Form (Protected) */}
        <Route
          path={ROUTES.LEAD_FORM}
          element={
            <PrivateRoute>
              <LeadForm />
            </PrivateRoute>
          }
        />

        {/* --- DEALER PORTAL ROUTES BLOCK --- */}
        {/* All routes under /dealer will be private and use the DealerPortalLayout */}
        <Route
          path={ROUTES.DEALER_ROOT + "/*"} // This matches any path starting with /dealer/
          element={
            <PrivateRoute> {/* Ensures only authenticated users can access */}
              {/* This layout component provides the sidebar and common structure for dealer pages */}
              <DealerPortalLayout dealerName="Your Dealership Name" />
            </PrivateRoute>
          }
        >
          {/* Nested routes within the Dealer Portal Layout */}
          <Route index element={<Navigate to={ROUTES.DEALER_DASHBOARD} replace />} /> {/* /dealer -> /dealer/dashboard */}
          <Route path="dashboard" element={<DealerDashboard />} /> {/* /dealer/dashboard */}
          <Route path="orders" element={<MyOrders />} /> {/* /dealer/orders */}
          <Route path="orders/new" element={<PlaceNewOrder />} /> {/* /dealer/orders/new */}
          <Route path={ROUTES.DEALER_ORDER_DETAIL} element={<OrderDetail />} /> {/* /dealer/orders/:orderId */}
          <Route path="repairs" element={<RepairRequests />} /> {/* /dealer/repairs */}
          <Route path="marketing" element={<MarketingClaims />} /> {/* /dealer/marketing */}
          <Route path="inventory" element={<MyInventory />} /> {/* /dealer/inventory */}
          <Route path="account" element={<AccountDetails />} /> {/* /dealer/account */}
          {/* Catch-all for any other path directly under /dealer/ that is not explicitly defined */}
          <Route path="*" element={<h2>404 - Dealer Sub-Page Not Found</h2>} />
        </Route>
        {/* --- END DEALER PORTAL ROUTES BLOCK --- */}

        {/* Catch-all for any other route not matched by the above (404) */}
        <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ROOT} replace />} />
      </Routes>
    </div>
  );
};


// --- Main App Component (Keep as is) ---
const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
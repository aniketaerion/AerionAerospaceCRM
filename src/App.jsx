    // src/App.jsx
    import React, { createContext, useContext, useState, useEffect } from 'react';
    import {
      Routes,
      Route,
      Navigate,
      useLocation,
    } from 'react-router-dom';

    import supabase from './supabaseClient'; // This is likely a JS file, keep as is unless it's .ts or .jsx

    // Pages and components - ALL CORRECTED WITH .jsx
    import LoginPage from './pages/LoginPage.jsx';
    import SignupPage from './pages/SignupPage.jsx';
    import Dashboard from './pages/Dashboard.jsx';
    import LeadForm from './pages/LeadForm.jsx';
    import Navbar from './components/Navbar.jsx';

    // Dealer layout and pages - ALL CORRECTED WITH .jsx/.tsx
    import DealerPortalLayout from './layouts/DealerPortalLayout.jsx';
    import DealerDashboard from './pages/dealer/DealerDashboard.jsx';
    import PlaceNewOrder from './pages/dealer/PlaceNewOrder.jsx';
    import MyOrders from './pages/dealer/MyOrders.jsx';
    import OrderDetail from './pages/dealer/OrderDetail.tsx'; // Ensure .tsx for TypeScript
    import RepairRequests from './pages/dealer/RepairRequests.jsx';
    import MarketingClaims from './pages/dealer/MarketingClaims.jsx';
    import MyInventory from './pages/dealer/MyInventory.jsx';
    import AccountDetails from './pages/dealer/AccountDetails.jsx';
    import MyCustomers from './pages/dealer/MyCustomers.jsx';
    import AddCustomerForm from './pages/dealer/AddCustomerForm.jsx'; // ADDED THIS LINE

    // Route constants
    const ROUTES = {
      LOGIN: '/login',
      SIGNUP: '/signup',
      DASHBOARD: '/dashboard',
      LEAD_FORM: '/leadform',
      ROOT: '/',
      NOT_FOUND: '*',
      DEALER_ROOT: '/dealer',
      DEALER_DASHBOARD: '/dealer/dashboard',
      DEALER_ORDERS: '/dealer/orders',
      DEALER_NEW_ORDER: '/dealer/orders/new',
      DEALER_ORDER_DETAIL: '/dealer/orders/:orderId',
      DEALER_REPAIRS: '/dealer/repairs',
      DEALER_MARKETING: '/dealer/marketing',
      DEALER_INVENTORY: '/dealer/inventory',
      DEALER_ACCOUNT: '/dealer/account',
      DEALER_CUSTOMERS: '/dealer/customers',
      DEALER_ADD_CUSTOMER: '/dealer/customers/add', // ADDED THIS LINE
    };

    // Auth context and hooks
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

    const PrivateRoute = ({ children }) => {
      const { isAuthenticated } = useAuth();
      return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
    };

    const AppRoutes = () => {
      const location = useLocation();
      const isDealerRoute = location.pathname.startsWith(ROUTES.DEALER_ROOT);
      const hideNavbarRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
      const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isDealerRoute;

      const { isAuthenticated } = useAuth();

      return (
        <div className="min-h-screen bg-gray-50">
          {shouldShowNavbar && <Navbar />}

          <Routes>
            <Route
              path={ROUTES.ROOT}
              element={
                isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Navigate to={ROUTES.LOGIN} replace />
              }
            />

            <Route
              path={ROUTES.LOGIN}
              element={
                isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />
              }
            />

            <Route
              path={ROUTES.SIGNUP}
              element={
                isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <SignupPage />
              }
            />

            <Route
              path={ROUTES.DASHBOARD}
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />

            <Route
              path={ROUTES.LEAD_FORM}
              element={<PrivateRoute><LeadForm /></PrivateRoute>}
            />

            {/* Dealer Portal Routes */}
            <Route
              path={ROUTES.DEALER_ROOT + '/*'}
              element={<PrivateRoute><DealerPortalLayout dealerName="Your Dealership Name" /></PrivateRoute>}
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DealerDashboard />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/new" element={<PlaceNewOrder />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="repairs" element={<RepairRequests />} />
              <Route path="marketing" element={<MarketingClaims />} />
              <Route path="inventory" element={<MyInventory />} />
              <Route path="customers" element={<MyCustomers />} />
              <Route path="customers/add" element={<AddCustomerForm />} /> {/* ADDED THIS LINE */}
              <Route path="account" element={<AccountDetails />} />
              <Route path="*" element={<h2>404 - Dealer Sub-Page Not Found</h2>} />
            </Route>

            <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ROOT} replace />} />
          </Routes>
        </div>
      );
    };

    const App = () => (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    );

    export default App;
    
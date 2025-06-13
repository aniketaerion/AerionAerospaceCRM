// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

// Auth context and hooks
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token) {
        localStorage.setItem('authToken', session.access_token);
        setAuthToken(session.access_token);
      } else {
        localStorage.removeItem('authToken');
        setAuthToken(null);
      }
    });

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
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Layout and Dealer Pages
import DealerPortalLayout from './layouts/DealerPortalLayout.jsx';
import DealerDashboard from './pages/dealer/dashboard/index.jsx';
import SalesDashboard from './pages/dealer/sales/dashboard/index.jsx';
import CRMDashboard from './pages/dealer/crm/dashboard/index.jsx';
import InventoryDashboard from './pages/dealer/inventory/dashboard/index.jsx';
import FinanceDashboard from './pages/dealer/finance/dashboard/index.jsx';
import ServiceDashboard from './pages/dealer/service/dashboard/index.jsx';
import MarketingDashboard from './pages/dealer/marketing/dashboard/index.jsx';
import ReportsDashboard from './pages/dealer/reports/dashboard/index.jsx';
import DealerProfile from './pages/dealer/profile/index.jsx';
import LoginPage from './pages/login/LoginPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dealer/*"
        element={
          <PrivateRoute>
            <DealerPortalLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<DealerDashboard />} />
        <Route path="sales/dashboard" element={<SalesDashboard />} />
        <Route path="crm/dashboard" element={<CRMDashboard />} />
        <Route path="inventory/dashboard" element={<InventoryDashboard />} />
        <Route path="finance/dashboard" element={<FinanceDashboard />} />
        <Route path="service/dashboard" element={<ServiceDashboard />} />
        <Route path="marketing/dashboard" element={<MarketingDashboard />} />
        <Route path="reports/dashboard" element={<ReportsDashboard />} />
        <Route path="profile" element={<DealerProfile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;

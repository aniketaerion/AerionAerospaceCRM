// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import supabase from '@/supabaseClient';

// Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        localStorage.setItem('authToken', session.access_token);
        setAuthToken(session.access_token);
      } else {
        localStorage.removeItem('authToken');
        setAuthToken(null);
      }
    });

    return () => authListener?.unsubscribe();
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

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();
  return authToken ? children : <Navigate to="/login" replace />;
};

// Layout
import DealerPortalLayout from './layouts/DealerPortalLayout.jsx';

// CRM Lead Module (full)
import CrmDashboard from './pages/dealer/crm/leads/CrmDashboard.jsx';
import LeadsList from './pages/dealer/crm/leads/LeadsList.jsx';
import CreateLead from './pages/dealer/crm/leads/CreateLead.jsx';
import LeadAnalytics from './pages/dealer/crm/leads/LeadPerformance.jsx';
import Tasks from './pages/dealer/crm/leads/Tasks.jsx';
import Reminders from './pages/dealer/crm/leads/Reminders.jsx';
import Campaigns from './pages/dealer/crm/leads/Campaigns.jsx';
import Contacts from './pages/dealer/crm/leads/Contacts.jsx';
import BulkAssignments from './pages/dealer/crm/leads/BulkAssignments.jsx';
import LeadModuleTabs from './pages/dealer/crm/leads/Index.jsx';
import LeadDetail from './pages/dealer/crm/leads/LeadDetail.jsx';

// Dealer System Dashboards
import DealerDashboard from './pages/dealer/dashboard/index.jsx';
import SalesDashboard from './pages/dealer/sales/dashboard/index.jsx';
import InventoryDashboard from './pages/dealer/inventory/dashboard/index.jsx';
import FinanceDashboard from './pages/dealer/finance/dashboard/index.jsx';
import ServiceDashboard from './pages/dealer/service/dashboard/index.jsx';
import MarketingDashboard from './pages/dealer/marketing/dashboard/index.jsx';
import ReportsDashboard from './pages/dealer/reports/dashboard/index.jsx';
import DealerProfile from './pages/dealer/profile/index.jsx';

// Auth Pages
import LoginPage from './pages/login/LoginPage.jsx';

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ['/login'].includes(location.pathname);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dealer/*"
        element={
          <PrivateRoute>
            <DealerPortalLayout dealerName="Aerion Aerospace Dealers" />
          </PrivateRoute>
        }
      >
        {/* Dealer Dashboards */}
        <Route path="dashboard" element={<DealerDashboard />} />
        <Route path="sales/dashboard" element={<SalesDashboard />} />
        <Route path="crm/dashboard" element={<CrmDashboard />} />

        {/* CRM Leads Module */}
        <Route path="crm/leads" element={<LeadModuleTabs />} />
        <Route path="crm/leads/list" element={<LeadsList />} />
        <Route path="crm/leads/create" element={<CreateLead />} />
        <Route path="crm/leads/analytics" element={<LeadAnalytics />} />
        <Route path="crm/leads/tasks" element={<Tasks />} />
        <Route path="crm/leads/reminders" element={<Reminders />} />
        <Route path="crm/leads/campaigns" element={<Campaigns />} />
        <Route path="crm/leads/contacts" element={<Contacts />} />
        <Route path="crm/leads/bulk-assignments" element={<BulkAssignments />} />
        <Route path="crm/leads/detail/:leadId" element={<LeadDetail />} />

        {/* Other Dealer Modules */}
        <Route path="inventory/dashboard" element={<InventoryDashboard />} />
        <Route path="finance/dashboard" element={<FinanceDashboard />} />
        <Route path="service/dashboard" element={<ServiceDashboard />} />
        <Route path="marketing/dashboard" element={<MarketingDashboard />} />
        <Route path="reports/dashboard" element={<ReportsDashboard />} />
        <Route path="profile" element={<DealerProfile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;

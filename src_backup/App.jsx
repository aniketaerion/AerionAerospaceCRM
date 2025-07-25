// src/App.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';

// Auth Context
const AuthContext = createContext(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('authToken', session.access_token);
        setAuthToken(session.access_token);
      }
      setLoadingAuth(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const newAuthToken = session?.access_token || null;
      setAuthToken(newAuthToken);
      if (newAuthToken) {
        localStorage.setItem('authToken', newAuthToken);
      } else {
        localStorage.removeItem('authToken');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
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

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <div className="text-aerion-blue text-2xl font-semibold">Loading Application...</div>
      </div>
    );
  }

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
import DealerPortalLayout from '@/layouts/DealerPortalLayout.jsx';

// CRM Leads Module
import CrmDashboard from '@/pages/dealer/crm/leads/CrmDashboard.jsx';
import LeadsList from '@/pages/dealer/crm/leads/LeadsList.jsx';
import CreateLead from '@/pages/dealer/crm/leads/CreateLead.jsx';
import LeadAnalytics from '@/pages/dealer/crm/leads/LeadPerformance.jsx';
import Tasks from '@/pages/dealer/crm/leads/Tasks.jsx';
import Reminders from '@/pages/dealer/crm/leads/Reminders.jsx';
import Campaigns from '@/pages/dealer/crm/leads/Campaigns.jsx';
import Contacts from '@/pages/dealer/crm/leads/Contacts.jsx';
import BulkAssignments from '@/pages/dealer/crm/leads/BulkAssignments.jsx';
import LeadModuleTabs from '@/pages/dealer/crm/leads/Index.jsx';
import LeadDetail from '@/pages/dealer/crm/leads/LeadDetail.jsx';
import BulkImport from '@/pages/dealer/crm/leads/BulkImport.jsx';
import LeadDisposition from '@/pages/dealer/crm/leads/LeadDisposition.jsx';
import LeadsPanel from '@/pages/dealer/crm/leads/LeadsPanel.jsx';

// CRM Customers Module
import CustomersPanel from '@/pages/dealer/crm/customers/CustomersPanel.jsx';
import CustomerDetail from '@/pages/dealer/crm/customers/CustomerDetail.jsx';
import CustomerAnalytics from '@/pages/dealer/crm/customers/CustomerAnalytics.jsx';
import CustomerReferrals from '@/pages/dealer/crm/customers/CustomerReferrals.jsx';
import CustomerEngagementScore from '@/pages/dealer/crm/customers/CustomerEngagementScore.jsx';
import CustomerServicePanel from '@/pages/dealer/crm/customers/CustomerServicePanel.jsx';
import CustomerCalendarView from '@/pages/dealer/crm/customers/CustomerCalendarView.jsx';
import CustomerTimeline from '@/pages/dealer/crm/customers/CustomerTimeline.jsx';
import CustomerProfileDownload from '@/pages/dealer/crm/customers/CustomerProfileDownload.jsx';
import CustomerFilterBar from '@/pages/dealer/crm/customers/CustomerFilterBar.jsx';

// Dealer System Dashboards
import DealerDashboard from '@/pages/dealer/dashboard/index.jsx';
import SalesDashboard from '@/pages/dealer/sales/dashboard/index.jsx';
import InventoryDashboard from '@/pages/dealer/inventory/dashboard/index.jsx';
import FinanceDashboard from '@/pages/dealer/finance/dashboard/index.jsx';
import ServiceDashboard from '@/pages/dealer/service/dashboard/index.jsx';
import MarketingDashboard from '@/pages/dealer/marketing/dashboard/index.jsx';
import ReportsDashboard from '@/pages/dealer/reports/dashboard/index.jsx';
import DealerProfile from '@/pages/dealer/profile/index.jsx';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
// ========================================================================
// THIS IS THE CORRECTED LINE THAT FIXES THE ERROR
import SignupPage from '@/pages/auth/SignupPage';
// ========================================================================

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/dealer/*"
        element={
          <PrivateRoute>
            <DealerPortalLayout />
          </PrivateRoute>
        }
      >
        {/* Dealer Dashboards */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DealerDashboard />} />
        <Route path="sales/dashboard" element={<SalesDashboard />} />
        
        {/* CRM Module Parent Route */}
        <Route path="crm" element={<CrmDashboard />} /> 

        {/* CRM Leads Sub-Module */}
        <Route path="crm/leads" element={<LeadModuleTabs />} />
        <Route path="crm/leads/list" element={<LeadsList />} />
        <Route path="crm/leads/create" element={<CreateLead />} />
        <Route path="crm/leads/analytics" element={<LeadAnalytics />} />
        <Route path="crm/leads/tasks" element={<Tasks />} />
        <Route path="crm/leads/reminders" element={<Reminders />} />
        <Route path="crm/leads/campaigns" element={<Campaigns />} />
        <Route path="crm/leads/contacts" element={<Contacts />} />
        <Route path="crm/leads/bulk-assignments" element={<BulkAssignments />} />
        <Route path="crm/leads/bulk-import" element={<BulkImport />} />
        <Route path="crm/leads/disposition" element={<LeadDisposition />} />
        <Route path="crm/leads/panel" element={<LeadsPanel />} />
        <Route path="crm/leads/detail/:leadId" element={<LeadDetail />} />

        {/* CRM Customers Sub-Module */}
        <Route path="crm/customers/panel" element={<CustomersPanel />} />
        <Route path="crm/customers/detail/:customerId" element={<CustomerDetail />} />
        <Route path="crm/customers/analytics" element={<CustomerAnalytics />} />
        <Route path="crm/customers/referrals" element={<CustomerReferrals />} />
        <Route path="crm/customers/engagement" element={<CustomerEngagementScore />} />
        <Route path="crm/customers/service" element={<CustomerServicePanel />} />
        <Route path="crm/customers/calendar" element={<CustomerCalendarView />} />
        <Route path="crm/customers/timeline" element={<CustomerTimeline />} />
        <Route path="crm/customers/profile-download" element={<CustomerProfileDownload />} />
        <Route path="crm/customers/filter" element={<CustomerFilterBar />} />

        {/* Other Dealer Modules */}
        <Route path="inventory/dashboard" element={<InventoryDashboard />} />
        <Route path="finance/dashboard" element={<FinanceDashboard />} />
        <Route path="service/dashboard" element={<ServiceDashboard />} />
        <Route path="marketing/dashboard" element={<MarketingDashboard />} />
        <Route path="reports/dashboard" element={<ReportsDashboard />} />
        <Route path="profile" element={<DealerProfile />} />

        {/* Fallback for /dealer/* routes */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Fallback for any other unmatched routes outside /dealer */}
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
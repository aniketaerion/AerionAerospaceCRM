// src/routes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerPortalLayout from '@/layouts/DealerPortalLayout.jsx';
import ProtectedRoute from '@/components/auth/PrivateRoute.jsx';

const PageLoader = () => (
  <div className="w-full p-10 flex items-center justify-center">
    <p className="text-lg font-medium">Loading Page...</p>
  </div>
);

// Public Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage/index.jsx'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage/index.tsx'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword/index.jsx'));
const UpdatePassword = lazy(() => import('@/pages/auth/UpdatePassword/index.jsx'));

// Global Pages (e.g., About, Contact, Support - if not part of a specific module's submenu)
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/index.jsx'));
const AboutPage = lazy(() => import('@/pages/AboutPage.jsx')); // Placeholder
const ContactPage = lazy(() => import('@/pages/ContactPage.jsx')); // Placeholder
const SupportPage = lazy(() => import('@/pages/SupportPage.jsx')); // Placeholder


// --- Dealer Portal Modules ---
const DashboardPage = lazy(() => import('@/pages/Dashboard/index.jsx')); // Global Dashboard

// CRM Module
const CrmDashboardPage = lazy(() => import('@/pages/dealer/crm/leads/CrmDashboard.jsx'));
const LeadsList = lazy(() => import('@/pages/dealer/crm/leads/LeadsList.jsx'));
const CreateLead = lazy(() => import('@/pages/dealer/crm/leads/CreateLead.jsx'));
const LeadDetail = lazy(() => import('@/pages/dealer/crm/leads/LeadDetail.jsx'));
const CustomersList = lazy(() => import('@/pages/dealer/crm/customers/CustomersList.jsx'));
const CustomerDetail = lazy(() => import('@/pages/dealer/crm/customers/CustomerDetail.jsx'));
const CrmTasks = lazy(() => import('@/pages/dealer/crm/CrmTasks.jsx'));
const CrmAppointments = lazy(() => import('@/pages/dealer/crm/CrmAppointments.jsx'));

// Sales Module
const SalesPanel = lazy(() => import('@/pages/dealer/sales/SalesPanel.jsx'));
const SalesDashboard = lazy(() => import('@/pages/dealer/sales/SalesDashboard.jsx'));
const CreateQuote = lazy(() => import('@/pages/dealer/sales/CreateQuote.jsx'));
const OrderList = lazy(() => import('@/pages/dealer/sales/OrderList.jsx'));
const QuotesList = lazy(() => import('@/pages/dealer/sales/QuotesList.jsx'));
const SalesAnalytics = lazy(() => import('@/pages/dealer/sales/SalesAnalytics.jsx'));
const Commissions = lazy(() => import('@/pages/dealer/sales/Commissions.jsx'));

// Inventory Module
const InventoryDashboard = lazy(() => import('@/pages/dealer/inventory/dashboard/index.jsx'));
const MyInventory = lazy(() => import('@/pages/dealer/inventory/MyInventory.jsx'));
const ProductDetail = lazy(() => import('@/pages/dealer/inventory/ProductDetail.jsx'));
const AddProduct = lazy(() => import('@/pages/dealer/inventory/AddProduct.jsx'));
const StockAdjustments = lazy(() => import('@/pages/dealer/inventory/StockAdjustments.jsx'));
const ReturnsManagement = lazy(() => import('@/pages/dealer/inventory/ReturnsManagement.jsx'));
const Suppliers = lazy(() => import('@/pages/dealer/inventory/Suppliers.jsx'));
const PurchaseOrders = lazy(() => import('@/pages/dealer/inventory/PurchaseOrders.jsx'));
const CreatePurchaseOrder = lazy(() => import('@/pages/dealer/inventory/CreatePurchaseOrder.jsx'));
const ProductCatalog = lazy(() => import('@/pages/dealer/inventory/ProductCatalog.jsx'));

// Finance Module
const FinanceDashboard = lazy(() => import('@/pages/dealer/finance/FinanceDashboard.jsx'));
const Invoices = lazy(() => import('@/pages/dealer/finance/Invoices.jsx'));
const Payments = lazy(() => import('@/pages/dealer/finance/Payments.jsx'));
const ExpensesManagement = lazy(() => import('@/pages/dealer/finance/ExpensesManagement.jsx'));
const Budgeting = lazy(() => import('@/pages/dealer/finance/Budgeting.jsx'));
const FinancialReports = lazy(() => import('@/pages/dealer/finance/FinancialReports.jsx'));
const CreateInvoice = lazy(() => import('@/pages/dealer/finance/CreateInvoice.jsx'));
const GeneralLedger = lazy(() => import('@/pages/dealer/finance/GeneralLedger.jsx'));
const BankReconciliation = lazy(() => import('@/pages/dealer/finance/BankReconciliation.jsx'));
const TaxManagement = lazy(() => import('@/pages/dealer/finance/TaxManagement.jsx'));

// Marketing Module
const MarketingDashboard = lazy(() => import('@/pages/dealer/marketing/MarketingDashboard.jsx'));
const ReimbursementPanel = lazy(() => import('@/pages/dealer/marketing/ReimbursementPanel.jsx'));
const CampaignReports = lazy(() => import('@/pages/dealer/marketing/CampaignReports.jsx'));
const ContentManagement = lazy(() => import('@/pages/dealer/marketing/ContentManagement.jsx'));
const SeoSemTools = lazy(() => import('@/pages/dealer/marketing/SeoSemTools.jsx'));
const SocialMediaPlanner = lazy(() => import('@/pages/dealer/marketing/SocialMediaPlanner.jsx'));
const MarketingCollaterals = lazy(() => import('@/pages/dealer/marketing/MarketingCollaterals.jsx')); // New

// Reports Module
const ReportsDashboard = lazy(() => import('@/pages/dealer/reports/dashboard/index.jsx'));
const CustomReports = lazy(() => import('@/pages/dealer/reports/CustomReports.jsx'));
const ScheduledReports = lazy(() => import('@/pages/dealer/reports/ScheduledReports.jsx'));
const DataExports = lazy(() => import('@/pages/dealer/reports/DataExports.jsx')); // New
const ReportSettings = lazy(() => import('@/pages/dealer/reports/ReportSettings.jsx')); // New

// Team Module
const TeamDashboard = lazy(() => import('@/pages/dealer/team/TeamDashboard.jsx'));
const UserManagement = lazy(() => import('@/pages/dealer/team/UserManagement.jsx'));
const PerformanceReviews = lazy(() => import('@/pages/dealer/team/PerformanceReviews.jsx'));
const LeaveManagement = lazy(() => import('@/pages/dealer/team/LeaveManagement.jsx'));
const Onboarding = lazy(() => import('@/pages/dealer/team/Onboarding.jsx'));
const TrainingCertifications = lazy(() => import('@/pages/dealer/team/TrainingCertifications.jsx'));
const PayrollManagement = lazy(() => import('@/pages/dealer/team/PayrollManagement.jsx'));
const RecruitmentManagement = lazy(() => import('@/pages/dealer/team/RecruitmentManagement.jsx'));
const EmployeeDirectory = lazy(() => import('@/pages/dealer/team/EmployeeDirectory.jsx'));

// Service Module
const ServiceDashboard = lazy(() => import('@/pages/dealer/service/dashboard/index.jsx'));
const RepairRequestForm = lazy(() => import('@/pages/dealer/service/RepairRequestForm.jsx'));
const ServiceHistory = lazy(() => import('@/pages/dealer/service/ServiceHistory.jsx'));
const WarrantyManagement = lazy(() => import('@/pages/dealer/service/WarrantyManagement.jsx'));
const TechnicianSchedule = lazy(() => import('@/pages/dealer/service/TechnicianSchedule.jsx'));
const ServiceDownloads = lazy(() => import('@/pages/dealer/service/ServiceDownloads.jsx')); // New
const ServiceAnalytics = lazy(() => import('@/pages/dealer/service/ServiceAnalytics.jsx')); // New

// Profile Module
const ProfilePage = lazy(() => import('@/pages/dealer/profile/index.jsx'));
const DealerProfile = lazy(() => import('@/pages/dealer/profile/DealerProfile.jsx'));
const SecuritySettings = lazy(() => import('@/pages/dealer/profile/SecuritySettings.jsx'));
const Notifications = lazy(() => import('@/pages/dealer/profile/Notifications.jsx'));
const AuditLog = lazy(() => import('@/pages/dealer/profile/AuditLog.jsx')); // New
const AccountPreferences = lazy(() => import('@/pages/dealer/profile/AccountPreferences.jsx')); // New

// Misc Pages (if they don't logically fit under a specific module's submenu)
const AddCustomerForm = lazy(() => import('@/pages/dealer/AddCustomerForm.jsx'));
const PlaceNewOrder = lazy(() => import('@/pages/dealer/PlaceNewOrder.jsx'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Protected Dealer Portal Routes */}
        <Route path="/dealer" element={<ProtectedRoute><DealerPortalLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* CRM */}
          <Route path="crm/dashboard" element={<CrmDashboardPage />} />
          <Route path="crm/leads/list" element={<LeadsList />} />
          <Route path="crm/leads/create" element={<CreateLead />} />
          <Route path="crm/leads/:id" element={<LeadDetail />} />
          <Route path="crm/customers/list" element={<CustomersList />} />
          <Route path="crm/customers/:id" element={<CustomerDetail />} />
          <Route path="crm/tasks" element={<CrmTasks />} />
          <Route path="crm/appointments" element={<CrmAppointments />} />

          {/* Sales */}
          <Route path="sales/panel" element={<SalesPanel />} />
          <Route path="sales/dashboard" element={<SalesDashboard />} />
          <Route path="sales/quotes/create" element={<CreateQuote />} />
          <Route path="sales/orders" element={<OrderList />} />
          <Route path="sales/quotes" element={<QuotesList />} />
          <Route path="sales/analytics" element={<SalesAnalytics />} />
          <Route path="sales/commissions" element={<Commissions />} />

          {/* Inventory */}
          <Route path="inventory/dashboard" element={<InventoryDashboard />} />
          <Route path="inventory/my-inventory" element={<MyInventory />} />
          <Route path="inventory/products/:id" element={<ProductDetail />} />
          <Route path="inventory/products/add" element={<AddProduct />} />
          <Route path="inventory/stock-adjustments" element={<StockAdjustments />} />
          <Route path="inventory/returns" element={<ReturnsManagement />} />
          <Route path="inventory/suppliers" element={<Suppliers />} />
          <Route path="inventory/purchase-orders" element={<PurchaseOrders />} />
          <Route path="inventory/purchase-orders/create" element={<CreatePurchaseOrder />} />
          <Route path="inventory/product-catalog" element={<ProductCatalog />} />


          {/* Finance */}
          <Route path="finance/dashboard" element={<FinanceDashboard />} />
          <Route path="finance/invoices" element={<Invoices />} />
          <Route path="finance/payments" element={<Payments />} />
          <Route path="finance/expenses" element={<ExpensesManagement />} />
          <Route path="finance/budgeting" element={<Budgeting />} />
          <Route path="finance/reports" element={<FinancialReports />} />
          <Route path="finance/invoices/create" element={<CreateInvoice />} />
          <Route path="finance/general-ledger" element={<GeneralLedger />} />
          <Route path="finance/bank-reconciliation" element={<BankReconciliation />} />
          <Route path="finance/tax-management" element={<TaxManagement />} />

          {/* Marketing */}
          <Route path="marketing/dashboard" element={<MarketingDashboard />} />
          <Route path="marketing/reimbursements" element={<ReimbursementPanel />} />
          <Route path="marketing/campaigns" element={<CampaignReports />} />
          <Route path="marketing/content" element={<ContentManagement />} />
          <Route path="marketing/seo-sem" element={<SeoSemTools />} />
          <Route path="marketing/social-media" element={<SocialMediaPlanner />} />
          <Route path="marketing/collaterals" element={<MarketingCollaterals />} /> {/* New */}

          {/* Reports */}
          <Route path="reports/dashboard" element={<ReportsDashboard />} />
          <Route path="reports/custom" element={<CustomReports />} />
          <Route path="reports/scheduled" element={<ScheduledReports />} />
          <Route path="reports/data-exports" element={<DataExports />} />
          <Route path="reports/settings" element={<ReportSettings />} />

          {/* Team */}
          <Route path="team/dashboard" element={<TeamDashboard />} />
          <Route path="team/users" element={<UserManagement />} />
          <Route path="team/performance" element={<PerformanceReviews />} />
          <Route path="team/leave" element={<LeaveManagement />} />
          <Route path="team/onboarding" element={<Onboarding />} />
          <Route path="team/training" element={<TrainingCertifications />} />
          <Route path="team/payroll" element={<PayrollManagement />} />
          <Route path="team/recruitment" element={<RecruitmentManagement />} />
          <Route path="team/employee-directory" element={<EmployeeDirectory />} />


          {/* Service */}
          <Route path="service/dashboard" element={<ServiceDashboard />} />
          <Route path="service/repair-request" element={<RepairRequestForm />} />
          <Route path="service/history" element={<ServiceHistory />} />
          <Route path="service/warranty" element={<WarrantyManagement />} />
          <Route path="service/technician-schedule" element={<TechnicianSchedule />} />
          <Route path="service/downloads" element={<ServiceDownloads />} /> {/* New */}
          <Route path="service/analytics" element={<ServiceAnalytics />} /> {/* New */}

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/dealer" element={<DealerProfile />} />
          <Route path="profile/security" element={<SecuritySettings />} />
          <Route path="profile/notifications" element={<Notifications />} />
          <Route path="profile/audit-log" element={<AuditLog />} />
          <Route path="profile/preferences" element={<AccountPreferences />} />

          {/* Misc (if still needed, otherwise integrate into modules) */}
          <Route path="add-customer" element={<AddCustomerForm />} />
          <Route path="place-order" element={<PlaceNewOrder />} />

          {/* Catch-All for /dealer */}
          <Route path="*" element={<Navigate to="/dealer/dashboard" replace />} />
        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/dealer/dashboard" replace />} />

        {/* Global 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

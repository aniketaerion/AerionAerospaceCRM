// src/app.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import supabase from './supabaseClient'; // Your Supabase client instance

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import LeadForm from './pages/LeadForm';
import Navbar from './components/Navbar';

// Route constants
const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  LEAD_FORM: '/leadform',
  ROOT: '/',
  NOT_FOUND: '*',
};

// --- Auth Context ---
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Initial load from localStorage
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    // Subscribe to Supabase auth state changes to keep token synced
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

    // Cleanup subscription on unmount
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

// --- PrivateRoute ---
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

// --- AppRoutes ---
const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route
          path={ROUTES.ROOT}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
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
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.LEAD_FORM}
          element={
            <PrivateRoute>
              <LeadForm />
            </PrivateRoute>
          }
        />

        <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ROOT} replace />} />
      </Routes>
    </div>
  );
};

// --- Main App ---
const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;

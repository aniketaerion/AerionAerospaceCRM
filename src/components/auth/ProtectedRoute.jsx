// src/components/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import  useAuth from '@/contexts/AuthContext'; // Use the newly created AuthContext

/**
 * ProtectedRoute Component
 * A wrapper for routes that require authentication.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The component to render if the user is authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. While the auth state is being determined, show a loading indicator.
  // This prevents a flicker from the login page to the protected content.
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-xl font-semibold">Authenticating...</p>
      </div>
    );
  }

  // 2. If loading is finished and there is no user, redirect to the login page.
  // We pass the current location in the state so the user can be redirected back
  // to the page they were trying to access after they log in.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If loading is finished and a user exists, render the requested child component.
  return children;
};

export default ProtectedRoute;

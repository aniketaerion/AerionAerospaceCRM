// src/api/apiClient.js

import axios from 'axios';
import supabase from '@/lib/supabase/supabaseClient.ts'; // Assuming this is your configured Supabase client

/**
 * Enterprise-grade API client configuration using Axios.
 * This client is used for all REST API calls to your backend, NOT for direct Supabase calls.
 * If you have a separate backend (e.g., Node.js, Python) that validates Supabase JWTs, this is the client for it.
 */

// Get the API base URL from environment variables for different environments (dev, staging, prod)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Request timeout after 10 seconds
});

/**
 * Axios Request Interceptor
 * This function will run before every single request is sent.
 * Its primary job is to inject the latest JWT from Supabase for authentication.
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Get the current active session from Supabase
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    // Optional: Log requests in development for easier debugging
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} to ${config.url}`, config.data || '');
    }

    return config;
  },
  (error) => {
    // Handle request setup errors
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Axios Response Interceptor
 * This function will run after every single response is received.
 * Its primary job is to handle global API errors, like authentication failures (401).
 */
apiClient.interceptors.response.use(
  (response) => {
    // Optional: Log responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] from ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for a 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've tried to refresh the token once

      console.warn('[API Auth Error] 401 Unauthorized. Attempting to refresh token...');
      
      try {
        // Attempt to refresh the Supabase session
        const { data, error: refreshError } = await supabase.auth.refreshSession();

        if (refreshError || !data.session) {
          console.error('Token refresh failed. Logging out.', refreshError);
          // If refresh fails, log the user out by redirecting to login
          // A more robust solution would use a global event emitter or state manager (like authStore)
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }

        console.log('Token refreshed successfully. Retrying original request.');
        // Update the header with the new token
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.session.access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.session.access_token}`;
        
        // Retry the original request with the new token
        return apiClient(originalRequest);

      } catch (e) {
        console.error('An error occurred during token refresh process.', e);
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    // For all other errors, just pass them along
    return Promise.reject(error);
  }
);

export default apiClient;

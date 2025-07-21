// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {AuthProvider} from '@/contexts/AuthContext'; // Adjust the import based on your project structure
// ✅ Importing the main App component

import './index.css'; // ✅ Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// ✅ Main entry point for the React application
// ✅ AuthProvider wraps the App to provide authentication context
// ✅ BrowserRouter enables routing capabilities
// ✅ React.StrictMode helps identify potential problems in the application
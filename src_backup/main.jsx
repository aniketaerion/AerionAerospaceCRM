import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';      // Use alias for consistency
import '@/index.css';          // Use alias and assume index.css is in src/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
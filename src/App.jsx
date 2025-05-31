// In src/components/GoogleCalendarIntegration.jsx (or wherever you use it)
import { gapi } from 'gapi-script';
import React, { useEffect, useState, useCallback } from 'react';

// Access the client ID from Vite's environment variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// You should also define your scopes
const SCOPES = 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar'; // Add any other necessary scopes

function GoogleCalendarIntegration({ onLoginStatusChange }) {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [auth2Instance, setAuth2Instance] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load gapi script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => setGapiLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (gapiLoaded) {
      // Initialize gapi client
      gapi.load('client:auth2', async () => {
        await gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // If you use an API Key for public data
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        });

        const authInstance = gapi.auth2.getAuthInstance();
        setAuth2Instance(authInstance);

        const updateLoginStatus = (isSignedIn) => {
          setIsLoggedIn(isSignedIn);
          onLoginStatusChange(isSignedIn); // Notify parent component (App.jsx)
        };

        // Listen for sign-in state changes.
        authInstance.isSignedIn.listen(updateLoginStatus);

        // Set the initial sign-in state.
        updateLoginStatus(authInstance.isSignedIn.get());
      });
    }
  }, [gapiLoaded, onLoginStatusChange]); // Re-run if gapiLoaded or onLoginStatusChange changes

  const handleAuthClick = () => {
    if (auth2Instance) {
      if (isLoggedIn) {
        auth2Instance.signOut();
      } else {
        auth2Instance.signIn();
      }
    }
  };

  return (
    <div className="google-auth-controls">
      <button onClick={handleAuthClick} disabled={!gapiLoaded}>
        {isLoggedIn ? 'Sign Out of Google' : 'Sign In with Google'}
      </button>
    </div>
  );
}

export default GoogleCalendarIntegration;
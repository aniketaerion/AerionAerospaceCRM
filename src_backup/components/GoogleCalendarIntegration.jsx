// src/components/GoogleCalendarIntegration.jsx
import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_CLIENT_ID_HERE"; // Replace with your real Client ID
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default function GoogleCalendarIntegration() {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = async () => {
    const auth = gapi.auth2.getAuthInstance();
    try {
      await auth.signIn();
      alert("Google Sign-in successful!");
    } catch (error) {
      alert("Sign-in failed.");
      console.error(error);
    }
  };

  const createEvent = async () => {
    const event = {
      summary: "Follow-up with Drone Lead",
      description: "Discuss spraying demo and next steps",
      start: {
        dateTime: "2025-05-25T10:00:00+05:30",
      },
      end: {
        dateTime: "2025-05-25T10:30:00+05:30",
      },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      console.log("Event created:", response);
      alert("Calendar event created successfully!");
    } catch (error) {
      console.error("Event creation failed:", error);
      alert("Failed to create calendar event.");
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 rounded">
        Login with Google
      </button>

      <button onClick={createEvent} className="ml-4 bg-green-600 text-white p-2 rounded">
        Create Follow-up Event
      </button>
    </div>
  );
}

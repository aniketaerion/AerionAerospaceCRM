import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "83615816467-i1qbduj2a2rbnbvpogec9jb8avldctdk.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default function GoogleCalendarIntegration() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [summary, setSummary] = useState("Follow-up with Lead");
  const [description, setDescription] = useState("Discuss spraying demo and quotation");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [time, setTime] = useState(""); // hh:mm

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      }).then(() => {
        const auth = gapi.auth2.getAuthInstance();
        setIsSignedIn(auth.isSignedIn.get());
        auth.isSignedIn.listen(setIsSignedIn);
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = async () => {
    const auth = gapi.auth2.getAuthInstance();
    try {
      await auth.signIn();
    } catch (error) {
      alert("Sign-in failed.");
      console.error(error);
    }
  };

  const createEvent = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    const dateTimeStart = new Date(`${date}T${time}:00`);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + 30 * 60000); // 30 min later

    const event = {
      summary,
      description,
      start: {
        dateTime: dateTimeStart.toISOString(),
      },
      end: {
        dateTime: dateTimeEnd.toISOString(),
      },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      alert("Event created in Google Calendar!");
      console.log("Created event:", response);
    } catch (error) {
      alert("Failed to create event.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded mt-6 max-w-md mx-auto">
      {!isSignedIn && (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      )}

      {isSignedIn && (
        <>
          <div className="space-y-2 mt-4">
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Event title"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={createEvent}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Create Follow-up Event
          </button>
        </>
      )}
    </div>
  );
}

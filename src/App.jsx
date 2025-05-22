// src/App.jsx

import { useState, useEffect } from 'react'; // Keep useState, add useEffect
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { supabase } from './supabaseClient'; // <-- This imports your Supabase client

function App() {
  const [count, setCount] = useState(0); // Existing state
  const [leads, setLeads] = useState([]); // New state for leads
  const [loading, setLoading] = useState(true); // New state for loading status

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true); // Start loading
      // Fetch data from the 'leads' table
      // This will be affected by your Row Level Security (RLS) policies
      let { data, error } = await supabase.from('leads').select('*');

      if (error) {
        console.error('Error fetching leads:', error);
      } else {
        setLeads(data); // Set the fetched leads to state
      }
      console.log('Fetched Data (Leads):', data); // Log data to console
      console.log('Fetch Error (if any):', error); // Log error to console

      setLoading(false); // End loading
    };

    fetchLeads();
  }, []); // Empty dependency array means this runs once on component mount

  // This is the JSX (what your component renders)
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <hr /> {/* Divider for clarity */}
      <h2>Supabase Leads Data Test:</h2>
      {loading ? (
        <p>Loading leads from Supabase...</p>
      ) : leads.length > 0 ? (
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              Name: {lead.name}, Email: {lead.email}, Phone: {lead.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p>No leads found or unable to fetch. Check browser console for errors and Supabase RLS policies.</p>
      )}
    </>
  );
}

export default App;
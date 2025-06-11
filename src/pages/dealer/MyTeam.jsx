// File 10: MyTeam.jsx

import React, { useState } from 'react';

export default function MyTeam() {
  const [team, setTeam] = useState([
    { id: 1, name: 'Amit Sharma', role: 'Sales Executive', phone: '9876543210' },
    { id: 2, name: 'Priya Mehta', role: 'Technician', phone: '9123456780' }
  ]);

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Team</h1>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Phone</th>
          </tr>
        </thead>
        <tbody>
          {team.map(member => (
            <tr key={member.id}>
              <td className="p-3">{member.name}</td>
              <td className="p-3">{member.role}</td>
              <td className="p-3">{member.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

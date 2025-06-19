// ✅ Create New File: src/pages/dealer/crm/MyCustomers.jsx

const mockCustomers = [
  { id: 1, name: 'Ravi Patil', phone: '9876543210', email: 'ravi@email.com', drones: 2 },
  { id: 2, name: 'Suman Rao', phone: '9988776655', email: 'suman@email.com', drones: 1 },
];

export default function MyCustomers() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">My Customers</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Drones Owned</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map(c => (
            <tr key={c.id} className="border-b">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.phone}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.drones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

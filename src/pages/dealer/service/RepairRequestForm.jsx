// ✅ Create New File: src/pages/dealer/service/RepairRequestForm.jsx

export default function RepairRequestForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Submit Repair Request</h2>
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Drone Serial Number</label>
          <input type="text" className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., DRN-2023-001" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input type="text" className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Description</label>
          <textarea rows="4" className="mt-1 w-full border rounded px-3 py-2" placeholder="Describe the issue in detail..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
          <select className="mt-1 w-full border rounded px-3 py-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-primary text-white py-2 px-4 rounded">Submit Request</button>
      </form>
    </div>
  );
}

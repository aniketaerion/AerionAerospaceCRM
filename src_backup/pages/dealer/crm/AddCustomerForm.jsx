// ✅ Create New File: src/pages/dealer/crm/AddCustomerForm.jsx

export default function AddCustomerForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
      <form className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., Rajesh Kumar" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" className="mt-1 w-full border rounded px-3 py-2" placeholder="10-digit mobile number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" className="mt-1 w-full border rounded px-3 py-2" placeholder="example@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea rows="2" className="mt-1 w-full border rounded px-3 py-2" placeholder="Village, Taluka, District, Pin" />
        </div>
        <button type="submit" className="mt-4 bg-primary text-white py-2 px-4 rounded">Save Customer</button>
      </form>
    </div>
  );
}

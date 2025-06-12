// ✅ Create New File: src/pages/dealer/inventory/MyInventory.jsx

const inventory = [
  { id: 'SKU001', name: 'Trident Recon-X', qty: 10, status: 'In Stock' },
  { id: 'SKU002', name: 'Mule VTOL-50', qty: 2, status: 'Low Stock' },
];

export default function MyInventory() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Dealer Inventory</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.qty}</td>
              <td className={`px-4 py-2 ${item.status === 'Low Stock' ? 'text-red-600 font-semibold' : ''}`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

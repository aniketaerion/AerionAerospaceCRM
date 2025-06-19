// File 6: MyInventory.jsx

import React, { useState } from 'react';

export default function MyInventory() {
  const [inventory, setInventory] = useState([
    { id: 1, productName: 'Trident Recon-X', stock: 10 },
    { id: 2, productName: 'Trident Mule-VTOL 50', stock: 5 }
  ]);

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Inventory</h1>
      <table className="w-full bg-white text-black rounded shadow">
        <thead>
          <tr className="bg-[#FFE500]">
            <th className="p-3">Product Name</th>
            <th className="p-3">Stock Available</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td className="p-3">{item.productName}</td>
              <td className="p-3">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

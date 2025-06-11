// File 9: PlaceNewOrder.jsx

import React, { useState } from 'react';

export default function PlaceNewOrder() {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Submitted:', formData);
    // API Call to submit order
  };

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Place New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded text-black"
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 rounded text-black"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <button className="bg-[#FFE500] text-[#003DA5] p-3 rounded font-bold" type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
}

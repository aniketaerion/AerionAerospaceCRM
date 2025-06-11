// File 2: AddCustomerForm.jsx

import React, { useState } from 'react';

export default function AddCustomerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    pinCode: '',
    language: '',
    product: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer Data Submitted:', formData);
    // API Call to Supabase or your backend goes here
  };

  return (
    <div className="p-6 bg-[#003DA5] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Add Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 rounded text-black" type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input className="w-full p-3 rounded text-black" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input className="w-full p-3 rounded text-black" type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input className="w-full p-3 rounded text-black" type="text" name="pinCode" placeholder="Pin Code" onChange={handleChange} required />
        <input className="w-full p-3 rounded text-black" type="text" name="language" placeholder="Language" onChange={handleChange} required />
        <input className="w-full p-3 rounded text-black" type="text" name="product" placeholder="Product" onChange={handleChange} required />
        <button className="bg-[#FFE500] text-[#003DA5] p-3 rounded font-bold" type="submit">Submit</button>
      </form>
    </div>
  );
}

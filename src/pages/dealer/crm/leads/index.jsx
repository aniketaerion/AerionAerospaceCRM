import React, { useState } from 'react';
import { upsertLead } from "@/lib/api/leadService";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    source: '',
    stage: '',
    product: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validate = () => {
    const errs = {};
    const trimmed = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v.trim()])
    );

    if (!trimmed.name) errs.name = "Name is required.";
    if (!trimmed.email || !/\S+@\S+\.\S+/.test(trimmed.email)) errs.email = "Valid email is required.";
    if (!/^\d{10}$/.test(trimmed.phone_number)) errs.phone_number = "Phone must be 10 digits.";
    if (trimmed.pincode && !/^\d{6}$/.test(trimmed.pincode)) errs.pincode = "Pincode must be 6 digits.";

    return { errs, cleaned: trimmed };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errs, cleaned } = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const result = await upsertLead(cleaned);
      setStatus(`✅ Lead ${result.status} successfully!`);
      setFormData({
        name: '', email: '', phone_number: '', source: '', stage: '', product: '', pincode: ''
      });
    } catch (error) {
      console.error(error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Lead</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "name", placeholder: "John Doe" },
          { name: "email", placeholder: "john@example.com", type: "email" },
          { name: "phone_number", placeholder: "9876543210" },
          { name: "source", placeholder: "Website, Campaign" },
          { name: "stage", placeholder: "New, Contacted" },
          { name: "product", placeholder: "Drone A" },
          { name: "pincode", placeholder: "500001" },
        ].map(({ name, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block mb-1 font-medium capitalize">{name.replace("_", " ")}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Lead
          </button>
        </div>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-green-700">{status}</p>
      )}
    </div>
  );
}

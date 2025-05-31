import React, { useState } from 'react';
import { upsertLead } from './utils/leadService';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, id } = await upsertLead(formData);
      alert(`Lead ${status} with ID: ${id}`);
    } catch (error) {
      console.error(error);
      alert('Error submitting lead');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input" />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
      <button type="submit" className="btn btn-primary">Submit Lead</button>
    </form>
  );
};

export default LeadForm;

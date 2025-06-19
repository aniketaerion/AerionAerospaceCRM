import React, { useState } from 'react';
import { PhoneInputVerified } from '@/components/common/inputs/PhoneInputVerified';
import { SmartFormField } from '@/components/common/inputs/SmartFormField';
import { useNavigate } from 'react-router-dom';
import uniqueId from '@/lib/utils/uniqueId';

export default function CreateLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    language: '',
    pinCode: '',
    productInterest: '',
    interestLevel: 'Warm',
    stage: 'Call',
    disposition: '',
    assignedTo: '',
    notes: '',
    verified: false,
  });

  const stageOptions = [
    { label: 'Call', value: 'Call' },
    { label: 'Demo Scheduled', value: 'Demo' },
    { label: 'Quotation Shared', value: 'Quotation' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Closed - Won', value: 'ClosedWon' },
    { label: 'Closed - Lost', value: 'ClosedLost' },
  ];

  const interestLevels = ['Hot', 'Warm', 'Cold'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneVerified = (value) => {
    setFormData((prev) => ({ ...prev, mobile: value, verified: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      mobile,
      language,
      pinCode,
      productInterest,
      verified,
    } = formData;

    if (
      !verified ||
      !firstName ||
      !lastName ||
      !language ||
      !pinCode ||
      !mobile ||
      !productInterest
    ) {
      alert('Please fill all required fields and verify mobile.');
      return;
    }

    const newLead = {
      ...formData,
      id: uniqueId('lead'),
      createdAt: new Date().toISOString(),
      isCustomer: false,
    };

    console.log('Lead Created:', newLead);
    navigate('/dealer/crm/leads');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">🧍 Create New Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SmartFormField
            name="firstName"
            label="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <SmartFormField
            name="lastName"
            label="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <PhoneInputVerified
            value={formData.mobile}
            onVerify={handlePhoneVerified}
            required
          />
          <SmartFormField
            name="language"
            label="Language *"
            value={formData.language}
            onChange={handleChange}
            required
          />
          <SmartFormField
            name="pinCode"
            label="Pin Code *"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
          <SmartFormField
            name="productInterest"
            label="Product Interest *"
            value={formData.productInterest}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Interest Level</label>
            <select
              name="interestLevel"
              value={formData.interestLevel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              {interestLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <SmartFormField
            name="assignedTo"
            label="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
          />
        </div>

        <SmartFormField
          name="disposition"
          label="Disposition"
          value={formData.disposition}
          onChange={handleChange}
        />

        <SmartFormField
          name="notes"
          label="Notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
}

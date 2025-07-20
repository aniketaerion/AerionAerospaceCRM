// src/pages/dealer/crm/leads/CreateLead.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { CheckCircleIcon, ExclamationCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function CreateLead() {
  const createLead = useCrmStore((state) => state.createLead);
  const loading = useCrmStore((state) => state.loading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    leadSource: '',
    estimatedValue: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const leadSources = [
    { value: '', label: '-- Select Source --' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Campaign', label: 'Campaign' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Other', label: 'Other' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
    if (!formData.leadSource.trim()) newErrors.leadSource = 'Lead Source is required.';
    if (formData.estimatedValue && isNaN(formData.estimatedValue)) newErrors.estimatedValue = 'Estimated Value must be a number.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage('');
    setIsSuccess(false);

    if (!validateForm()) {
      setSubmissionMessage('Please correct the errors in the form.');
      setIsSuccess(false);
      return;
    }

    try {
      const result = await createLead({
        ...formData,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : 0,
      });

      if (result.success) {
        setSubmissionMessage('Lead created successfully!');
        setIsSuccess(true);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          company: '', title: '', leadSource: '', estimatedValue: '', notes: '',
        });
        // Optionally navigate to the new lead's detail page or list
        setTimeout(() => navigate('/dealer/crm/leads/panel?tab=list'), 1500);
      } else {
        setSubmissionMessage(`Error creating lead: ${result.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setSubmissionMessage(`An unexpected error occurred: ${error.message}`);
      setIsSuccess(false);
    }
  };

  const commonInputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2";
  const errorInputClasses = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const errorTextClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="space-y-6 p-4">
      <TopHeaderBar title="Create New Lead" showBack={true} backTo="/dealer/crm/leads/panel?tab=list" />

      {submissionMessage && (
        <div className={`p-4 rounded-md ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center gap-2`}>
          {isSuccess ? <CheckCircleIcon className="h-5 w-5" /> : <ExclamationCircleIcon className="h-5 w-5" />}
          {submissionMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClasses}>First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.firstName ? errorInputClasses : ''}`}
            required
          />
          {errors.firstName && <p className={errorTextClasses}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.lastName ? errorInputClasses : ''}`}
            required
          />
          {errors.lastName && <p className={errorTextClasses}>{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.email ? errorInputClasses : ''}`}
            required
          />
          {errors.email && <p className={errorTextClasses}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.phone ? errorInputClasses : ''}`}
            required
          />
          {errors.phone && <p className={errorTextClasses}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={commonInputClasses}
          />
        </div>
        <div>
          <label htmlFor="title" className={labelClasses}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={commonInputClasses}
          />
        </div>
        <div>
          <label htmlFor="leadSource" className={labelClasses}>Lead Source <span className="text-red-500">*</span></label>
          <select
            id="leadSource"
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.leadSource ? errorInputClasses : ''}`}
            required
          >
            {leadSources.map(source => (
              <option key={source.value} value={source.value}>{source.label}</option>
            ))}
          </select>
          {errors.leadSource && <p className={errorTextClasses}>{errors.leadSource}</p>}
        </div>
        <div>
          <label htmlFor="estimatedValue" className={labelClasses}>Estimated Value ($)</label>
          <input
            type="number"
            id="estimatedValue"
            name="estimatedValue"
            value={formData.estimatedValue}
            onChange={handleChange}
            className={`${commonInputClasses} ${errors.estimatedValue ? errorInputClasses : ''}`}
            min="0"
          />
          {errors.estimatedValue && <p className={errorTextClasses}>{errors.estimatedValue}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="notes" className={labelClasses}>Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className={commonInputClasses}
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Lead...
              </>
            ) : (
              <>
                <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Lead
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
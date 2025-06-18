// src/components/AuthForm.jsx
import React, { useState } from 'react';
import Button from '@/components/Button'; // Assuming you have this Button component

// Define PropTypes (for JS) or Interface (for TSX) for clarity
// interface AuthFormProps {
//   onSubmit: (formData: Record<string, string>) => void;
//   type: 'Login' | 'Signup';
//   children: (handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, formData: Record<string, string>) => React.ReactNode;
//   errorMessage?: string | null;
//   isLoading?: boolean;
// }

const AuthForm = ({ onSubmit, type, children, errorMessage, isLoading }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-light font-inter">
      <div className="bg-neutral-white p-8 rounded-xl shadow-custom-medium w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-aerion-blue mb-8">{type}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Render children (form fields) passed from parent */}
          {children(handleChange, formData)}

          {errorMessage && (
            <div className="text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full py-3" disabled={isLoading}>
            {isLoading ? 'Processing...' : type}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

// src/components/AuthForm.jsx
import React, { useState } from 'react';

/**
 * A generic authentication form component that uses a render prop pattern
 * to allow flexible input rendering by its parent.
 *
 * @param {object} props - The component props.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 * @param {'login' | 'signup' | 'reset-password' | 'update-password'} props.type - The type of authentication form.
 * @param {string} [props.errorMessage] - An error message to display.
 * @param {boolean} [props.isLoading=false] - Indicates if the form submission is in progress.
 * @param {Function} props.children - A render prop function that receives (formData, handleChange).
 */
export const AuthForm = ({ onSubmit, type, errorMessage, isLoading, children }) => {
  // Initialize formData with an empty object.
  // The specific fields (email, password, etc.) will be added via handleChange.
  const [formData, setFormData] = useState({});

  /**
   * Handles changes to input fields, updating the formData state.
   * @param {Event} e - The change event from an input element.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission, preventing default and calling the onSubmit prop.
   * @param {Event} e - The submit event from the form.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the current formData to the parent's onSubmit handler
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Added some basic styling */}
      {/*
        The children prop is a function that will receive:
        1. The current formData state.
        2. The handleChange function to update formData.
        This allows the parent component to render the form fields
        and bind them to this form's state and handlers.
      */}
      {children(formData, handleChange)}

      {errorMessage && (
        <div className="text-red-600 text-sm mt-2 text-center">
          {errorMessage}
        </div>
      )}

      {/* This button is now part of AuthForm and will be styled consistently */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
      >
        {isLoading ? 'Loading...' : (type === 'login' ? 'Sign In' : type === 'signup' ? 'Sign Up' : 'Submit')}
      </button>
    </form>
  );
};

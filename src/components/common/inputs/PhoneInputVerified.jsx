// src/components/shared/inputs/PhoneInputVerified.jsx
import React, { useState } from 'react';

export function PhoneInputVerified({ value, onVerify, required = false }) {
  const [inputValue, setInputValue] = useState(value || '');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;
    setInputValue(val);
    setVerified(false);
    setError('');
  };

  const handleVerify = () => {
    if (inputValue.length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setVerified(true);
    onVerify(inputValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium">Mobile Number {required && '*'} {verified && <span className="text-green-600 ml-2">✔ Verified</span>}</label>
      <div className="flex gap-2 mt-1">
        <input
          type="text"
          name="mobile"
          value={inputValue}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          maxLength={10}
          required={required}
        />
        <button type="button" onClick={handleVerify} className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
          Verify
        </button>
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

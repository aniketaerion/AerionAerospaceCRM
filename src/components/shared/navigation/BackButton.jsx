// src/components/shared/navigation/BackButton.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export function BackButton({ to = null, label = 'Back', className = '' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center text-primary hover:text-accent transition text-sm font-medium ${className}`}
    >
      <FaArrowLeft className="mr-2" />
      {label}
    </button>
  );
}

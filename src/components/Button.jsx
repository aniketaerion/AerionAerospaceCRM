// src/components/Button.jsx
import React from 'react';

// Define props interface for better type checking in TS (if you convert to .tsx)
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'text';
//   className?: string;
//   children: React.ReactNode;
// }

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  let baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  switch (variant) {
    case 'primary':
      // Aerion Blue background, white text, darker blue on hover
      baseStyles += ' bg-aerion-blue text-white hover:bg-aerion-blue-dark focus:ring-aerion-blue shadow-md';
      break;
    case 'secondary':
      // Aerion Yellow background, Aerion Blue text, darker yellow on hover
      baseStyles += ' bg-aerion-yellow text-aerion-blue hover:bg-aerion-yellow-dark focus:ring-aerion-yellow shadow-md';
      break;
    case 'outline':
      // Transparent background, blue border & text, blue background on hover
      baseStyles += ' border border-aerion-blue text-aerion-blue hover:bg-aerion-blue hover:text-white focus:ring-aerion-blue';
      break;
    case 'destructive':
      // Red background for destructive actions
      baseStyles += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md';
      break;
    case 'text': // For buttons that look like plain links/text
      baseStyles += ' text-aerion-blue hover:underline p-0 focus:ring-0 shadow-none';
      break;
    default:
      // A default neutral button
      baseStyles += ' bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 shadow-sm';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

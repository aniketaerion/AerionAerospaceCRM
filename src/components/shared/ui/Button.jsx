// src/components/shared/ui/Button.jsx
import React from 'react';

/**
 * A generic, reusable Button component.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the button (e.g., text, icons).
 * @param {string} [props.className] - Additional Tailwind CSS classes to apply for custom styling.
 * @param {string} [props.variant='default'] - Defines the button's visual style.
 * - 'default': Standard button (blue background)
 * - 'outline': Button with a border and transparent background
 * - 'ghost': Transparent button, good for text-only actions
 * - 'destructive': Red background for destructive actions
 * @param {string} [props.size='default'] - Defines the button's size.
 * - 'default': Standard padding
 * - 'sm': Smaller padding
 * - 'lg': Larger padding
 * - 'icon': Square button for icons
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled.
 * @param {React.HTMLAttributes<HTMLButtonElement>} [props...] - Standard HTML button attributes.
 */
export function Button({
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  children,
  ...props
}) {
  // Define base styles for the button
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  // Define variant-specific styles
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
    ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };

  // Define size-specific styles
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10', // For square icon buttons
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

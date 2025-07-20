// src/components/common/inputs/ToggleSwitch.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';

// Define the props interface for the ToggleSwitch component
interface ToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  checked: boolean; // Controls whether the switch is on or off
  onChange: (checked: boolean) => void; // Callback when the switch state changes
  disabled?: boolean; // If the switch should be disabled
  id?: string; // Unique ID for accessibility (htmlFor label association)
  label?: string; // Optional text label displayed next to the switch
  switchSize?: 'sm' | 'md' | 'lg'; // Custom sizes for the switch
  className?: string; // Additional Tailwind CSS classes for the container label
}

// Predefined Tailwind CSS classes for different switch sizes
const sizeClasses = {
  sm: { container: 'w-9 h-5', knob: 'w-4 h-4' }, // Small size
  md: { container: 'w-11 h-6', knob: 'w-5 h-5' }, // Medium (default) size
  lg: { container: 'w-14 h-8', knob: 'w-7 h-7' }, // Large size
};

// Use forwardRef to allow parent components to get a ref to the underlying input element
const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      id,
      label,
      switchSize = 'md', // Default size is 'md'
      className = '', // Default empty string for className
      ...rest // Capture any other standard HTML input attributes
    },
    ref // Ref passed from the parent component
  ) => {
    // Determine the CSS classes based on the selected switch size
    const containerClass = sizeClasses[switchSize].container;
    const knobClass = sizeClasses[switchSize].knob;

    // Handle change event from the hidden checkbox
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return; // Do nothing if disabled
      onChange(e.target.checked); // Invoke the onChange callback with the new checked state
    };

    return (
      <label
        htmlFor={id} // Associate label with input via id for accessibility
        className={`inline-flex items-center cursor-pointer select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : '' // Styling for disabled state
        } ${className}`} // Apply custom class names
      >
        {/* Hidden native checkbox input */}
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref} // Pass the ref to the native input
          className="sr-only" // Visually hide the native checkbox but keep it accessible for screen readers
          {...rest} // Spread any additional HTML input attributes
        />
        {/* Visual representation of the toggle switch track */}
        <span
          className={`relative ${containerClass} bg-gray-300 rounded-full transition-colors duration-200 ease-in-out
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}`} // Change background color based on checked state
        >
          {/* Visual representation of the toggle switch knob */}
          <span
            className={`block bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
            ${knobClass} ${checked ? 'translate-x-full' : 'translate-x-0'}`} // Move knob based on checked state
            style={{ willChange: 'transform' }} // Optimization for smooth animation
          />
        </span>
        {/* Optional text label next to the switch */}
        {label && (
          <span className="ml-2 text-sm text-gray-700 select-text">{label}</span>
        )}
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch'; // Helps with debugging in React DevTools

// ✅ Correct export for a named component
export { ToggleSwitch };
// src/components/shared/inputs/ToggleSwitch.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface ToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
  switchSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: { container: 'w-9 h-5', knob: 'w-4 h-4' },
  md: { container: 'w-11 h-6', knob: 'w-5 h-5' },
  lg: { container: 'w-14 h-8', knob: 'w-7 h-7' },
};

const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      id,
      label,
      switchSize = 'md',
      className = '',
      ...rest
    },
    ref
  ) => {
    const containerClass = sizeClasses[switchSize].container;
    const knobClass = sizeClasses[switchSize].knob;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange(e.target.checked);
    };

    return (
      <label
        htmlFor={id}
        className={`inline-flex items-center cursor-pointer select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          className="sr-only"
          {...rest}
        />
        <span
          className={`relative ${containerClass} bg-gray-300 rounded-full transition-colors duration-200 ease-in-out
          ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <span
            className={`block bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
            ${knobClass} ${checked ? 'translate-x-full' : 'translate-x-0'}`}
            style={{ willChange: 'transform' }}
          />
        </span>
        {label && (
          <span className="ml-2 text-sm text-gray-700 select-text">{label}</span>
        )}
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';

// ✅ Correct export:
export { ToggleSwitch };

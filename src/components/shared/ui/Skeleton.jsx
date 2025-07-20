// src/components/shared/ui/Skeleton.jsx
import React from 'react';

/**
 * A simple Skeleton component to display a loading placeholder.
 * It creates a gray, rounded rectangle with a pulse animation.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional Tailwind CSS classes to apply to the skeleton.
 * Useful for controlling width, height, margin, etc.
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
}
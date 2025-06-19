// src/components/shared/navigation/ModuleHeader.jsx
import React from 'react';

export default function ModuleHeader({ title, subtitle = '', children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      </div>

      {children && (
        <div className="flex items-center space-x-2">
          {children}
        </div>
      )}
    </div>
  );
}

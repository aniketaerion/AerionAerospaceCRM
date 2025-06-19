// src/components/shared/inputs/ImagePreviewUploader.jsx
import React, { useState } from 'react';

export default function ImagePreviewUploader({ label = "Upload Image", onChange }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      if (onChange) onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="mt-2 h-32 rounded shadow" />
      )}
    </div>
  );
}

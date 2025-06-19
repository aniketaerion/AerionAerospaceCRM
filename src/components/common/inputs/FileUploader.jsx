// src/components/inputs/FileUploader.jsx
import React, { useRef } from 'react';

export default function FileUploader({ onUpload, accept = '*', multiple = false }) {
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const files = e.target.files;
    if (files.length && onUpload) {
      onUpload(multiple ? Array.from(files) : files[0]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFiles}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        📤 Upload {multiple ? 'Files' : 'File'}
      </button>
    </div>
  );
}
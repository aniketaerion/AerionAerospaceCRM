// src/pages/NotFoundPage/index.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button'; // Assuming you have a standard Button component

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h1 className="text-6xl font-extrabold text-aerion-blue tracking-tight sm:text-8xl">
        404
      </h1>
      <h2 className="mt-2 text-2xl font-bold text-gray-800 sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 text-base text-gray-600 max-w-md">
        We're sorry, but the page you were looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Link to="/dealer/dashboard">
            <Button variant="primary">
                Go to Dashboard
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <a href="/" className="mt-6 text-blue-500 hover:text-blue-300">Go to Homepage</a>
    </div>
  );
};

export default NotFoundPage;

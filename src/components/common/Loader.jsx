import React from 'react';

function Loader({ message = 'Loading...', size = 'md' }) {
  const spinnerSizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center font-[poppins]">
      <div
        className={`animate-spin rounded-full border-b-transparent border-[#333333] mb-3 ${
          spinnerSizes[size] || spinnerSizes.md
        }`}
        role="status"
        aria-label="loading"
      />
      {message && <p className="text-sm text-gray-500 font-medium">{message}</p>}
    </div>
  );
}

export default Loader;

import React from 'react';

function DashboardLayout({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 font-[poppins] w-full ${className}`}>
      {children}
    </div>
  );
}

export default DashboardLayout;

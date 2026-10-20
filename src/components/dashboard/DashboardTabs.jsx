import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

function DashboardTabs({ activeTab, onTabChange, teachingCount = 0, enrolledCount = 0 }) {
  const totalCount = teachingCount + enrolledCount;

  return (
    <div className="mt-6 flex items-center gap-2 border-b border-gray-200 pb-3">
      <button
        type="button"
        onClick={() => onTabChange('all')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          activeTab === 'all'
            ? 'bg-[#333333] text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        All ({totalCount})
      </button>

      <button
        type="button"
        onClick={() => onTabChange('teaching')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          activeTab === 'teaching'
            ? 'bg-[#333333] text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <FaChalkboardTeacher className="text-xs" />
        <span>Teaching ({teachingCount})</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('enrolled')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          activeTab === 'enrolled'
            ? 'bg-[#333333] text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <FaUserGraduate className="text-xs" />
        <span>Enrolled ({enrolledCount})</span>
      </button>
    </div>
  );
}

export default DashboardTabs;

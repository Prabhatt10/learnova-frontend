import React from 'react';
import { FaFileUpload, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import Button from '../common/Button';

function ClassroomTabs({
  activeTab,
  onTabChange,
  filesCount = 0,
  membersCount = 0,
  pendingCount = 0,
  isInstructor = false,
  onOpenUpload,
  onLeaveClassroom,
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange('resources')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'resources'
              ? 'bg-[#333333] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FaFileUpload className="text-xs" />
          <span>Learning Resources ({filesCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('people')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'people'
              ? 'bg-[#333333] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FaUsers className="text-xs" />
          <span>Class Members ({membersCount})</span>
          {isInstructor && pendingCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-3">
        {activeTab === 'resources' && (
          <Button
            onClick={onOpenUpload}
            size="sm"
            icon={FaFileUpload}
          >
            Upload Resource
          </Button>
        )}

        {!isInstructor && (
          <Button
            variant="outline"
            size="sm"
            onClick={onLeaveClassroom}
            className="text-red-600 border-red-200 hover:bg-red-50"
            icon={FaSignOutAlt}
          >
            Leave Class
          </Button>
        )}
      </div>
    </div>
  );
}

export default ClassroomTabs;

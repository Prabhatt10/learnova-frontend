import React from 'react';
import { FaPlus, FaSignInAlt } from 'react-icons/fa';
import Button from '../common/Button';

function DashboardHeader({ userName, onOpenJoin, onOpenCreate }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333]">
          My Classrooms
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, <strong className="text-gray-800">{userName}</strong>. Manage your courses and learning resources.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onOpenJoin}
          icon={FaSignInAlt}
        >
          Join Class
        </Button>
        <Button
          onClick={onOpenCreate}
          icon={FaPlus}
        >
          Create Class
        </Button>
      </div>
    </div>
  );
}

export default DashboardHeader;

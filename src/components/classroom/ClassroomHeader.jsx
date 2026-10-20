import React from 'react';
import { FaCopy, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

function ClassroomHeader({
  classroom,
  isInstructor,
  copied,
  onCopyCode,
  onOpenEdit,
  onDeleteClassroom,
  deletingClass,
}) {
  if (!classroom) return null;

  return (
    <div className="bg-[#333333] text-white rounded-3xl p-6 sm:p-10 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white">
              {classroom.subjectCode}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-200">
              {classroom.privacy === 'approved' ? 'Requires Approval' : 'Open Enrollment'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {classroom.className}
          </h1>

          <p className="text-base text-gray-300 mt-1">
            {classroom.subjectName}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            Instructor:{' '}
            <strong className="text-white font-medium">
              {classroom.instructor?.userName}
            </strong>{' '}
            ({classroom.instructor?.email})
          </p>

          {isInstructor && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title="Edit Classroom Details"
              >
                <FaEdit />
                <span>Edit Details</span>
              </button>
              <button
                type="button"
                onClick={onDeleteClassroom}
                disabled={deletingClass}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/80 hover:bg-red-500 text-white transition-colors cursor-pointer disabled:opacity-50"
                title="Delete Classroom"
              >
                <FaTrash />
                <span>{deletingClass ? 'Deleting...' : 'Delete Class'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Join Code Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-w-[200px] border border-white/15">
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
            Class Join Code
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold tracking-widest text-white">
              {classroom.classJoinCode}
            </span>
            <button
              type="button"
              onClick={onCopyCode}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Copy Join Code"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
            </button>
          </div>
          <span className="text-[11px] text-gray-400 mt-1">
            {copied ? 'Copied to clipboard!' : 'Share with students to join'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClassroomHeader;

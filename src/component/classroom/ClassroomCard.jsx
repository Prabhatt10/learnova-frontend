import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCopy, FaCheck, FaUsers, FaLock, FaGlobe, FaArrowRight } from 'react-icons/fa';

function ClassroomCard({ classroom, isInstructor }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (classroom.classJoinCode) {
      navigator.clipboard.writeText(classroom.classJoinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const studentCount = classroom.studentEnrolled?.length || 0;
  const isApproved = classroom.privacy === 'approved';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Card Header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 tracking-wide mb-2">
              {classroom.subjectCode || 'CLASS'}
            </span>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">
              {classroom.className}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
              {classroom.subjectName}
            </p>
          </div>

          <span
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              isApproved
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {isApproved ? <FaLock className="h-2.5 w-2.5" /> : <FaGlobe className="h-2.5 w-2.5" />}
            <span>{isApproved ? 'Approval' : 'Open'}</span>
          </span>
        </div>

        {/* Instructor & Meta info */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div>
            <span>Instructor: </span>
            <strong className="text-gray-700 font-medium">
              {isInstructor ? 'You' : classroom.instructor?.userName || 'Instructor'}
            </strong>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaUsers className="h-3.5 w-3.5 text-gray-400" />
            <span>{studentCount} student{studentCount === 1 ? '' : 's'}</span>
          </div>
        </div>
      </div>

      {/* Card Footer with Join Code & CTA */}
      <div className="px-5 sm:px-6 py-3.5 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400 font-medium">Code:</span>
          <button
            onClick={handleCopyCode}
            type="button"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-gray-200 hover:border-gray-400 text-xs font-mono font-bold text-gray-800 transition-colors cursor-pointer"
            title="Click to copy join code"
          >
            <span>{classroom.classJoinCode}</span>
            {copied ? (
              <FaCheck className="h-2.5 w-2.5 text-green-600" />
            ) : (
              <FaCopy className="h-2.5 w-2.5 text-gray-400 hover:text-black" />
            )}
          </button>
        </div>

        <Link
          to={`/classroom/${classroom._id}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#333333] hover:text-black hover:translate-x-0.5 transition-all"
        >
          <span>View Class</span>
          <FaArrowRight className="h-2.5 w-2.5" />
        </Link>
      </div>
    </div>
  );
}

export default ClassroomCard;

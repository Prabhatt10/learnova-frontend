import React from 'react';
import { FaTrash } from 'react-icons/fa';

function ClassMembersList({
  students = [],
  isInstructor = false,
  joinCode = '',
  onRemoveStudent,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Enrolled Students ({students.length})
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        All students currently active in this classroom.
      </p>

      {students.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center italic">
          No students enrolled yet. Share your join code{' '}
          <strong className="text-gray-700">{joinCode}</strong> with students.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {students.map((stud) => (
            <div
              key={stud._id}
              className="py-3.5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm">
                  {stud.userName ? stud.userName.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-gray-900">
                    {stud.userName}
                  </strong>
                  <span className="text-xs text-gray-500">{stud.email}</span>
                </div>
              </div>

              {isInstructor && (
                <button
                  type="button"
                  onClick={() => onRemoveStudent(stud._id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer rounded-lg hover:bg-red-50"
                  title="Remove student from class"
                >
                  <FaTrash className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassMembersList;

import React from 'react';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';

function PendingRequestsList({
  requests = [],
  onAccept,
  onDecline,
}) {
  if (requests.length === 0) return null;

  return (
    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 mb-6">
      <h3 className="text-base font-bold text-amber-900 mb-1">
        Pending Join Requests ({requests.length})
      </h3>
      <p className="text-xs text-amber-700 mb-4">
        These students requested to join your approval-required classroom.
      </p>

      <div className="divide-y divide-amber-100 bg-white rounded-xl border border-amber-200 overflow-hidden">
        {requests.map((reqUser) => (
          <div
            key={reqUser._id}
            className="p-4 flex items-center justify-between gap-4"
          >
            <div>
              <strong className="block text-sm font-bold text-gray-900">
                {reqUser.userName}
              </strong>
              <span className="text-xs text-gray-500">{reqUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onAccept(reqUser._id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <FaUserCheck />
                <span>Accept</span>
              </button>
              <button
                type="button"
                onClick={() => onDecline(reqUser._id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <FaUserTimes />
                <span>Decline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingRequestsList;

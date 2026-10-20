import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

function Notification({
  type = 'success', // 'success' | 'error' | 'warning'
  message,
  onDismiss,
  className = '',
}) {
  if (!message) return null;

  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  const icons = {
    success: <FaCheckCircle className="text-emerald-600 flex-shrink-0" />,
    error: <FaExclamationCircle className="text-red-600 flex-shrink-0" />,
    warning: <FaExclamationCircle className="text-amber-600 flex-shrink-0" />,
  };

  return (
    <div
      className={`p-3.5 border rounded-xl text-sm font-medium flex items-center justify-between gap-3 ${
        styles[type] || styles.success
      } ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-2.5">
        {icons[type] || icons.success}
        <span>{message}</span>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-700 p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <FaTimes className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default Notification;

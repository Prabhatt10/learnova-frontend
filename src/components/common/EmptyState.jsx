import React from 'react';
import Button from './Button';

function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  actionIcon,
  className = '',
}) {
  return (
    <div
      className={`py-12 sm:py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-6 sm:p-8 ${className}`}
    >
      {Icon && (
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3.5">
          <Icon className="h-6 w-6" />
        </div>
      )}

      {title && (
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {actionText && onAction && (
        <div className="mt-5">
          <Button onClick={onAction} icon={actionIcon} size="md">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;

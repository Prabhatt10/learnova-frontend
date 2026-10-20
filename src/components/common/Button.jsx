import React from 'react';

function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#333333] hover:bg-black text-white focus:ring-[#333333] shadow-sm',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300',
    outline:
      'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-300 shadow-sm',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className="h-4 w-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;

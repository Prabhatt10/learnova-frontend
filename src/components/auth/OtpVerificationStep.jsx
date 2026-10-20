import React from 'react';
import { FaKey, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Input from '../common/Input';
import Button from '../common/Button';

function OtpVerificationStep({
  email,
  otp,
  onChange,
  onSubmit,
  onBack,
  onResendOtp,
  loading,
  resending,
}) {
  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <Input
        label="6-Digit Verification Code"
        name="otp"
        required
        maxLength={6}
        value={otp}
        onChange={onChange}
        placeholder="123456"
        icon={FaKey}
        className="tracking-widest font-mono text-center text-lg"
        helperText={`We sent a one-time verification code to ${email}`}
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        icon={FaCheck}
      >
        Complete Registration
      </Button>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
        >
          <FaArrowLeft className="h-2.5 w-2.5" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          onClick={onResendOtp}
          disabled={resending}
          className="hover:text-black underline cursor-pointer disabled:opacity-50"
        >
          {resending ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </form>
  );
}

export default OtpVerificationStep;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Notification from '../components/common/Notification';
import { FaEnvelope, FaLock, FaKey, FaArrowRight } from 'react-icons/fa';

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Request OTP, 2: Enter OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authService.resetPasswordByOtp(email.trim());
      if (res?.success) {
        setStep(2);
        setSuccessMsg(res?.message || 'Verification OTP sent to your email.');
      } else {
        setError(res?.message || 'Failed to send reset code');
      }
    } catch (err) {
      setError(err?.message || 'Unable to send OTP. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authService.resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      if (res?.success) {
        setSuccessMsg('Password has been reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(res?.message || 'Password reset failed');
      }
    } catch (err) {
      setError(err?.message || 'Failed to reset password. Please check your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F1F1] py-12 px-4 sm:px-6 lg:px-8 font-[poppins]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333333]">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1
              ? 'Enter your registered email to receive a password reset OTP'
              : `Enter the 6-digit code sent to ${email} and your new password`}
          </p>
        </div>

        {error && (
          <Notification
            type="error"
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {successMsg && (
          <Notification
            type="success"
            message={successMsg}
            onDismiss={() => setSuccessMsg('')}
          />
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-5" onSubmit={handleRequestOtp}>
            <Input
              type="email"
              label="Registered Email Address"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="you@example.com"
              icon={FaEnvelope}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              icon={FaArrowRight}
            >
              Send Reset OTP
            </Button>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleResetPassword}>
            <Input
              label="6-Digit OTP Code"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                if (error) setError('');
              }}
              placeholder="123456"
              icon={FaKey}
              className="tracking-widest font-mono text-center text-lg"
            />

            <Input
              type="password"
              label="New Password"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••"
              icon={FaLock}
            />

            <Input
              type="password"
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••"
              icon={FaLock}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              icon={FaArrowRight}
            >
              Reset Password
            </Button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-gray-500 hover:text-black py-1 cursor-pointer"
            >
              Didn't receive code? Change email or resend
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-[#333333] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

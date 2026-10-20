import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../services/auth.service';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Notification from '../components/common/Notification';
import { FaEnvelope, FaLock, FaKey, FaArrowRight } from 'react-icons/fa';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [otp, setOtp] = useState(searchParams.get('otp') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword || !confirmPassword) {
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
      setError(err?.message || 'Failed to reset password. Please verify your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F1F1] py-12 px-4 sm:px-6 lg:px-8 font-[poppins]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333333]">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email, the OTP received, and your new password.
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

        <form className="mt-8 space-y-4" onSubmit={handleResetPassword}>
          <Input
            type="email"
            label="Email Address"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="you@example.com"
            icon={FaEnvelope}
          />

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
        </form>

        <div className="text-center pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <Link to="/forgot-password" className="hover:text-black hover:underline">
            Request new OTP
          </Link>
          <Link to="/login" className="hover:text-black hover:underline font-semibold text-gray-700">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

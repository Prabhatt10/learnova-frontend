import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupFormStep from '../components/auth/SignupFormStep';
import OtpVerificationStep from '../components/auth/OtpVerificationStep';
import Notification from '../components/common/Notification';

function SignUp() {
  const { signup, sendRegistrationOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Step 1: details, Step 2: enter OTP
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  // Step 1: Validate and send OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = formData;

    if (!userName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await sendRegistrationOtp(email.trim());
      if (res?.success) {
        setSuccessMsg(res.message || 'OTP sent successfully to your email');
        setStep(2);
      } else {
        setError(res?.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    setResending(true);
    setError('');
    try {
      const res = await sendRegistrationOtp(formData.email.trim());
      if (res?.success) {
        setSuccessMsg('A new verification code has been sent to your email.');
      } else {
        setError(res?.message || 'Failed to resend code');
      }
    } catch (err) {
      setError(err?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  // Step 2: Submit with OTP
  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.trim().length === 0) {
      setError('Please enter the verification OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signup({
        userName: formData.userName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        otp: formData.otp.trim(),
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Registration failed. Please check your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#F5F1F1] py-12 px-4 sm:px-6 lg:px-8 font-[poppins]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333333]">
            {step === 1 ? 'Create an Account' : 'Verify Your Email'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1
              ? 'Join Learnova to start collaborating and learning'
              : `Enter the 6-digit code sent to ${formData.email}`}
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
          <SignupFormStep
            formData={formData}
            onChange={handleChange}
            onSubmit={handleRequestOtp}
            loading={loading}
          />
        ) : (
          <OtpVerificationStep
            email={formData.email}
            otp={formData.otp}
            onChange={handleChange}
            onSubmit={handleCompleteSignup}
            onBack={() => {
              setStep(1);
              setError('');
            }}
            onResendOtp={handleResendOtp}
            loading={loading}
            resending={resending}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Notification from '../components/common/Notification';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(formData.email.trim(), formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F1F1] py-12 px-4 sm:px-6 lg:px-8 font-[poppins]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333333]">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your Learnova classrooms
          </p>
        </div>

        {error && (
          <Notification
            type="error"
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            icon={FaEnvelope}
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <Link to="/forgot-password" className="text-xs font-medium text-gray-600 hover:text-black hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={FaLock}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            icon={FaArrowRight}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#333333] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
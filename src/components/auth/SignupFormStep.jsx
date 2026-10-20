import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import Input from '../common/Input';
import Button from '../common/Button';

function SignupFormStep({ formData, onChange, onSubmit, loading }) {
  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <Input
        label="Full Name"
        name="userName"
        required
        value={formData.userName}
        onChange={onChange}
        placeholder="Jane Doe"
        icon={FaUser}
      />

      <Input
        type="email"
        label="Email Address"
        name="email"
        required
        value={formData.email}
        onChange={onChange}
        placeholder="you@example.com"
        icon={FaEnvelope}
      />

      <Input
        type="password"
        label="Password"
        name="password"
        required
        value={formData.password}
        onChange={onChange}
        placeholder="••••••••"
        icon={FaLock}
      />

      <Input
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        required
        value={formData.confirmPassword}
        onChange={onChange}
        placeholder="••••••••"
        icon={FaLock}
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full mt-2"
        icon={FaArrowRight}
      >
        Continue with Email Verification
      </Button>

      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#333333] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupFormStep;

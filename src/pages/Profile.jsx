import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth.service';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaSave,
  FaArrowLeft,
  FaGraduationCap,
} from 'react-icons/fa';

function Profile() {
  const { user: authUser, isAuthenticated, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    userName: '',
    email: '',
    accountType: '',
    bio: '',
    contactNumber: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await authService.getProfile();
      if (res?.success && res.user) {
        const u = res.user;
        const add = u.additionalDetails || {};
        setProfileData({
          userName: u.userName || '',
          email: u.email || '',
          accountType: u.accountType || 'Student',
          bio: add.bio || '',
          contactNumber: add.contactNumber || '',
          profileImage: add.profileImage || '',
        });
      }
    } catch (err) {
      setError(err?.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, authLoading, navigate, fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.userName.trim()) {
      setError('Full name is required');
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await authService.updateProfile({
        userName: profileData.userName.trim(),
        bio: profileData.bio.trim(),
        contactNumber: profileData.contactNumber.trim(),
        profileImage: profileData.profileImage.trim(),
      });

      if (res?.success) {
        setMessage('Profile updated successfully!');
        if (res.user && updateUser) {
          updateUser(res.user);
        }
      } else {
        setError(res?.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading your profile details..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 font-[poppins] w-full">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          <FaArrowLeft className="h-3 w-3" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#222222] to-[#444444] p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt={profileData.userName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/20 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 shadow-md text-white text-3xl font-bold">
                  {profileData.userName ? profileData.userName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold truncate">
                  {profileData.userName || authUser?.userName || 'User Profile'}
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white flex items-center gap-1">
                  <FaGraduationCap className="text-xs" />
                  <span>{profileData.accountType || authUser?.accountType || 'Learner'}</span>
                </span>
              </div>
              <p className="text-sm text-gray-300 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <FaEnvelope className="text-xs" />
                <span>{profileData.email || authUser?.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Alerts */}
        <div className="p-6 sm:p-8">
          {message && (
            <Notification
              type="success"
              message={message}
              onDismiss={() => setMessage('')}
              className="mb-6"
            />
          )}

          {error && (
            <Notification
              type="error"
              message={error}
              onDismiss={() => setError('')}
              className="mb-6"
            />
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="userName"
                required
                value={profileData.userName}
                onChange={handleChange}
                icon={FaIdBadge}
              />

              <Input
                label="Email Address (Permanent)"
                name="email"
                type="email"
                disabled
                value={profileData.email}
                icon={FaEnvelope}
              />

              <Input
                label="Contact Phone Number"
                name="contactNumber"
                type="tel"
                value={profileData.contactNumber}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                icon={FaPhone}
              />

              <Input
                label="Avatar / Profile Image URL"
                name="profileImage"
                type="url"
                value={profileData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                icon={FaUserCircle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="bio">
                Bio & Background
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Share a short summary about your education, interests, or teaching background..."
                className="block w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#333333]"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                loading={saving}
                icon={FaSave}
              >
                Save Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

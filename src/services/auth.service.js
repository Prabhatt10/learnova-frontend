import api from './api';

export const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  signup: async ({ userName, email, password, confirmPassword, otp }) => {
    return await api.post('/auth/signup', {
      userName,
      email,
      password,
      confirmPassword,
      otp,
    });
  },

  sendRegistrationOtp: async (email) => {
    return await api.post('/auth/sendRegistrationOtp', { email });
  },

  resetPasswordByOtp: async (email) => {
    return await api.post('/auth/resetPasswordByOtp', { email });
  },

  resetPassword: async ({ email, otp, newPassword }) => {
    return await api.post('/auth/resetPassword', { email, otp, newPassword });
  },

  getProfile: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async ({ userName, bio, contactNumber, profileImage }) => {
    return await api.put('/auth/updateProfile', {
      userName,
      bio,
      contactNumber,
      profileImage,
    });
  },
};

export default authService;

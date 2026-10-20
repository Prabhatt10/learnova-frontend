import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('learnova_token');
      const storedUser = localStorage.getItem('learnova_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse stored auth user', e);
      localStorage.removeItem('learnova_token');
      localStorage.removeItem('learnova_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res?.success) {
      const authToken = res.token || res.accessToken;
      const userData = res.user;

      if (authToken) {
        localStorage.setItem('learnova_token', authToken);
        setToken(authToken);
      }
      if (userData) {
        localStorage.setItem('learnova_user', JSON.stringify(userData));
        setUser(userData);
      }
      return res;
    }
    throw new Error(res?.message || 'Login failed');
  };

  const sendRegistrationOtp = async (email) => {
    return await authService.sendRegistrationOtp(email);
  };

  const signup = async ({ userName, email, password, confirmPassword, otp }) => {
    const res = await authService.signup({
      userName,
      email,
      password,
      confirmPassword,
      otp,
    });
    if (res?.success) {
      const authToken = res.token || res.accessToken;
      const userData = res.user;

      if (authToken) {
        localStorage.setItem('learnova_token', authToken);
        setToken(authToken);
      }
      if (userData) {
        localStorage.setItem('learnova_user', JSON.stringify(userData));
        setUser(userData);
      }
      return res;
    }
    throw new Error(res?.message || 'Registration failed');
  };

  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('learnova_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    localStorage.removeItem('learnova_token');
    localStorage.removeItem('learnova_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    sendRegistrationOtp,
    signup,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { AuthContext } from './auth-context-def';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.getMe();
        if (res.data && res.data.user) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.data && res.data.user) {
      setUser(res.data.user);
      return res.data;
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    return res.data;
  };

  const verifyOtp = async (email, otp) => {
    const res = await authService.verifyOtp({ email, otp });
    if (res.data && res.data.user) {
      setUser(res.data.user);
      return res.data;
    }
    return res.data;
  };

  const resendOtp = async (email, purpose = 'verification') => {
    const res = await authService.resendOtp({ email, purpose });
    return res.data;
  };

  const forgotPassword = async (email) => {
    const res = await authService.forgotPassword({ email });
    return res.data;
  };

  const resetPassword = async (email, otp, newPassword) => {
    const res = await authService.resetPassword({ email, otp, newPassword });
    if (res.data && res.data.user) {
      setUser(res.data.user);
      return res.data;
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        verifyOtp,
        resendOtp,
        forgotPassword,
        resetPassword,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

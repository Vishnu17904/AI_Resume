import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/emailService.js';
import { connectDB } from '../config/db.js';

const ensureDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
};

export const validatePasswordStrength = (password) => {
  if (!password || typeof password !== 'string') return false;
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(password);
  return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
};

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateTokenAndSetCookie = (res, userId, email) => {
  const token = jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET || 'super_secret_resume_builder_jwt_key_2026',
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;
};

export const register = async (req, res) => {
  try {
    await ensureDB();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (cleanName.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (!validatePasswordStrength(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).'
      });
    }

    const existingUser = await User.findOne({ email: cleanEmail }).select('+isVerified +password');

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'An account with this email already exists and is verified. Please log in.' });
      }

      existingUser.name = cleanName;
      existingUser.password = password;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      existingUser.otpAttempts = 0;
      await existingUser.save();
    } else {
      await User.create({
        name: cleanName,
        email: cleanEmail,
        password,
        isVerified: false,
        otp,
        otpExpires,
        otpAttempts: 0
      });
    }

    await sendOtpEmail(cleanEmail, otp, 'verification');

    res.status(201).json({
      success: true,
      requireOtp: true,
      email: cleanEmail,
      message: 'Verification code sent to your email address.'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    await ensureDB();
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Please provide email and 6-digit OTP' });
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const cleanOtp = typeof otp === 'string' ? otp.trim() : '';

    const user = await User.findOne({ email: cleanEmail }).select('+otp +otpExpires +otpAttempts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otpAttempts >= 5) {
      return res.status(400).json({ message: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new code.' });
    }

    if (user.otp !== cleanOtp) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid verification code. Please check and try again.' });
    }

    // OTP is valid
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: true
      }
    });
  } catch (error) {
    console.error('verifyOtp error:', error);
    res.status(500).json({ message: error.message || 'Server error during OTP verification' });
  }
};

export const resendOtp = async (req, res) => {
  try {
    await ensureDB();
    const { email, purpose = 'verification' } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide your email address' });
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const user = await User.findOne({ email: cleanEmail }).select('+otp +otpExpires +otpAttempts');

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    await user.save();

    await sendOtpEmail(cleanEmail, otp, purpose);

    res.json({
      success: true,
      message: 'A fresh 6-digit code has been sent to your email.'
    });
  } catch (error) {
    console.error('resendOtp error:', error);
    res.status(500).json({ message: error.message || 'Failed to resend OTP' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    await ensureDB();
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select('+otp +otpExpires +otpAttempts');

    if (!user) {
      return res.json({
        success: true,
        message: 'If an account exists with that email, a password reset code has been sent.'
      });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    await user.save();

    await sendOtpEmail(cleanEmail, otp, 'reset');

    res.json({
      success: true,
      requireOtp: true,
      email: cleanEmail,
      message: 'Password reset code sent to your email.'
    });
  } catch (error) {
    console.error('forgotPassword error:', error);
    res.status(500).json({ message: error.message || 'Failed to process password reset request' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await ensureDB();
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Please provide email, OTP code, and new password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!validatePasswordStrength(newPassword)) {
      return res.status(400).json({
        message: 'New password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.'
      });
    }

    const user = await User.findOne({ email: cleanEmail }).select('+password +otp +otpExpires +otpAttempts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otpAttempts >= 5) {
      return res.status(400).json({ message: 'Too many incorrect attempts. Please request a new password reset code.' });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
    }

    if (user.otp !== cleanOtp) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid reset code. Please check and try again.' });
    }

    user.password = newPassword;
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.json({
      success: true,
      message: 'Password reset successfully! You are now logged in.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ message: error.message || 'Failed to reset password' });
  }
};

export const login = async (req, res) => {
  try {
    await ensureDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const user = await User.findOne({ email: cleanEmail }).select('+password +isVerified');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If account not verified yet, send fresh OTP and require verification
    if (!user.isVerified) {
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      user.otpAttempts = 0;
      await user.save();

      await sendOtpEmail(cleanEmail, otp, 'verification');

      return res.status(403).json({
        success: false,
        requireOtp: true,
        email: cleanEmail,
        message: 'Your email address is not verified yet. A fresh 6-digit code has been sent to your email.'
      });
    }

    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  try {
    await ensureDB();
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

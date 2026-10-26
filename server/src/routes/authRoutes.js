import express from 'express';
import {
  register,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  login,
  logout,
  getMe
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authRateLimiter, register);
router.post('/verify-otp', authRateLimiter, verifyOtp);
router.post('/resend-otp', authRateLimiter, resendOtp);
router.post('/forgot-password', authRateLimiter, forgotPassword);
router.post('/reset-password', authRateLimiter, resetPassword);
router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;

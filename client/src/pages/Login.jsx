import { ArrowLeft, Check, Eye, EyeOff, KeyRound, Loader2, Lock, Mail, RefreshCw, ShieldCheck, User2Icon, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const [searchParams] = useSearchParams();
  const urlState = searchParams.get('state');

  // 'login' | 'register' | 'verify_otp' | 'forgot_password' | 'reset_password'
  const [state, setState] = useState(urlState === 'register' ? 'register' : 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: ''
  });

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Resend Countdown Timer (60s)
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();
  const { user, login, register, verifyOtp, resendOtp, forgotPassword, resetPassword } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (urlState === 'register') {
      setState('register');
    } else if (urlState === 'login') {
      setState('login');
    }
  }, [urlState]);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Password Security Checks
  const passwordToCheck = state === 'reset_password' ? formData.newPassword : formData.password;
  const passwordCriteria = {
    minLength: passwordToCheck.length >= 8,
    hasUpper: /[A-Z]/.test(passwordToCheck),
    hasLower: /[a-z]/.test(passwordToCheck),
    hasNumber: /[0-9]/.test(passwordToCheck),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(passwordToCheck)
  };

  const passedCriteriaCount = Object.values(passwordCriteria).filter(Boolean).length;
  const isPasswordSecure = passedCriteriaCount === 5;

  const getStrengthConfig = () => {
    if (passwordToCheck.length === 0) return { label: '', color: 'bg-gray-200', width: 'w-0' };
    if (passedCriteriaCount <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (passedCriteriaCount === 3) return { label: 'Fair', color: 'bg-orange-500', width: 'w-2/4' };
    if (passedCriteriaCount === 4) return { label: 'Good', color: 'bg-yellow-500', width: 'w-3/4' };
    return { label: 'Strong & Secure', color: 'bg-[#013e37]', width: 'w-full' };
  };

  const strength = getStrengthConfig();

  // Handle 6-Box OTP Input Actions
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted) {
        const nextDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          nextDigits[i] = pasted[i] || '';
        }
        setOtpDigits(nextDigits);
        const focusIdx = Math.min(pasted.length, 5);
        otpInputsRef.current[focusIdx]?.focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const nextDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        nextDigits[i] = pastedData[i] || '';
      }
      setOtpDigits(nextDigits);
      const focusIdx = Math.min(pastedData.length, 5);
      otpInputsRef.current[focusIdx]?.focus();
    }
  };

  // Form Submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (state === 'register') {
      if (!isPasswordSecure) {
        setErrorMessage('Please ensure your password satisfies all 5 security criteria below.');
        return;
      }
      setLoading(true);
      try {
        const res = await register(formData.name, formData.email, formData.password);
        if (res.requireOtp) {
          setState('verify_otp');
          setResendTimer(60);
          setSuccessMessage(`A 6-digit verification code was sent to ${formData.email}.`);
        } else {
          navigate('/app');
        }
      } catch (err) {
        setErrorMessage(err.message || 'Registration failed.');
      } finally {
        setLoading(false);
      }
    } else if (state === 'login') {
      setLoading(true);
      try {
        await login(formData.email, formData.password);
        navigate('/app');
      } catch (err) {
        if (err.response?.data?.requireOtp) {
          setState('verify_otp');
          setResendTimer(60);
          setErrorMessage(err.message || 'Please verify your email before logging in.');
        } else {
          setErrorMessage(err.message || 'Invalid email or password.');
        }
      } finally {
        setLoading(false);
      }
    } else if (state === 'verify_otp') {
      const fullOtp = otpDigits.join('');
      if (fullOtp.length !== 6) {
        setErrorMessage('Please enter the full 6-digit verification code.');
        return;
      }
      setLoading(true);
      try {
        await verifyOtp(formData.email, fullOtp);
        navigate('/app');
      } catch (err) {
        setErrorMessage(err.message || 'Verification failed.');
      } finally {
        setLoading(false);
      }
    } else if (state === 'forgot_password') {
      setLoading(true);
      try {
        const res = await forgotPassword(formData.email);
        setState('reset_password');
        setResendTimer(60);
        setSuccessMessage('Reset code sent! Please check your email.');
      } catch (err) {
        setErrorMessage(err.message || 'Failed to send reset code.');
      } finally {
        setLoading(false);
      }
    } else if (state === 'reset_password') {
      const fullOtp = otpDigits.join('');
      if (fullOtp.length !== 6) {
        setErrorMessage('Please enter the 6-digit code sent to your email.');
        return;
      }
      if (!isPasswordSecure) {
        setErrorMessage('New password must satisfy all 5 security criteria.');
        return;
      }
      setLoading(true);
      try {
        await resetPassword(formData.email, fullOtp, formData.newPassword);
        navigate('/app');
      } catch (err) {
        setErrorMessage(err.message || 'Password reset failed.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const purpose = state === 'reset_password' ? 'reset' : 'verification';
      await resendOtp(formData.email, purpose);
      setResendTimer(60);
      setSuccessMessage('A fresh 6-digit code has been sent.');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to resend code.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#fdfbf7] p-4'>
      <div className="sm:w-[440px] w-full border border-[#e8d697] rounded-3xl p-8 bg-white shadow-sm">
        {/* Top Header */}
        <div className="text-center">
          {state === 'verify_otp' && (
            <div className="size-12 mx-auto bg-[#ffefb3] text-[#013e37] rounded-2xl flex items-center justify-center mb-3 border border-[#e8d697]">
              <Mail className="size-6" />
            </div>
          )}
          {state === 'forgot_password' && (
            <div className="size-12 mx-auto bg-[#ffefb3] text-[#013e37] rounded-2xl flex items-center justify-center mb-3 border border-[#e8d697]">
              <KeyRound className="size-6" />
            </div>
          )}
          {state === 'reset_password' && (
            <div className="size-12 mx-auto bg-[#ffefb3] text-[#013e37] rounded-2xl flex items-center justify-center mb-3 border border-[#e8d697]">
              <Lock className="size-6" />
            </div>
          )}

          <h1 className="text-[#013e37] text-2xl sm:text-3xl font-extrabold tracking-tight">
            {state === "login" && "Welcome Back"}
            {state === "register" && "Create Account"}
            {state === "verify_otp" && "Verify Your Email"}
            {state === "forgot_password" && "Reset Password"}
            {state === "reset_password" && "Set New Password"}
          </h1>

          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
            {state === "login" && "Log in to manage and customize your resumes"}
            {state === "register" && "Sign up with a secure password to get started"}
            {state === "verify_otp" && `Enter the 6-digit code sent to ${formData.email || 'your email'}`}
            {state === "forgot_password" && "Enter your email to receive a password reset code"}
            {state === "reset_password" && `Enter the reset code sent to ${formData.email} and your new password`}
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 text-left leading-relaxed">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3 bg-[#ffefb3] text-[#013e37] font-medium text-xs rounded-xl border border-[#e8d697] text-left leading-relaxed">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Register: Full Name */}
          {state === "register" && (
            <div className="flex items-center w-full bg-[#fdfbf7] border border-gray-300 h-12 rounded-xl overflow-hidden px-4 gap-2 focus-within:border-[#013e37] focus-within:ring-2 focus-within:ring-[#013e37]/20 focus-within:bg-white transition">
              <User2Icon size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-transparent border-none outline-none ring-0 text-sm text-slate-800"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email input for Login, Register, and Forgot Password */}
          {(state === 'login' || state === 'register' || state === 'forgot_password') && (
            <div className="flex items-center w-full bg-[#fdfbf7] border border-gray-300 h-12 rounded-xl overflow-hidden px-4 gap-2 focus-within:border-[#013e37] focus-within:ring-2 focus-within:ring-[#013e37]/20 focus-within:bg-white transition">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-none outline-none ring-0 text-sm text-slate-800"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Password for Login & Register */}
          {(state === 'login' || state === 'register') && (
            <div className="relative flex items-center w-full bg-[#fdfbf7] border border-gray-300 h-12 rounded-xl overflow-hidden px-4 gap-2 focus-within:border-[#013e37] focus-within:ring-2 focus-within:ring-[#013e37]/20 focus-within:bg-white transition">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={state === "register" ? "Create a strong password" : "Password"}
                className="w-full bg-transparent border-none outline-none ring-0 text-sm text-slate-800 pr-8"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-slate-700 transition cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          {/* 6-Box Segmented OTP Inputs for verify_otp & reset_password */}
          {(state === 'verify_otp' || state === 'reset_password') && (
            <div>
              <label className="block text-xs font-bold text-[#013e37] mb-2 text-center">
                Enter 6-Digit Code
              </label>
              <div className="flex justify-between gap-2 on-paste" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => otpInputsRef.current[idx] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className="size-12 text-center text-lg font-bold bg-[#fdfbf7] border border-gray-300 rounded-xl focus:outline-none focus:border-[#013e37] focus:ring-2 focus:ring-[#013e37]/20 focus:bg-white text-[#013e37] transition"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-slate-500">Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={handleResendOtp}
                  className="font-bold text-[#013e37] hover:underline disabled:text-slate-400 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  <RefreshCw size={12} className={resendTimer > 0 ? "animate-spin" : ""} />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>
          )}

          {/* New Password field for reset_password */}
          {state === 'reset_password' && (
            <div className="relative flex items-center w-full bg-[#fdfbf7] border border-gray-300 h-12 rounded-xl overflow-hidden px-4 gap-2 focus-within:border-[#013e37] focus-within:ring-2 focus-within:ring-[#013e37]/20 focus-within:bg-white transition mt-2">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New strong password"
                className="w-full bg-transparent border-none outline-none ring-0 text-sm text-slate-800 pr-8"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-slate-700 transition cursor-pointer"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          {/* Password Strength Checklist (Register & Reset Password) */}
          {(state === 'register' || state === 'reset_password') && passwordToCheck.length > 0 && (
            <div className="text-left space-y-2 bg-[#fdfbf7] p-3.5 rounded-xl border border-[#e8d697] animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#013e37] flex items-center gap-1">
                  <ShieldCheck className="size-3.5 text-[#013e37]" />
                  Security Strength:
                </span>
                <span className="font-extrabold text-xs text-[#013e37]">{strength.label}</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1 text-slate-600">
                <div className={`flex items-center gap-1.5 ${passwordCriteria.minLength ? 'text-[#013e37] font-bold' : 'text-slate-400'}`}>
                  {passwordCriteria.minLength ? <Check size={13} className="shrink-0 text-[#013e37]" /> : <X size={13} className="shrink-0" />}
                  <span>8+ Characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.hasUpper ? 'text-[#013e37] font-bold' : 'text-slate-400'}`}>
                  {passwordCriteria.hasUpper ? <Check size={13} className="shrink-0 text-[#013e37]" /> : <X size={13} className="shrink-0" />}
                  <span>Uppercase (A-Z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.hasLower ? 'text-[#013e37] font-bold' : 'text-slate-400'}`}>
                  {passwordCriteria.hasLower ? <Check size={13} className="shrink-0 text-[#013e37]" /> : <X size={13} className="shrink-0" />}
                  <span>Lowercase (a-z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.hasNumber ? 'text-[#013e37] font-bold' : 'text-slate-400'}`}>
                  {passwordCriteria.hasNumber ? <Check size={13} className="shrink-0 text-[#013e37]" /> : <X size={13} className="shrink-0" />}
                  <span>Number (0-9)</span>
                </div>
                <div className={`col-span-2 flex items-center gap-1.5 ${passwordCriteria.hasSpecial ? 'text-[#013e37] font-bold' : 'text-slate-400'}`}>
                  {passwordCriteria.hasSpecial ? <Check size={13} className="shrink-0 text-[#013e37]" /> : <X size={13} className="shrink-0" />}
                  <span>Special Character (!@#$%^&*)</span>
                </div>
              </div>
            </div>
          )}

          {state === 'login' && (
            <div className="text-left">
              <button
                type="button"
                onClick={() => {
                  setState('forgot_password');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-xs text-[#013e37] font-semibold hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || ((state === 'register' || state === 'reset_password') && !isPasswordSecure)}
            className="w-full h-11 rounded-xl text-[#ffefb3] bg-[#013e37] hover:bg-[#012a25] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer font-bold text-sm shadow-sm border border-[#ffefb3]/30 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            <span>
              {state === "login" && "Sign In"}
              {state === "register" && "Send Verification Code"}
              {state === "verify_otp" && "Verify Email & Complete"}
              {state === "forgot_password" && "Send Reset Code"}
              {state === "reset_password" && "Reset Password & Log In"}
            </span>
          </button>
        </form>

        {/* Back / Alternate Options Footer */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          {(state === 'verify_otp' || state === 'forgot_password' || state === 'reset_password') ? (
            <button
              type="button"
              onClick={() => {
                setState('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#013e37] hover:underline transition cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>
          ) : (
            <p
              onClick={() => {
                setState(prev => prev === "login" ? "register" : "login");
                setErrorMessage('');
                setSuccessMessage('');
                setFormData(prev => ({ ...prev, password: '' }));
              }}
              className="text-slate-500 text-xs cursor-pointer"
            >
              {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="text-[#013e37] font-bold hover:underline">
                {state === "login" ? "Sign up here" : "Login here"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

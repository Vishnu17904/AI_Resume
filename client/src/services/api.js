import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for clean error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Preserve response object if available so callers can check requireOtp / devOtp
    const customError = new Error(error.response?.data?.message || error.message || 'Something went wrong');
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resendOtp: (data) => api.post('/auth/resend-otp', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};

// Resume Services
export const resumeService = {
  getResumes: () => api.get('/resumes'),
  createResume: (data) => api.post('/resumes', data),
  getResume: (id) => api.get(`/resumes/${id}`),
  updateResume: (id, data) => api.put(`/resumes/${id}`, data),
  updateTitle: (id, title) => api.patch(`/resumes/${id}/title`, { title }),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  getPublicResume: (id) => api.get(`/resumes/public/${id}`),
  toggleVisibility: (id) => api.patch(`/resumes/${id}/visibility`),
  uploadResumePdf: (formData) => api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// Upload Services
export const uploadService = {
  uploadImage: (file, removeBackground = false) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('remove_background', removeBackground.toString());
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

// AI Services
export const aiService = {
  enhanceSummary: (data) => api.post('/ai/enhance-summary', data),
  enhanceExperience: (data) => api.post('/ai/enhance-experience', data)
};

export default api;

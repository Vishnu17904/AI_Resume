import express from 'express';
import {
  getResumes,
  createResume,
  getResumeById,
  updateResume,
  updateResumeTitle,
  deleteResume,
  getPublicResume,
  toggleVisibility,
  uploadAndParseResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';
import { uploadPdfMiddleware } from '../middleware/upload.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public route (no auth required)
router.get('/public/:id', getPublicResume);

// Protected routes (requires auth)
router.use(protect);

router.get('/', getResumes);
router.post('/', createResume);
router.post('/upload', aiRateLimiter, uploadPdfMiddleware.single('resume'), uploadAndParseResume);

router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.patch('/:id/title', updateResumeTitle);
router.patch('/:id/visibility', toggleVisibility);
router.delete('/:id', deleteResume);

export default router;

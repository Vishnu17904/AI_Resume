import express from 'express';
import { enhanceSummary, enhanceExperience } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);
router.use(aiRateLimiter);

router.post('/enhance-summary', enhanceSummary);
router.post('/enhance-experience', enhanceExperience);

export default router;

import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { uploadImageMiddleware } from '../middleware/upload.js';

const router = express.Router();

router.post('/image', protect, uploadImageMiddleware.single('image'), uploadImage);

export default router;

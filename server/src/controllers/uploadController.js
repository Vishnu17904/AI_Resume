import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinary, isConfigured as isCloudinaryConfigured } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '../../uploads');

// Safely ensure local uploads directory exists
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn('Upload directory skipped in read-only environment:', e.message);
}

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const removeBackground = req.body.removeBackground === 'true' || req.body.removeBackground === true;

    // Use Cloudinary if configured
    if (isCloudinaryConfigured) {
      const uploadOptions = {
        folder: 'resume-builder/profiles',
        resource_type: 'image'
      };

      if (removeBackground) {
        uploadOptions.transformation = [{ effect: 'background_removal' }];
      }

      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          stream.end(buffer);
        });
      };

      const result = await streamUpload(req.file.buffer);
      return res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    // In serverless when Cloudinary is not set up, return a Data URI directly
    if (process.env.VERCEL) {
      const base64Data = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64Data}`;
      return res.json({
        success: true,
        url: dataUri
      });
    }

    // Local file storage fallback
    const ext = path.extname(req.file.originalname) || '.png';
    const filename = `profile_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, req.file.buffer);

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({
      success: true,
      url: fileUrl
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: error.message || 'Failed to upload image' });
  }
};

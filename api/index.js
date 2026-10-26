import app from '../server/src/server.js';
import { connectDB } from '../server/src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('Serverless MongoDB connection error:', err);
    return res.status(500).json({
      message: `Database Connection Error: ${err.message}. Please check your MONGODB_URI in Vercel Environment Variables.`
    });
  }
  return app(req, res);
}

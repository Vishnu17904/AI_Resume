import mongoose from 'mongoose';

let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
    throw new Error('MONGODB_URI environment variable is missing in Vercel project settings.');
  }

  const targetUri = uri || 'mongodb://127.0.0.1:27017/resume-builder';

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(targetUri, {
      bufferCommands: false, // Prevents 10s hang by failing fast with exact error
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).catch((err) => {
      cachedPromise = null;
      throw err;
    });
  }

  try {
    const conn = await cachedPromise;
    return conn;
  } catch (error) {
    cachedPromise = null;
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

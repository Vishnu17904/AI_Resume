import mongoose from 'mongoose';
import Resume from '../models/Resume.js';
import { parseResumePdf } from '../utils/pdfParser.js';
import { connectDB } from '../config/db.js';

const ensureDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
};

export const getResumes = async (req, res) => {
  try {
    await ensureDB();
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 }).lean();
    res.json({ success: true, resumes });
  } catch (error) {
    console.error('getResumes error:', error);
    res.status(500).json({ message: 'Failed to fetch resumes' });
  }
};

export const createResume = async (req, res) => {
  try {
    await ensureDB();
    const { title } = req.body;
    const cleanTitle = typeof title === 'string' && title.trim() ? title.trim().substring(0, 100) : 'Untitled Resume';

    const resume = await Resume.create({
      userId: req.user._id,
      title: cleanTitle,
      template: 'classic',
      accent_color: '#013e37',
      personal_info: {
        full_name: req.user.name || '',
        email: req.user.email || '',
        phone: '',
        location: '',
        profession: '',
        linkedin: '',
        website: ''
      },
      professional_summary: '',
      skills: ['JavaScript', 'React', 'Git', 'Problem Solving'],
      experience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Software Engineer',
          start_date: '2022-01',
          end_date: 'Present',
          description: 'Engineered responsive web applications and improved page load performance by 35% through code splitting and memoization.',
          is_current: true
        }
      ],
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          graduation_date: '2022-05',
          gpa: '3.8'
        }
      ],
      project: [
        {
          name: 'AI Resume Builder',
          type: 'Full Stack Web App',
          description: 'Designed and deployed an AI-assisted resume generation tool supporting multi-template real-time rendering and ATS optimization.'
        }
      ]
    });

    res.status(201).json({ success: true, resume });
  } catch (error) {
    console.error('createResume error:', error);
    res.status(500).json({ message: 'Failed to create resume' });
  }
};

export const getResumeById = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this resume' });
    }

    res.json({ success: true, resume });
  } catch (error) {
    console.error('getResumeById error:', error);
    res.status(500).json({ message: 'Failed to fetch resume' });
  }
};

export const updateResume = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this resume' });
    }

    const allowedFields = [
      'title', 'personal_info', 'professional_summary',
      'experience', 'education', 'project', 'skills',
      'template', 'accent_color', 'public'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    await resume.save();
    res.json({ success: true, resume });
  } catch (error) {
    console.error('updateResume error:', error);
    res.status(500).json({ message: 'Failed to update resume' });
  }
};

export const updateResumeTitle = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;
    const { title } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Please provide a valid title' });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this resume' });
    }

    resume.title = title.trim().substring(0, 100);
    await resume.save();

    res.json({ success: true, resume });
  } catch (error) {
    console.error('updateResumeTitle error:', error);
    res.status(500).json({ message: 'Failed to update resume title' });
  }
};

export const deleteResume = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this resume' });
    }

    await Resume.findByIdAndDelete(id);
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('deleteResume error:', error);
    res.status(500).json({ message: 'Failed to delete resume' });
  }
};

export const getPublicResume = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    const resume = await Resume.findById(id).lean();
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!resume.public) {
      return res.status(403).json({ message: 'This resume is private and not shared publicly' });
    }

    res.json({ success: true, resume });
  } catch (error) {
    console.error('getPublicResume error:', error);
    res.status(500).json({ message: 'Failed to load public resume' });
  }
};

export const toggleVisibility = async (req, res) => {
  try {
    await ensureDB();
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid resume ID format' });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this resume' });
    }

    resume.public = !resume.public;
    await resume.save();

    res.json({ success: true, public: resume.public, resume });
  } catch (error) {
    console.error('toggleVisibility error:', error);
    res.status(500).json({ message: 'Failed to toggle visibility' });
  }
};

export const uploadAndParseResume = async (req, res) => {
  try {
    await ensureDB();
    if (!req.file) {
      return res.status(400).json({ message: 'Please provide a PDF resume file' });
    }

    const fallbackTitle = req.file.originalname
      ? req.file.originalname.replace(/\.[^/.]+$/, '').substring(0, 100)
      : 'Uploaded Resume';

    const title = typeof req.body.title === 'string' && req.body.title.trim()
      ? req.body.title.trim().substring(0, 100)
      : fallbackTitle;

    let parsedData = {};
    try {
      parsedData = await parseResumePdf(req.file.buffer);
    } catch (parseErr) {
      console.warn('PDF parser encountered error, creating clean draft:', parseErr);
    }

    const newResume = await Resume.create({
      userId: req.user._id,
      title: title || parsedData?.title || fallbackTitle,
      template: 'classic',
      accent_color: '#013e37',
      personal_info: parsedData?.personal_info || {
        full_name: req.user.name || '',
        email: req.user.email || ''
      },
      professional_summary: parsedData?.professional_summary || '',
      skills: parsedData?.skills || ['JavaScript', 'React', 'Git', 'Problem Solving'],
      experience: parsedData?.experience || [],
      education: parsedData?.education || [],
      project: parsedData?.project || []
    });

    res.status(201).json({ success: true, resume: newResume });
  } catch (error) {
    console.error('uploadAndParseResume error:', error);
    res.status(500).json({ message: error.message || 'Failed to parse and create resume from PDF' });
  }
};

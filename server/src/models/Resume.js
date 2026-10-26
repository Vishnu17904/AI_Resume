import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  start_date: { type: String, default: '' },
  end_date: { type: String, default: '' },
  description: { type: String, default: '' },
  is_current: { type: Boolean, default: false }
}, { _id: true });

const educationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  field: { type: String, default: '' },
  graduation_date: { type: String, default: '' },
  gpa: { type: String, default: '' }
}, { _id: true });

const projectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: true });

const personalInfoSchema = new mongoose.Schema({
  full_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  profession: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  image: { type: String, default: '' }
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a resume title'],
    trim: true,
    default: 'Untitled Resume'
  },
  public: {
    type: Boolean,
    default: false,
    index: true
  },
  template: {
    type: String,
    default: 'classic',
    enum: ['classic', 'modern', 'minimal', 'minimal-image']
  },
  accent_color: {
    type: String,
    default: '#3B82F6'
  },
  personal_info: {
    type: personalInfoSchema,
    default: () => ({})
  },
  professional_summary: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: [experienceSchema],
    default: []
  },
  education: {
    type: [educationSchema],
    default: []
  },
  project: {
    type: [projectSchema],
    default: []
  }
}, {
  timestamps: true
});

// Compound indexes for optimal performance
resumeSchema.index({ userId: 1, updatedAt: -1 });
resumeSchema.index({ _id: 1, public: 1 });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;

import { enhanceProfessionalSummary, enhanceExperienceDescription } from '../utils/aiHelper.js';

export const enhanceSummary = async (req, res) => {
  try {
    const { text, profession, experience } = req.body;
    const enhanced = await enhanceProfessionalSummary(text, profession, experience);
    res.json({ success: true, summary: enhanced });
  } catch (error) {
    console.error('enhanceSummary error:', error);
    res.status(500).json({ message: 'Failed to enhance summary with AI' });
  }
};

export const enhanceExperience = async (req, res) => {
  try {
    const { position, company, description } = req.body;
    const enhanced = await enhanceExperienceDescription(position, company, description);
    res.json({ success: true, description: enhanced });
  } catch (error) {
    console.error('enhanceExperience error:', error);
    res.status(500).json({ message: 'Failed to enhance experience with AI' });
  }
};

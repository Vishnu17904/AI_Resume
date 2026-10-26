import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export const enhanceProfessionalSummary = async (text, profession, experience = []) => {
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const expContext = experience.map(e => `${e.position} at ${e.company}: ${e.description}`).join('; ');
      const prompt = `You are an expert resume writer and career coach.
Enhance the following professional summary for a ${profession || 'Professional'}.
Experience context: ${expContext || 'None provided'}
Current Summary: "${text || ''}"

Instructions:
- Craft a punchy, impactful, ATS-optimized 3-4 sentence professional summary.
- Focus on key strengths, achievements, and value proposition.
- Use powerful action verbs and active voice.
- Return ONLY the enhanced summary text directly with no extra commentary, quotes, or markdown formatting.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().replace(/^["']|["']$/g, '');
    } catch (err) {
      console.error('Gemini AI summary enhancement failed, using smart fallback:', err.message);
    }
  }

  // Fallback enhancement if API key not available
  if (!text || text.trim() === '') {
    return `Results-driven ${profession || 'Professional'} with proven expertise in delivering high-impact solutions, optimizing workflows, and collaborating across cross-functional teams to exceed organizational objectives.`;
  }
  return `Results-driven ${profession || 'Professional'} with extensive background in ${text.trim().replace(/\.$/, '')}. Proven track record of spearheading critical initiatives, driving continuous improvements, and delivering measurable business impact in dynamic environments.`;
};

export const enhanceExperienceDescription = async (position, company, description) => {
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a professional resume writer.
Enhance the job description bullets for the position of "${position}" at "${company}".
Current description:
${description || 'General responsibilities'}

Instructions:
- Rewrite this into 2 to 4 bullet points starting with strong action verbs (e.g., Spearheaded, Developed, Engineered, Optimized).
- Emphasize quantifiable impact, collaboration, and modern industry standards.
- Return plain text with each bullet point starting on a new line.
- Return ONLY the bullet points, no extra explanation or markdown headers.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (err) {
      console.error('Gemini AI experience enhancement failed, using smart fallback:', err.message);
    }
  }

  // Fallback
  if (!description || description.trim() === '') {
    return `• Spearheaded critical projects as ${position || 'lead'}, ensuring timely delivery and adherence to quality standards.\n• Collaborated with cross-functional teams to streamline workflows and boost overall operational efficiency.\n• Implemented best practices and modern methodologies to achieve measurable performance improvements.`;
  }

  const lines = description.split('\n').filter(l => l.trim().length > 0);
  return lines.map(line => {
    const clean = line.replace(/^[•\-\*\s]+/, '').trim();
    return `• Successfully executed: ${clean}`;
  }).join('\n');
};

export const parseResumeWithAI = async (rawText) => {
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json' }
      });

      const prompt = `Extract structured resume data from the following resume text and format it STRICTLY as a JSON object matching this schema:
{
  "title": "Extracted Resume",
  "personal_info": {
    "full_name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "profession": "string",
    "linkedin": "string",
    "website": "string"
  },
  "professional_summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "start_date": "YYYY-MM or string",
      "end_date": "YYYY-MM or Present",
      "description": "string",
      "is_current": boolean
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "graduation_date": "YYYY-MM or string",
      "gpa": "string"
    }
  ],
  "project": [
    {
      "name": "string",
      "type": "string",
      "description": "string"
    }
  ]
}

Resume Text:
${rawText}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const parsed = JSON.parse(response.text());
      return parsed;
    } catch (err) {
      console.error('Gemini AI resume parsing failed, using rule-based fallback:', err.message);
    }
  }

  return null;
};

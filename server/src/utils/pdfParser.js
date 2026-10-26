import pdf from 'pdf-parse';
import { parseResumeWithAI } from './aiHelper.js';

export const parseResumePdf = async (buffer) => {
  let text = '';
  try {
    const data = await pdf(buffer);
    text = data?.text || '';
  } catch (err) {
    console.warn('pdf-parse text extraction warning:', err.message);
  }

  // Try AI parsing if extracted text is rich enough
  if (text.trim().length > 30) {
    try {
      const aiParsed = await parseResumeWithAI(text);
      if (aiParsed && (aiParsed.personal_info?.full_name || aiParsed.skills?.length > 0)) {
        return aiParsed;
      }
    } catch (aiErr) {
      console.warn('AI parsing failed, falling back to rule-based parser:', aiErr.message);
    }
  }

  // Fallback rule-based parsing
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+/);
  const websiteMatch = text.match(/https?:\/\/(?!www\.linkedin\.com)[\w.-]+\.[a-z]{2,}/);

  const email = emailMatch ? emailMatch[0] : '';
  const phone = phoneMatch ? phoneMatch[0] : '';
  const linkedin = linkedinMatch ? linkedinMatch[0] : '';
  const website = websiteMatch ? websiteMatch[0] : '';

  // Guess name from first line
  const name = lines.length > 0 && lines[0].length < 40 ? lines[0] : 'Applicant Name';

  // Common skill keywords
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Express',
    'Python', 'Django', 'Flask', 'Java', 'Spring', 'C++', 'C#', 'SQL', 'MongoDB',
    'PostgreSQL', 'HTML', 'CSS', 'Tailwind', 'Git', 'Docker', 'Kubernetes', 'AWS',
    'GCP', 'Azure', 'REST API', 'GraphQL', 'Redux', 'Next.js'
  ];

  const foundSkills = [];
  skillKeywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    if (regex.test(text)) {
      foundSkills.push(kw);
    }
  });

  return {
    title: `${name.split(' ')[0]}'s Resume`,
    personal_info: {
      full_name: name,
      email,
      phone,
      location: '',
      profession: 'Software Professional',
      linkedin,
      website
    },
    professional_summary: lines.slice(1, 4).join(' ').substring(0, 300) || 'Experienced professional with a strong track record of delivering successful results in fast-paced team environments.',
    skills: foundSkills.length > 0 ? foundSkills : ['JavaScript', 'React', 'Git', 'Problem Solving', 'Team Leadership'],
    experience: [
      {
        company: 'Previous Company',
        position: 'Software Developer',
        start_date: '2022-01',
        end_date: 'Present',
        description: 'Developed and maintained key software applications, improving efficiency and user experience.',
        is_current: true
      }
    ],
    education: [
      {
        institution: 'University / College',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduation_date: '2022-05',
        gpa: ''
      }
    ],
    project: [
      {
        name: 'Featured Project',
        type: 'Web Application',
        description: 'Full stack project built with modern technologies delivering robust functionality.'
      }
    ]
  };
};

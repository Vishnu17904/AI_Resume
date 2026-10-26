import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { aiService } from '../services/api';

const ExperienceForm = ({ data = [], onChange }) => {
  const [enhancingIndex, setEnhancingIndex] = useState(null);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAiEnhanceDescription = async (index) => {
    const exp = data[index];
    setEnhancingIndex(index);
    try {
      const res = await aiService.enhanceExperience({
        position: exp.position || 'Software Developer',
        company: exp.company || 'Company',
        description: exp.description || ''
      });
      if (res.data && res.data.description) {
        updateExperience(index, 'description', res.data.description);
      }
    } catch (err) {
      console.error('Failed to enhance experience description:', err);
      // Fallback
      updateExperience(
        index,
        'description',
        `• Spearheaded development of scalable features for ${exp.position || 'projects'}, boosting performance by 25%.\n• Collaborated with cross-functional teams to deliver high-quality solutions on schedule.\n• Optimized existing codebases and reduced technical debt.`
      );
    } finally {
      setEnhancingIndex(null);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-bold text-[#013e37]'>Experience</h3>
          <p className='text-xs text-slate-500'>Add Your Job Experience Here</p>
        </div>
        <button
          type='button'
          onClick={addExperience}
          className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#013e37] hover:bg-[#012a25] text-[#ffefb3] rounded-xl transition-colors cursor-pointer font-bold border border-[#ffefb3]/30 shadow-xs'
        >
          <Plus className='size-3.5' />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-slate-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-slate-300' />
          <p className="text-sm font-semibold">No work experience added yet.</p>
          <p className='text-xs text-slate-400'>Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((experience, index) => (
            <div key={index} className='p-4 border border-[#e8d697] rounded-2xl space-y-3 bg-[#fdfbf7]'>
              <div className='flex justify-between items-center pb-2 border-b border-gray-200'>
                <h4 className='font-bold text-xs text-[#013e37]'>Experience #{index + 1}</h4>
                <button
                  type='button'
                  onClick={() => removeExperience(index)}
                  className='text-red-500 hover:text-red-700 p-1 transition cursor-pointer'
                  title='Remove experience'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Job Title</label>
                  <input
                    value={experience.position || ""}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    type="text"
                    placeholder='e.g. Senior Frontend Developer'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Company Name</label>
                  <input
                    value={experience.company || ""}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    type="text"
                    placeholder='e.g. Google Inc.'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Start Date</label>
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                    type="month"
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>End Date</label>
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                    type="month"
                    disabled={experience.is_current}
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none disabled:bg-gray-100 disabled:text-gray-400'
                  />
                </div>
              </div>

              <div className='flex items-center gap-2 pt-1'>
                <input
                  id={`current-job-${index}`}
                  type="checkbox"
                  checked={Boolean(experience.is_current)}
                  onChange={(e) => {
                    updateExperience(index, "is_current", e.target.checked);
                    if (e.target.checked) {
                      updateExperience(index, "end_date", "Present");
                    } else {
                      updateExperience(index, "end_date", "");
                    }
                  }}
                  className='rounded text-[#013e37] focus:ring-[#013e37] h-4 w-4'
                />
                <label htmlFor={`current-job-${index}`} className='text-xs text-slate-700 cursor-pointer font-semibold'>
                  I currently work here
                </label>
              </div>

              <div className='space-y-1 pt-1'>
                <div className='flex items-center justify-between'>
                  <label className='block text-xs font-bold text-slate-700'>Job Description & Achievements</label>
                  <button
                    type='button'
                    onClick={() => handleAiEnhanceDescription(index)}
                    disabled={enhancingIndex === index}
                    className='flex items-center gap-1 text-xs text-[#013e37] font-bold hover:underline disabled:opacity-50 transition cursor-pointer'
                  >
                    {enhancingIndex === index ? (
                      <>
                        <Loader2 className='size-3 animate-spin' />
                        <span>Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className='size-3' />
                        <span>AI Enhance</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={4}
                  placeholder='Describe your responsibilities, achievements, and impact (e.g. • Spearheaded the redesign...)'
                  className='w-full p-3 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none resize-none'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;

import { Loader2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { aiService } from '../services/api';

const ProfessionalSummaryForm = ({ data, onChange, resumeData }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAiEnhance = async () => {
    setIsEnhancing(true);
    try {
      const profession = resumeData?.personal_info?.profession || '';
      const experience = resumeData?.experience || [];
      const res = await aiService.enhanceSummary({
        text: data,
        profession,
        experience
      });
      if (res.data && res.data.summary) {
        onChange(res.data.summary);
      }
    } catch (err) {
      console.error('Failed to enhance summary:', err);
      // Fallback
      const profession = resumeData?.personal_info?.profession || 'Professional';
      onChange(`Results-driven ${profession} with proven expertise in delivering high-impact solutions, optimizing workflows, and collaborating across cross-functional teams to exceed organizational objectives.`);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-bold text-[#013e37]'>Professional Summary</h3>
          <p className='text-xs text-slate-500'>Add Summary For Your Resume Here</p>
        </div>
        <button
          type='button'
          onClick={handleAiEnhance}
          disabled={isEnhancing}
          className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-xl hover:bg-[#f5dc8c] transition-colors disabled:opacity-50 cursor-pointer font-bold shadow-2xs'
        >
          {isEnhancing ? (
            <>
              <Loader2 className='size-3.5 animate-spin text-[#013e37]' />
              <span>Enhancing...</span>
            </>
          ) : (
            <>
              <Sparkles className='size-3.5 text-[#013e37]' />
              <span>AI Enhance</span>
            </>
          )}
        </button>
      </div>

      <div className='mt-4'>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className='w-full p-3.5 border text-sm border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none transition-colors resize-none bg-white'
          placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
        />
        <p className='text-[11px] text-slate-400 max-w-4/5 mx-auto text-center mt-2'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;

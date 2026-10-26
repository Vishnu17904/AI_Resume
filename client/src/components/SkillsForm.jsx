import { Plus, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';

const SUGGESTED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "Tailwind CSS", "HTML5", "CSS3", "Git", "GitHub", "SQL",
  "MongoDB", "PostgreSQL", "Docker", "REST APIs", "GraphQL",
  "AWS", "Next.js", "Express", "Figma", "Redux", "Problem Solving"
];

const SkillsForm = ({ data = [], onChange }) => {
  const [inputVal, setInputVal] = useState("");

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!data.includes(trimmed)) {
      onChange([...data, trimmed]);
    }
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputVal);
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-bold text-[#013e37]'>Skills</h3>
        <p className='text-xs text-slate-500'>Add Your Technical & Professional Skills</p>
      </div>

      <div className='space-y-3'>
        <div className='flex gap-2'>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type a skill and press Enter or comma (e.g. React, Node.js)'
            className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
          />
          <button
            type='button'
            onClick={() => addSkill(inputVal)}
            disabled={!inputVal.trim()}
            className='px-4 py-2 bg-[#013e37] text-[#ffefb3] rounded-xl hover:bg-[#012a25] disabled:opacity-50 transition cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0 border border-[#ffefb3]/30 shadow-xs'
          >
            <Plus size={15} /> Add
          </button>
        </div>

        {/* Current Skills Badge List */}
        <div className='min-h-16 p-3 bg-[#fdfbf7] rounded-2xl border border-[#e8d697]'>
          {data.length === 0 ? (
            <p className='text-xs text-slate-400 text-center py-3'>No skills added yet. Add some above or pick from suggested skills below.</p>
          ) : (
            <div className='flex flex-wrap gap-2'>
              {data.map((skill, index) => (
                <span
                  key={index}
                  className='inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffefb3] border border-[#e8d697] text-[#013e37] rounded-full text-xs font-bold shadow-2xs'
                >
                  {skill}
                  <button
                    type='button'
                    onClick={() => removeSkill(index)}
                    className='text-[#013e37]/60 hover:text-red-600 transition cursor-pointer'
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggested Skills Section */}
      <div className='space-y-2 pt-2 border-t border-gray-200'>
        <div className='flex items-center gap-1.5 text-xs font-bold text-[#013e37]'>
          <Sparkles className='size-3.5 text-[#013e37]' />
          <span>Quick Suggestions (Click to Add)</span>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {SUGGESTED_SKILLS.filter(s => !data.includes(s)).slice(0, 15).map((suggestion, i) => (
            <button
              key={i}
              type='button'
              onClick={() => addSkill(suggestion)}
              className='px-2.5 py-1 text-xs bg-[#ffefb3]/60 text-[#013e37] hover:bg-[#ffefb3] rounded-lg border border-[#e8d697] transition cursor-pointer font-medium'
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;

import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    const newEdu = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: ""
    };
    onChange([...data, newEdu]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-bold text-[#013e37]'>Education</h3>
          <p className='text-xs text-slate-500'>Add Your Academic Background</p>
        </div>
        <button
          type='button'
          onClick={addEducation}
          className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#013e37] text-[#ffefb3] rounded-xl hover:bg-[#012a25] transition-colors cursor-pointer font-bold border border-[#ffefb3]/30 shadow-xs'
        >
          <Plus className='size-3.5' />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-slate-500'>
          <GraduationCap className='w-12 h-12 mx-auto mb-3 text-slate-300' />
          <p className="text-sm font-semibold">No education details added yet.</p>
          <p className='text-xs text-slate-400'>Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((edu, index) => (
            <div key={index} className='p-4 border border-[#e8d697] rounded-2xl space-y-3 bg-[#fdfbf7]'>
              <div className='flex justify-between items-center pb-2 border-b border-gray-200'>
                <h4 className='font-bold text-xs text-[#013e37]'>Education #{index + 1}</h4>
                <button
                  type='button'
                  onClick={() => removeEducation(index)}
                  className='text-red-500 hover:text-red-700 p-1 transition cursor-pointer'
                  title='Remove education'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>School / University</label>
                  <input
                    value={edu.institution || ""}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    type="text"
                    placeholder='e.g. Stanford University'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Degree</label>
                  <input
                    value={edu.degree || ""}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    type="text"
                    placeholder='e.g. Bachelor of Science, B.Tech, M.S.'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>
              </div>

              <div className='grid md:grid-cols-3 gap-3'>
                <div className='md:col-span-1'>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Field of Study</label>
                  <input
                    value={edu.field || ""}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    type="text"
                    placeholder='e.g. Computer Science'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div className='md:col-span-1'>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Graduation Date</label>
                  <input
                    value={edu.graduation_date || ""}
                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                    type="month"
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div className='md:col-span-1'>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>GPA / Grade (Optional)</label>
                  <input
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                    type="text"
                    placeholder='e.g. 3.8 / 4.0'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;

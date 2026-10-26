import { FolderIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-bold text-[#013e37]'>Projects</h3>
          <p className='text-xs text-slate-500'>Add Your Notable Projects</p>
        </div>
        <button
          type='button'
          onClick={addProject}
          className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#013e37] text-[#ffefb3] rounded-xl hover:bg-[#012a25] transition-colors cursor-pointer font-bold border border-[#ffefb3]/30 shadow-xs'
        >
          <Plus className='size-3.5' />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-slate-500'>
          <FolderIcon className='w-12 h-12 mx-auto mb-3 text-slate-300' />
          <p className="text-sm font-semibold">No projects added yet.</p>
          <p className='text-xs text-slate-400'>Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((project, index) => (
            <div key={index} className='p-4 border border-[#e8d697] rounded-2xl space-y-3 bg-[#fdfbf7]'>
              <div className='flex justify-between items-center pb-2 border-b border-gray-200'>
                <h4 className='font-bold text-xs text-[#013e37]'>Project #{index + 1}</h4>
                <button
                  type='button'
                  onClick={() => removeProject(index)}
                  className='text-red-500 hover:text-red-700 p-1 transition cursor-pointer'
                  title='Remove project'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Project Name</label>
                  <input
                    value={project.name || ""}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    type="text"
                    placeholder='e.g. Task Management App'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>

                <div>
                  <label className='block text-xs font-bold text-slate-700 mb-1'>Project Type / Tech</label>
                  <input
                    value={project.type || ""}
                    onChange={(e) => updateProject(index, "type", e.target.value)}
                    type="text"
                    placeholder='e.g. Full Stack Web App (React + Node.js)'
                    className='w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none'
                  />
                </div>
              </div>

              <div className='space-y-1'>
                <label className='block text-xs font-bold text-slate-700'>Project Description</label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  rows={3}
                  placeholder='Describe the problem solved, tech stack, key features, and achievements...'
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

export default ProjectsForm;

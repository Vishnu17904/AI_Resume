import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A clean, traditional resume format with clear sections and professional typography"
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with strategic use of color and modern font choices"
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a single image and clean typography"
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center"
    },
  ];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1.5 text-xs font-bold text-[#013e37] bg-[#ffefb3] hover:bg-[#f5dc8c] border border-[#e8d697] transition-all px-3 py-1.5 rounded-xl cursor-pointer shadow-2xs'
      >
        <Layout size={14} className="stroke-[#013e37]" />
        <span>Template</span>
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 w-72 p-3 mt-2 space-y-2.5 z-20 bg-white rounded-2xl border border-[#e8d697] shadow-xl'>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-xl cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-[#013e37] bg-[#ffefb3]/50"
                  : "border-gray-200 hover:border-[#013e37]/40 hover:bg-gray-50"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className='absolute top-2.5 right-2.5'>
                  <div className='size-4 bg-[#013e37] rounded-full flex items-center justify-center'>
                    <Check className='w-2.5 h-2.5 text-[#ffefb3]' />
                  </div>
                </div>
              )}

              <div className='space-y-1'>
                <h4 className='font-bold text-xs text-[#013e37]'>{template.name}</h4>
                <div className='mt-1 p-2 bg-white/80 rounded-lg text-[11px] text-slate-500 leading-snug border border-gray-100'>{template.preview}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;

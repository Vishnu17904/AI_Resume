import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react';

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Forest", value: "#013e37" },
    { name: "Emerald", value: "#02574e" },
    { name: "Teal", value: "#0d9488" },
    { name: "Blue", value: "#2563eb" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Purple", value: "#7c3aed" },
    { name: "Amber", value: "#d97706" },
    { name: "Slate", value: "#334155" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1.5 text-xs font-bold text-[#013e37] bg-[#ffefb3] hover:bg-[#f5dc8c] border border-[#e8d697] transition-all px-3 py-1.5 rounded-xl cursor-pointer shadow-2xs'
      >
        <Palette size={14} className="stroke-[#013e37]" />
        <span className='max-sm:hidden'>Color</span>
      </button>

      {isOpen && (
        <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 p-3 mt-2 z-20 bg-white rounded-2xl border border-[#e8d697] shadow-xl'>
          {colors.map((color) => (
            <div
              key={color.value}
              className='relative cursor-pointer group flex flex-col items-center'
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className='size-10 rounded-full border-2 border-white shadow-xs group-hover:scale-105 transition-all'
                style={{ backgroundColor: color.value }}
              />
              {selectedColor === color.value && (
                <div className='absolute top-0 left-0 right-0 bottom-4 flex items-center justify-center pointer-events-none'>
                  <Check className='size-4 text-white' />
                </div>
              )}
              <p className='text-[10px] text-center mt-1 text-slate-600 font-medium'>{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

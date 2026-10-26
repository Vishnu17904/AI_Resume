import { BriefcaseBusiness, Globe, Linkedin, Loader2, Mail, MapPin, Phone, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';
import { uploadService } from '../services/api';

const PersonalInfoForm = ({ data = {}, onChange, removeBackground, setRemoveBackground }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);

    try {
      const res = await uploadService.uploadImage(file, removeBackground);
      if (res.data && res.data.url) {
        handleChange('image', res.data.url);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      // Local preview fallback if backend upload fails
      handleChange('image', URL.createObjectURL(file));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveBackgroundToggle = async () => {
    const nextVal = !removeBackground;
    setRemoveBackground(nextVal);

    if (selectedFile) {
      setUploading(true);
      try {
        const res = await uploadService.uploadImage(selectedFile, nextVal);
        if (res.data && res.data.url) {
          handleChange('image', res.data.url);
        }
      } catch (err) {
        console.error('Background removal re-upload failed:', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    handleChange('image', '');
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className='text-lg font-bold text-[#013e37]'>Personal Information</h3>
      <p className='text-xs text-slate-500'>Get Started With Personal Information</p>
      
      <div className='flex items-center gap-4 mt-5'>
        <label className='relative cursor-pointer group'>
          {uploading ? (
            <div className='w-16 h-16 rounded-full flex items-center justify-center bg-[#ffefb3]/40 ring ring-[#e8d697]'>
              <Loader2 className='size-6 animate-spin text-[#013e37]' />
            </div>
          ) : data.image ? (
            <div className='relative'>
              <img
                src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                alt="user-image"
                className='w-16 h-16 rounded-full object-cover ring-2 ring-[#013e37] group-hover:opacity-80 transition'
              />
            </div>
          ) : (
            <div className='inline-flex items-center gap-2 text-[#013e37] hover:text-[#012a25] transition'>
              <User className='size-10 p-2.5 border border-[#e8d697] bg-[#ffefb3]/50 rounded-full text-[#013e37]' />
              <span className='text-xs font-bold'>Upload User Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className='hidden'
            onChange={handleImageSelect}
          />
        </label>

        {data.image && !uploading && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className='text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer'
          >
            <Trash2 size={13} /> Remove
          </button>
        )}

        {selectedFile && (
          <div className='flex flex-col gap-1 pl-4 text-sm border-l border-gray-200'>
            <p className='text-xs text-gray-600 font-medium'>Remove Background</p>
            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
              <input
                type="checkbox"
                className='sr-only peer'
                onChange={handleRemoveBackgroundToggle}
                checked={removeBackground}
              />
              <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-[#013e37] transition-colors duration-200'></div>
              <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className='space-y-1 mt-4'>
            <label className='flex items-center gap-2 text-xs font-bold text-[#013e37]'>
              <Icon className='size-3.5 text-[#013e37]' />
              {field.label}
              {field.required && <span className='text-red-500'>*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className='mt-1 w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none transition-colors text-sm bg-white'
              placeholder={`Enter Your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;

import { FilePenLineIcon, Loader2, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';
import { useAuth } from '../context/useAuth';
import { dummyResumeData } from '../assets/assets';

const Dashboard = () => {
  const colors = ["#013e37", "#02544a", "#03695d", "#012a25", "#01453d"];
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const loadAllResumes = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getResumes();
      if (res.data && Array.isArray(res.data.resumes)) {
        setAllResumes(res.data.resumes);
      } else {
        setAllResumes([]);
      }
    } catch (err) {
      console.warn('API getResumes failed, loading local fallback:', err.message);
      setAllResumes(dummyResumeData);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await resumeService.createResume({ title: title.trim() });
      if (res.data && res.data.resume) {
        setShowCreateResume(false);
        setTitle('');
        navigate(`/app/builder/${res.data.resume._id}`);
      }
    } catch (err) {
      console.error('Failed to create resume:', err);
      setErrorMessage(err.message || 'Failed to create resume');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      setErrorMessage('Please select a PDF resume file');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('title', title.trim() || resumeFile.name.replace(/\.[^/.]+$/, ''));

      const res = await resumeService.uploadResumePdf(formData);
      if (res.data && res.data.resume) {
        setShowUploadResume(false);
        setTitle('');
        setResumeFile(null);
        navigate(`/app/builder/${res.data.resume._id}`);
      }
    } catch (err) {
      console.error('Failed to upload and parse resume:', err);
      setErrorMessage(err.message || 'Failed to upload and parse resume');
    } finally {
      setSubmitting(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    if (!title.trim() || !editResumeId) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      await resumeService.updateTitle(editResumeId, title.trim());
      setAllResumes(prev =>
        prev.map(r => (r._id === editResumeId ? { ...r, title: title.trim() } : r))
      );
      setEditResumeId('');
      setTitle('');
    } catch (err) {
      console.error('Failed to edit title:', err);
      setErrorMessage(err.message || 'Failed to update title');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?');
    if (confirm) {
      try {
        await resumeService.deleteResume(resumeId);
        setAllResumes(prev => prev.filter(r => r._id !== resumeId));
      } catch (err) {
        console.error('Failed to delete resume:', err);
        setAllResumes(prev => prev.filter(r => r._id !== resumeId));
      }
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="bg-[#fdfbf7] min-h-[calc(100vh-65px)]">
      <div className='max-w-7xl mx-auto px-4 py-7'>
        <p className='text-2xl font-bold mb-6 text-[#013e37] sm:hidden'>
          Welcome, {user?.name || 'User'}
        </p>

        {/* Action Buttons */}
        <div className='flex gap-5'>
          <button
            onClick={() => {
              setTitle('');
              setErrorMessage('');
              setShowCreateResume(true);
            }}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 text-slate-600 border border-dashed border-[#e8d697] group hover:border-[#013e37] hover:bg-[#ffefb3]/30 hover:shadow-md transition-all duration-300 cursor-pointer'
          >
            <div className="size-11 transition-all duration-300 flex items-center justify-center bg-[#013e37] text-[#ffefb3] rounded-full group-hover:scale-110 shadow-xs">
              <PlusIcon className='size-6' />
            </div>
            <p className='text-xs font-bold text-[#013e37] transition-all duration-300'>Create Resume</p>
          </button>

          <button
            onClick={() => {
              setTitle('');
              setResumeFile(null);
              setErrorMessage('');
              setShowUploadResume(true);
            }}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 text-slate-600 border border-dashed border-[#e8d697] group hover:border-[#013e37] hover:bg-[#ffefb3]/30 hover:shadow-md transition-all duration-300 cursor-pointer'
          >
            <div className="size-11 transition-all duration-300 flex items-center justify-center bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-full group-hover:scale-110 shadow-xs">
              <UploadCloudIcon className='size-6' />
            </div>
            <p className='text-xs font-bold text-[#013e37] transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-[#e8d697]/70 my-6 sm:w-[305px]' />

        {/* Resumes List Grid */}
        {loading ? (
          <div className='flex items-center gap-2 py-10 text-slate-500 text-sm'>
            <Loader2 className='size-5 animate-spin text-[#013e37]' />
            <span>Loading your resumes...</span>
          </div>
        ) : allResumes.length === 0 ? (
          <div className='py-8 text-slate-500 text-sm'>
            No resumes yet. Click <strong className="text-[#013e37]">"Create Resume"</strong> or <strong className="text-[#013e37]">"Upload Existing"</strong> to get started.
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
            {allResumes.map((resumeItem, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resumeItem._id || index}
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-2xl gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:border-[#013e37]'
                  style={{
                    borderColor: '#e8d697'
                  }}
                >
                  <div className="size-11 rounded-xl flex items-center justify-center bg-[#ffefb3]/60 group-hover:bg-[#ffefb3] transition-colors">
                    <FilePenLineIcon className="size-6 text-[#013e37] group-hover:scale-105 transition-all" />
                  </div>
                  <p className='text-xs font-bold text-[#013e37] group-hover:scale-105 transition-all px-2 text-center truncate w-full'>
                    {resumeItem.title}
                  </p>

                  <p className='absolute bottom-2 text-[10px] text-slate-400 group-hover:text-slate-600 transition-all duration-300 px-2 text-center'>
                    {resumeItem.updatedAt ? new Date(resumeItem.updatedAt).toLocaleDateString() : 'Draft'}
                  </p>

                  <div onClick={e => e.stopPropagation()} className='absolute top-1.5 right-1.5 flex sm:hidden sm:group-hover:flex items-center'>
                    <TrashIcon
                      onClick={() => deleteResume(resumeItem._id)}
                      className='size-7 p-1.5 bg-white shadow-xs hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors cursor-pointer border border-gray-200 mr-1'
                      title='Delete resume'
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resumeItem._id);
                        setTitle(resumeItem.title);
                        setErrorMessage('');
                      }}
                      className='size-7 p-1.5 bg-white shadow-xs hover:bg-[#ffefb3] rounded-lg text-slate-500 hover:text-[#013e37] transition-colors cursor-pointer border border-gray-200'
                      title='Rename resume'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Create Resume */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4'
          >
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-[#e8d697] shadow-xl rounded-3xl w-full max-w-sm p-6'>
              <h2 className='text-xl text-[#013e37] font-bold mb-4'>Create a Resume</h2>
              {errorMessage && (
                <div className='mb-3 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200'>
                  {errorMessage}
                </div>
              )}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Enter Resume Title'
                className='w-full text-slate-800 px-4 py-2.5 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none text-sm'
                required
                autoFocus
              />

              <button
                type='submit'
                disabled={submitting}
                className='w-full py-3 bg-[#013e37] text-[#ffefb3] font-bold rounded-xl hover:bg-[#012a25] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm shadow-xs'
              >
                {submitting && <Loader2 className='size-4 animate-spin' />}
                <span>{submitting ? 'Creating...' : 'Create Resume'}</span>
              </button>
              <XIcon
                className='absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors'
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {/* Modal: Upload Resume */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4'
          >
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-[#e8d697] shadow-xl rounded-3xl w-full max-w-sm p-6'>
              <h2 className='text-xl text-[#013e37] font-bold mb-4'>Upload & Parse Resume</h2>
              {errorMessage && (
                <div className='mb-3 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200'>
                  {errorMessage}
                </div>
              )}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Enter Resume Title (Optional)'
                className='w-full text-slate-800 px-4 py-2.5 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none text-sm'
              />

              <div>
                <label htmlFor="Resume-Input" className='block text-xs font-semibold text-slate-700 mb-1 cursor-pointer'>
                  Select Resume PDF File
                  <div className='flex flex-col items-center justify-center gap-2 border border-[#e8d697] border-dashed rounded-2xl p-6 my-2 hover:border-[#013e37] hover:bg-[#ffefb3]/30 transition-colors bg-[#fdfbf7]'>
                    {resumeFile ? (
                      <p className='text-[#013e37] font-bold text-sm break-all text-center'>{resumeFile.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-10 stroke-1 text-[#013e37]' />
                        <p className='text-xs text-slate-500 font-medium'>Click to browse PDF</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id='Resume-Input'
                  accept='.pdf,application/pdf'
                  className='hidden'
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) {
                      setResumeFile(f);
                      if (!title) {
                        setTitle(f.name.replace(/\.[^/.]+$/, ''));
                      }
                    }
                  }}
                  required
                />
              </div>

              <button
                type='submit'
                disabled={submitting}
                className='w-full py-3 mt-2 bg-[#013e37] text-[#ffefb3] font-bold rounded-xl hover:bg-[#012a25] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm shadow-xs'
              >
                {submitting && <Loader2 className='size-4 animate-spin' />}
                <span>{submitting ? 'Parsing & Creating...' : 'Upload & Parse Resume'}</span>
              </button>
              <XIcon
                className='absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors'
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle('');
                  setResumeFile(null);
                }}
              />
            </div>
          </form>
        )}

        {/* Modal: Edit Title */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4'
          >
            <div onClick={e => e.stopPropagation()} className='relative bg-white border border-[#e8d697] shadow-xl rounded-3xl w-full max-w-sm p-6'>
              <h2 className='text-xl text-[#013e37] font-bold mb-4'>Edit Resume Title</h2>
              {errorMessage && (
                <div className='mb-3 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200'>
                  {errorMessage}
                </div>
              )}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Enter Resume Title'
                className='w-full text-slate-800 px-4 py-2.5 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] outline-none text-sm'
                required
                autoFocus
              />

              <button
                type='submit'
                disabled={submitting}
                className='w-full py-3 bg-[#013e37] text-[#ffefb3] font-bold rounded-xl hover:bg-[#012a25] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm shadow-xs'
              >
                {submitting && <Loader2 className='size-4 animate-spin' />}
                <span>{submitting ? 'Updating...' : 'Update Title'}</span>
              </button>
              <XIcon
                className='absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors'
                onClick={() => {
                  setEditResumeId('');
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

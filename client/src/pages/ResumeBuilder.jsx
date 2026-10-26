import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  FileText,
  FolderIcon,
  Globe,
  GraduationCap,
  Loader2,
  Lock,
  Save,
  Sparkles,
  User
} from 'lucide-react';
import { resumeService } from '../services/api';
import { dummyResumeData } from '../assets/assets';

import PersonalInfoForm from '../components/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: 'My Resume',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#013e37',
    public: false
  });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [copied, setCopied] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const isInitialMount = useRef(true);
  const saveTimeoutRef = useRef(null);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  // Load Existing Resume
  const loadExistingResume = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await resumeService.getResume(resumeId);
      if (res.data && res.data.resume) {
        setResumeData(res.data.resume);
        document.title = `${res.data.resume.title} - Resume Builder`;
      }
    } catch (err) {
      console.warn('Could not load from API, checking fallback dummy data:', err.message);
      const fallback = dummyResumeData.find(r => r._id === resumeId);
      if (fallback) {
        setResumeData(fallback);
        document.title = `${fallback.title} - Resume Builder`;
      } else {
        setLoadError(err.response?.data?.message || 'Resume not found or you do not have permission to view it.');
      }
    } finally {
      setLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    loadExistingResume();
  }, [loadExistingResume]);

  // Save changes to backend
  const saveResumeToBackend = useCallback(async (dataToSave) => {
    if (!resumeId) return;
    setSaveStatus('saving');
    try {
      await resumeService.updateResume(resumeId, dataToSave);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error('Autosave error:', err);
      setSaveStatus('error');
    }
  }, [resumeId]);

  // Debounced autosave on resumeData change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (loading) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveResumeToBackend(resumeData);
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData, saveResumeToBackend, loading]);

  // Toggle Public / Private
  const handleToggleVisibility = async () => {
    try {
      setResumeData(prev => ({ ...prev, public: !prev.public }));
      const res = await resumeService.toggleVisibility(resumeId);
      if (res.data) {
        setResumeData(prev => ({ ...prev, public: res.data.public }));
      }
    } catch (err) {
      console.error('Toggle visibility error:', err);
      setResumeData(prev => ({ ...prev, public: !prev.public }));
    }
  };

  // Copy shareable link
  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/view/${resumeId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print / PDF Download
  const handleDownloadPdf = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-600'>
        <Loader2 className='size-8 animate-spin text-[#013e37]' />
        <p className='text-sm font-medium'>Loading your resume...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center p-4'>
        <div className='max-w-md w-full bg-white p-8 rounded-3xl border border-[#e8d697] text-center space-y-4 shadow-sm'>
          <div className='size-14 mx-auto bg-red-50 text-red-600 rounded-full flex items-center justify-center'>
            <Lock className='size-7' />
          </div>
          <h2 className='text-xl font-bold text-[#013e37]'>Access Restricted</h2>
          <p className='text-xs text-slate-500 leading-relaxed'>{loadError}</p>
          <div className='pt-2'>
            <Link
              to='/app'
              className='inline-flex items-center gap-2 px-6 py-2.5 bg-[#013e37] text-[#ffefb3] rounded-full text-xs font-bold hover:bg-[#012a25] active:scale-95 transition shadow-xs border border-[#ffefb3]/30'
            >
              <ArrowLeftIcon className='size-4' /> Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      {/* Top Breadcrumb & Status Bar */}
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between print:hidden'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-[#013e37] hover:underline transition-all text-sm font-bold'>
          <ArrowLeftIcon className='size-4' /> Back To Dashboard
        </Link>

        {/* Save status badge */}
        <div className='flex items-center gap-3 text-xs'>
          {saveStatus === 'saving' && (
            <span className='inline-flex items-center gap-1.5 text-[#013e37] bg-[#ffefb3]/60 px-3 py-1 rounded-full border border-[#e8d697] font-semibold'>
              <Loader2 className='size-3 animate-spin text-[#013e37]' /> Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className='inline-flex items-center gap-1 text-[#013e37] bg-[#ffefb3] border border-[#e8d697] px-3 py-1 rounded-full font-bold'>
              <Check className='size-3' /> Auto-Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className='text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200'>
              Failed to save
            </span>
          )}
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-12'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Forms */}
          <div className='relative lg:col-span-5 rounded-2xl overflow-hidden print:hidden'>
            <div className='bg-white rounded-2xl shadow-sm border border-[#e8d697] p-6 pt-2'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-100' />
              <hr
                className='absolute top-0 left-0 h-1.5 bg-[#013e37] border-none transition-all duration-300'
                style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
              />

              {/* Section Navigation & Style Controls */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 py-3">
                <div className='flex items-center gap-2'>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                  />
                </div>

                <div className='flex items-center gap-1'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                      className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#013e37] hover:bg-[#ffefb3]/60 transition-all cursor-pointer'
                    >
                      <ChevronLeft className='size-4' /> Prev
                    </button>
                  )}
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#013e37] hover:bg-[#ffefb3]/60 transition-all cursor-pointer ${
                      activeSectionIndex === sections.length - 1 ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* Step indicator tabs */}
              <div className='flex items-center justify-between gap-1 mb-6 overflow-x-auto pb-2 border-b border-gray-100'>
                {sections.map((sec, idx) => {
                  const Icon = sec.icon;
                  const isActive = idx === activeSectionIndex;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl text-xs transition shrink-0 cursor-pointer ${
                        isActive
                          ? 'text-[#013e37] bg-[#ffefb3] font-bold border border-[#e8d697]'
                          : 'text-slate-500 hover:text-[#013e37] hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`size-4 ${isActive ? 'text-[#013e37]' : 'text-gray-400'}`} />
                      <span>{sec.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content Steps */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info || {}}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary || ''}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                    resumeData={resumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectsForm
                    data={resumeData.project || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview & Actions */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            {/* Top Preview Action Bar */}
            <div className='bg-white p-3 rounded-2xl border border-[#e8d697] shadow-xs mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden'>
              <div className='flex items-center gap-2'>
                {/* Public / Private Toggle */}
                <button
                  type='button'
                  onClick={handleToggleVisibility}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    resumeData.public
                      ? 'bg-[#ffefb3] text-[#013e37] border-[#e8d697] hover:bg-[#f5dc8c]'
                      : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  title={resumeData.public ? 'Publicly accessible' : 'Private to you'}
                >
                  {resumeData.public ? <Globe className='size-3.5' /> : <Lock className='size-3.5' />}
                  <span>{resumeData.public ? 'Public' : 'Private'}</span>
                </button>

                {/* Share Link Copy */}
                {resumeData.public && (
                  <button
                    type='button'
                    onClick={handleCopyShareLink}
                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#ffefb3]/60 text-[#013e37] border border-[#e8d697] hover:bg-[#ffefb3] transition cursor-pointer'
                  >
                    {copied ? <Check className='size-3.5 text-green-600' /> : <Copy className='size-3.5' />}
                    <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
                  </button>
                )}

                {/* Direct View in New Tab */}
                {resumeData.public && (
                  <Link
                    to={`/view/${resumeId}`}
                    target='_blank'
                    className='flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#013e37] hover:bg-[#ffefb3]/40 transition'
                    title='Open public view in new tab'
                  >
                    <Eye className='size-3.5' />
                    <span className='max-sm:hidden'>View</span>
                  </Link>
                )}
              </div>

              <div className='flex items-center gap-2'>
                {/* Manual Save Button */}
                <button
                  type='button'
                  onClick={() => saveResumeToBackend(resumeData)}
                  className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#013e37] border border-[#013e37]/30 hover:bg-[#ffefb3]/40 transition cursor-pointer'
                >
                  <Save className='size-3.5' />
                  <span>Save</span>
                </button>

                {/* Download PDF Button */}
                <button
                  type='button'
                  onClick={handleDownloadPdf}
                  className='flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#013e37] text-[#ffefb3] hover:bg-[#012a25] transition cursor-pointer shadow-xs active:scale-95 border border-[#ffefb3]/40'
                >
                  <Download className='size-3.5' />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Live Resume Preview */}
            <div className='shadow-sm rounded-2xl overflow-hidden bg-white border border-[#e8d697]/50'>
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Download, Loader2, Lock } from 'lucide-react';
import { resumeService } from '../services/api';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPublicResume = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await resumeService.getPublicResume(resumeId);
        if (res.data && res.data.resume) {
          setResumeData(res.data.resume);
          document.title = `${res.data.resume.title} - View Resume`;
        }
      } catch (err) {
        console.warn('API getPublicResume failed, checking dummy fallback:', err.message);
        const fallback = dummyResumeData.find(r => r._id === resumeId);
        if (fallback) {
          setResumeData(fallback);
          document.title = `${fallback.title} - View Resume`;
        } else {
          setError(err.message || 'Resume is private or does not exist');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [resumeId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-3 bg-[#fdfbf7] text-slate-600'>
        <Loader2 className='size-8 animate-spin text-[#013e37]' />
        <p className='text-sm font-bold text-[#013e37]'>Loading resume preview...</p>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#fdfbf7] p-4'>
        <div className='max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-[#e8d697] text-center space-y-4'>
          <div className='size-14 mx-auto bg-amber-50 rounded-full flex items-center justify-center text-amber-600'>
            <Lock className='size-7' />
          </div>
          <h2 className='text-xl font-bold text-[#013e37]'>Resume Unavailable</h2>
          <p className='text-sm text-slate-500'>
            {error || 'This resume is currently set to private or does not exist.'}
          </p>
          <div className='pt-2'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 px-6 py-2.5 bg-[#013e37] text-[#ffefb3] rounded-full text-xs font-bold hover:bg-[#012a25] transition border border-[#ffefb3]/30'
            >
              <ArrowLeft className='size-4' /> Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#fdfbf7]'>
      {/* Top Floating Action Bar */}
      <header className='sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e8d697] px-4 py-3 shadow-xs print:hidden'>
        <div className='max-w-6xl mx-auto flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <Link to='/' className='flex items-center gap-2 text-slate-700 hover:text-slate-900 transition'>
              <img src='/logo.svg' alt='Logo' className='h-8 w-auto' />
            </Link>
            <div className='h-4 w-px bg-gray-300 max-sm:hidden'></div>
            <span className='text-sm font-bold text-[#013e37] max-sm:hidden truncate max-w-xs'>
              {resumeData.title}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={handleCopyLink}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#ffefb3]/60 hover:bg-[#ffefb3] text-[#013e37] border border-[#e8d697] transition cursor-pointer'
            >
              {copied ? <Check className='size-3.5 text-green-600' /> : <Copy className='size-3.5' />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className='flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#013e37] hover:bg-[#012a25] text-[#ffefb3] shadow-xs transition active:scale-95 cursor-pointer border border-[#ffefb3]/30'
            >
              <Download className='size-3.5' />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Public Resume Content */}
      <main className='max-w-5xl mx-auto p-4 sm:p-8'>
        <div className='bg-white shadow-md rounded-2xl overflow-hidden border border-[#e8d697]/50'>
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>
      </main>
    </div>
  );
};

export default Preview;

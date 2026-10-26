import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const CallToAction = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div id='cta' className='border-y border-dashed border-[#e8d697] w-full max-w-5xl mx-auto px-10 sm:px-16 mt-20'>
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-[#e8d697] py-16 sm:py-20 -mt-10 -mb-10 w-full bg-[#ffefb3]/20 rounded-3xl">
        <p className="text-xl md:text-2xl font-bold max-w-md text-[#013e37] leading-snug">
          Build A Professional Resume That Helps You Stand Out And Get Hired.
        </p>
        <Link
          to={isAuthenticated ? '/app' : '/login?state=register'}
          className="flex items-center gap-2 rounded-full py-3.5 px-8 bg-[#013e37] hover:bg-[#012a25] transition-all text-[#ffefb3] active:scale-95 shadow-md font-bold text-sm border border-[#ffefb3]/40"
        >
          <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;

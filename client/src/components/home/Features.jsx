import React from 'react';
import { Download, FileCheck, Sparkles, Zap } from 'lucide-react';
import Title from './Title';

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div id='features' className='flex flex-col items-center my-14 scroll-mt-12'>
      <div className="flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide">
        <Zap width={14} className="fill-[#013e37]" />
        <span>SIMPLE PROCESS</span>
      </div>
      <Title
        title='Build Your Resume in Minutes'
        description='Our streamlined editor helps you craft a high-impact, professional resume with intelligent AI tools and ATS-ready templates.'
      />

      <div className="flex flex-col md:flex-row items-center justify-center xl:mt-10 mt-6">
        <img
          className="max-w-2xl w-full xl:-ml-32 drop-shadow-md rounded-2xl"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Resume Builder Features"
        />
        <div className="px-4 md:px-0 space-y-4" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className={`p-6 group-hover:bg-[#ffefb3]/60 border border-transparent group-hover:border-[#e8d697] flex gap-4 rounded-2xl transition-all ${!isHover ? 'border-[#e8d697] bg-[#ffefb3]/60' : ''}`}>
              <div className="size-11 rounded-xl bg-[#013e37] text-[#ffefb3] flex items-center justify-center shrink-0">
                <Sparkles className="size-5 stroke-[#ffefb3]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#013e37]">AI-Powered Enhancements</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Generate punchy summaries and action-oriented experience bullets tailored to your target job.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-[#ffefb3]/60 border border-transparent group-hover:border-[#e8d697] flex gap-4 rounded-2xl transition-all">
              <div className="size-11 rounded-xl bg-[#013e37] text-[#ffefb3] flex items-center justify-center shrink-0">
                <FileCheck className="size-5 stroke-[#ffefb3]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#013e37]">ATS-Optimized Templates</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Choose from modern, clean designs engineered to pass Applicant Tracking Systems with ease.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-[#ffefb3]/60 border border-transparent group-hover:border-[#e8d697] flex gap-4 rounded-2xl transition-all">
              <div className="size-11 rounded-xl bg-[#013e37] text-[#ffefb3] flex items-center justify-center shrink-0">
                <Download className="size-5 stroke-[#ffefb3]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#013e37]">Instant PDF & Sharing</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Download print-perfect Letter-size PDFs or share live public links directly with hiring managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

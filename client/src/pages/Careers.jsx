import React from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { Briefcase, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobs = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Help us scale our AI-driven resume generation platform, modern React architecture, and high-performance microservices.'
    },
    {
      title: 'AI / Prompt Engineer',
      department: 'AI Research',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Develop structured parsing prompts and semantic career matching pipelines powered by Gemini and LLMs.'
    },
    {
      title: 'Senior Product Designer (UI/UX)',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design world-class resume templates, intuitive multi-step builder forms, and mobile responsive experiences.'
    },
    {
      title: 'Customer Success & Career Coach',
      department: 'Operations',
      location: 'Remote',
      type: 'Part-time / Full-time',
      description: 'Support job seekers in creating high-converting resumes and gather continuous feedback for our product team.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 text-slate-700">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide mb-3">
            <Briefcase width={14} className="stroke-[#013e37]" />
            <span>WE ARE HIRING</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#013e37] tracking-tight">Join Our Mission to Empower Careers</h1>
          <p className="text-slate-600 mt-3 text-base">
            We are building next-generation career tools that help millions of candidates stand out and land their dream jobs.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] shadow-xs">
            <CheckCircle2 className="size-6 text-[#013e37] mb-2" />
            <h3 className="font-bold text-[#013e37]">100% Remote-First</h3>
            <p className="text-xs text-slate-500 mt-1">Work from anywhere in the world with flexible hours and autonomy.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] shadow-xs">
            <CheckCircle2 className="size-6 text-[#013e37] mb-2" />
            <h3 className="font-bold text-[#013e37]">Competitive Pay & Equity</h3>
            <p className="text-xs text-slate-500 mt-1">Top-tier compensation packages, health benefits, and meaningful equity.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] shadow-xs">
            <CheckCircle2 className="size-6 text-[#013e37] mb-2" />
            <h3 className="font-bold text-[#013e37]">Learning & Wellness Budget</h3>
            <p className="text-xs text-slate-500 mt-1">Annual stipend for books, conferences, equipment, and health wellness.</p>
          </div>
        </div>

        {/* Job Listings */}
        <h2 className="text-2xl font-extrabold text-[#013e37] mb-6">Open Positions</h2>
        <div className="space-y-4 mb-12">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#e8d697] shadow-xs hover:border-[#013e37] hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#013e37]">{job.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ffefb3] text-[#013e37] border border-[#e8d697]">{job.department}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="size-3.5 text-[#013e37]" /> {job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>

              <Link
                to="/contact?subject=Career Application"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#013e37] hover:bg-[#012a25] active:scale-95 text-[#ffefb3] rounded-xl text-sm font-bold transition shrink-0 border border-[#ffefb3]/30 shadow-xs"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;

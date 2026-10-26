import React from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { Award, Compass, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 text-slate-700">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide mb-3">
            <Compass width={14} className="stroke-[#013e37]" />
            <span>OUR STORY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#013e37] tracking-tight">
            Empowering Job Seekers with Modern Technology
          </h1>
          <p className="text-slate-600 mt-4 text-base md:text-lg">
            Resume Builder was founded with a single goal: make career progression accessible, effortless, and fast for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] text-center shadow-xs">
            <p className="text-3xl font-extrabold text-[#013e37]">50K+</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Resumes Created</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] text-center shadow-xs">
            <p className="text-3xl font-extrabold text-[#013e37]">94%</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Interview Rate</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] text-center shadow-xs">
            <p className="text-3xl font-extrabold text-[#013e37]">120+</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Countries</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8d697] text-center shadow-xs">
            <p className="text-3xl font-extrabold text-[#013e37]">4.9/5</p>
            <p className="text-xs text-slate-500 mt-1 font-semibold">User Rating</p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#e8d697] shadow-xs mb-16">
          <h2 className="text-2xl font-extrabold text-[#013e37] mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="size-11 bg-[#ffefb3] text-[#013e37] rounded-xl flex items-center justify-center border border-[#e8d697]">
                <Award className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-[#013e37]">Excellence by Default</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We obsess over ATS compatibility, typographic precision, and high-impact layout designs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="size-11 bg-[#ffefb3] text-[#013e37] rounded-xl flex items-center justify-center border border-[#e8d697]">
                <Users className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-[#013e37]">User First</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your data is private, your resumes belong to you, and we build what directly helps you get hired.
              </p>
            </div>

            <div className="space-y-3">
              <div className="size-11 bg-[#ffefb3] text-[#013e37] rounded-xl flex items-center justify-center border border-[#e8d697]">
                <Heart className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-[#013e37]">Continuous Innovation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Leveraging the latest AI models to transform messy experience notes into compelling job bullets.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#013e37] rounded-3xl p-8 md:p-12 text-white text-center shadow-lg border border-[#ffefb3]/30">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#ffefb3] mb-3">Ready to Create Your Winning Resume?</h2>
          <p className="text-emerald-100 text-sm md:text-base max-w-xl mx-auto mb-6">
            Join thousands of job seekers who landed interviews at top tech and enterprise companies.
          </p>
          <Link
            to="/login?state=register"
            className="inline-block px-8 py-3.5 bg-[#ffefb3] hover:bg-[#f5dc8c] text-[#013e37] font-extrabold rounded-full active:scale-95 transition shadow-md"
          >
            Get Started Free
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

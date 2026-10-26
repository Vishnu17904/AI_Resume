import React from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#ffefb3] text-[#013e37] rounded-2xl border border-[#e8d697]">
            <ShieldCheck className="size-6 text-[#013e37]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#013e37]">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Last updated: August 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#e8d697] space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">1. Information We Collect</h2>
            <p className="text-sm text-slate-600">
              When you create an account or build a resume, we collect information you provide directly to us: your name, email address, password hash, and the resume details you choose to include (contact information, work history, education, skills, and projects).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">2. How We Use Your Information</h2>
            <p className="text-sm text-slate-600">
              We use your data solely to provide, personalize, and improve the Resume Builder services:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>To store, update, and format your resumes and profile.</li>
              <li>To generate AI enhancements for professional summaries and job descriptions via secure APIs.</li>
              <li>To provide public share links only when you explicitly enable public sharing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">3. Data Security & Storage</h2>
            <p className="text-sm text-slate-600">
              Your passwords are encrypted using industry-standard bcrypt hashing. Sessions are managed using secure httpOnly authentication cookies. We do not sell or rent your personal resume data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">4. Your Data Rights</h2>
            <p className="text-sm text-slate-600">
              You maintain full ownership of your data. You may delete any resume or completely delete your account at any time directly through your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">5. Contact Us</h2>
            <p className="text-sm text-slate-600">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@resumebuilder.com" className="text-[#013e37] font-bold hover:underline">privacy@resumebuilder.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

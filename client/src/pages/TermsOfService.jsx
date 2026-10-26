import React from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#ffefb3] text-[#013e37] rounded-2xl border border-[#e8d697]">
            <FileText className="size-6 text-[#013e37]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#013e37]">Terms of Service</h1>
            <p className="text-xs text-slate-500">Effective Date: August 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#e8d697] space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm text-slate-600">
              By accessing or using Resume Builder, you agree to be bound by these Terms of Service. If you do not agree to all terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">2. Use of AI Features</h2>
            <p className="text-sm text-slate-600">
              Our AI enhancement features are provided to assist you in formulating professional copy. You are responsible for reviewing and verifying the accuracy and authenticity of all information included on your resume before submitting to employers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">3. User Conduct</h2>
            <p className="text-sm text-slate-600">
              You agree not to use the platform to upload malicious content, attempt unauthorized access to other accounts, or violate applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">4. Intellectual Property</h2>
            <p className="text-sm text-slate-600">
              The content you create remains your intellectual property. The Resume Builder software, templates, branding, and assets belong to Resume Builder and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#013e37] mb-2">5. Termination</h2>
            <p className="text-sm text-slate-600">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;

import React, { useState } from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Everything you need to build, customize, and export a professional ATS-friendly resume.',
      features: [
        'Unlimited Resume Creation',
        'All 4 Professional Templates (Classic, Modern, Minimal, Minimal-Image)',
        'Live Real-time Preview',
        'Instant Letter-size PDF Export',
        'Public Web Sharing Link',
        'Photo Upload & Profile Customization',
        'Standard AI Enhancements (30 requests/day)'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      link: '/login?state=register'
    },
    {
      name: 'Pro Career Plan',
      price: annual ? '$7' : '$9',
      period: annual ? 'per month, billed annually' : 'per month',
      description: 'Advanced AI tooling, unlimited generations, and high-impact career features.',
      features: [
        'Everything in Free Starter',
        'Unlimited Gemini AI Summary & Bullet Enhancements',
        'AI Job-Description Keyword Matcher',
        'Automatic Profile Background Removal',
        'Custom Color Schemes & Font Themes',
        'Dedicated Priority Career Support'
      ],
      buttonText: 'Start 14-Day Free Trial',
      popular: true,
      link: '/login?state=register'
    }
  ];

  const faqs = [
    {
      q: 'Can I truly use the Resume Builder for free?',
      a: 'Yes! The Free Starter plan gives you full access to create, edit, customize, and download print-perfect PDF resumes without paying a dime or entering a credit card.'
    },
    {
      q: 'Are the downloaded PDFs ATS-friendly?',
      a: 'Absolutely. All our templates use semantic, standard typography and layout grids engineered to ensure 100% parseability in Applicant Tracking Systems like Workday, Greenhouse, and Lever.'
    },
    {
      q: 'How does the Gemini AI enhancement work?',
      a: 'Our AI helper takes your raw notes, job titles, and experience drafts and polishes them into impact-oriented bullet points using the XYZ formula (Accomplished X by doing Z).'
    },
    {
      q: 'Can I share my resume with recruiters via link?',
      a: 'Yes. With one toggle, you can make any resume public and get a unique link (e.g. /view/:resumeId) that you can paste on LinkedIn or email directly to hiring managers.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 text-slate-700">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide mb-3">
            <Sparkles width={14} className="stroke-[#013e37]" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#013e37] tracking-tight">Simple, Fair Pricing for Everyone</h1>
          <p className="text-slate-600 mt-2 text-sm">
            Start building your resume for free today, or upgrade to Pro for advanced AI career superpowers.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-xs font-bold ${!annual ? 'text-[#013e37]' : 'text-slate-500'}`}>Monthly Billing</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${annual ? 'bg-[#013e37]' : 'bg-gray-300'}`}
              aria-label="Toggle Billing Interval"
            >
              <div className={`bg-[#ffefb3] size-4 rounded-full shadow-md transform transition duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${annual ? 'text-[#013e37]' : 'text-slate-500'}`}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-full text-[10px] font-extrabold">Save 25%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 border ${plan.popular ? 'border-[#013e37] ring-2 ring-[#013e37]/20 shadow-lg relative' : 'border-[#e8d697] shadow-xs'} flex flex-col justify-between`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#013e37] text-[#ffefb3] text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-xs border border-[#ffefb3]/30">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-2xl font-extrabold text-[#013e37]">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#013e37]">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="size-4.5 text-[#013e37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to={plan.link}
                  className={`w-full block text-center py-3 rounded-xl font-bold text-sm transition active:scale-95 shadow-xs ${
                    plan.popular
                      ? 'bg-[#013e37] text-[#ffefb3] hover:bg-[#012a25] border border-[#ffefb3]/30'
                      : 'bg-[#ffefb3] text-[#013e37] hover:bg-[#f5dc8c] border border-[#e8d697]'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-[#013e37] text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, fidx) => (
              <div key={fidx} className="bg-white rounded-2xl border border-[#e8d697]/70 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === fidx ? null : fidx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-[#013e37] text-sm hover:bg-[#ffefb3]/30 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === fidx ? <ChevronUp className="size-4 shrink-0 text-[#013e37]" /> : <ChevronDown className="size-4 shrink-0 text-[#013e37]" />}
                </button>
                {openFaq === fidx && (
                  <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

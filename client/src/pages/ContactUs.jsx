import React, { useState } from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { Mail, MapPin, MessageSquare, Phone, Send, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ContactUs = () => {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || 'General Inquiry';

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 text-slate-700">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide mb-3">
            <MessageSquare width={14} className="stroke-[#013e37]" />
            <span>CONTACT US</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#013e37] tracking-tight">We’d Love to Hear From You</h1>
          <p className="text-slate-600 mt-2 text-sm">
            Have a question, feedback, or need help with your resume? Our team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#e8d697] shadow-xs space-y-6">
            <h2 className="text-lg font-extrabold text-[#013e37]">Get in Touch</h2>
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-xl bg-[#ffefb3] text-[#013e37] flex items-center justify-center shrink-0 border border-[#e8d697]">
                <Mail className="size-4.5 text-[#013e37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#013e37]">Email Support</p>
                <p className="text-xs text-slate-500">support@resumebuilder.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-9 rounded-xl bg-[#ffefb3] text-[#013e37] flex items-center justify-center shrink-0 border border-[#e8d697]">
                <Phone className="size-4.5 text-[#013e37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#013e37]">Phone</p>
                <p className="text-xs text-slate-500">+1 (800) 555-RESUME</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-9 rounded-xl bg-[#ffefb3] text-[#013e37] flex items-center justify-center shrink-0 border border-[#e8d697]">
                <MapPin className="size-4.5 text-[#013e37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#013e37]">Headquarters</p>
                <p className="text-xs text-slate-500">500 Howard Street, Suite 400<br />San Francisco, CA 94105</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-[#e8d697] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="size-14 text-[#013e37] mx-auto" />
                <h3 className="text-xl font-bold text-[#013e37]">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out, <span className="font-bold text-[#013e37]">{form.name || 'there'}</span>. We have received your inquiry and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#013e37] text-[#ffefb3] text-xs font-bold rounded-xl hover:bg-[#012a25] transition border border-[#ffefb3]/30"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#013e37]/20 focus:border-[#013e37] focus:bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#013e37] hover:bg-[#012a25] active:scale-95 text-[#ffefb3] font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xs border border-[#ffefb3]/30"
                >
                  <Send className="size-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;

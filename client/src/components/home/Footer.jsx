import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-slate-500 bg-[#fdfbf7] mt-16 border-t border-[#e8d697]/70">
      <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
        <Link to="/" title="Resume Builder">
          <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
        </Link>
        <div>
          <p className="text-[#013e37] font-bold text-sm">Product</p>
          <ul className="mt-2.5 space-y-2">
            <li><Link to="/" className="hover:text-[#013e37] transition">Home</Link></li>
            <li><Link to="/pricing" className="hover:text-[#013e37] transition">Pricing Plans</Link></li>
            <li><a href="/#features" className="hover:text-[#013e37] transition">Features</a></li>
            <li><a href="/#testimonials" className="hover:text-[#013e37] transition">Testimonials</a></li>
            <li><Link to="/login?state=register" className="hover:text-[#013e37] transition">Get Started</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[#013e37] font-bold text-sm">Company & Resources</p>
          <ul className="mt-2.5 space-y-2">
            <li><Link to="/about" className="hover:text-[#013e37] transition">About Us</Link></li>
            <li><Link to="/blogs" className="hover:text-[#013e37] transition">Career Blog & Guides</Link></li>
            <li>
              <Link to="/careers" className="hover:text-[#013e37] transition">
                Careers <span className="text-[10px] text-[#ffefb3] bg-[#013e37] rounded-full ml-1 px-2 py-0.5 font-bold">Hiring</span>
              </Link>
            </li>
            <li><Link to="/contact" className="hover:text-[#013e37] transition">Contact & Support</Link></li>
            <li><Link to="/app" className="hover:text-[#013e37] transition">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[#013e37] font-bold text-sm">Legal</p>
          <ul className="mt-2.5 space-y-2">
            <li><Link to="/privacy" className="hover:text-[#013e37] transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#013e37] transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
        <p className="max-w-60 text-slate-600 text-xs leading-relaxed">Empowering job seekers to land their dream careers with intelligent AI tools.</p>
        <div className="flex items-center gap-4 mt-3">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#013e37] transition" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#013e37] transition" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">© 2026 Resume Builder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

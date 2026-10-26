import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const PublicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="w-full bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e8d697]/50 sticky top-0 z-40">
      <nav className="flex items-center justify-between max-w-7xl mx-auto py-3.5 px-6 md:px-12 text-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <Link to="/" className="hover:text-[#013e37] transition">Home</Link>
          <Link to="/pricing" className="hover:text-[#013e37] transition">Pricing</Link>
          <Link to="/about" className="hover:text-[#013e37] transition">About</Link>
          <Link to="/blogs" className="hover:text-[#013e37] transition">Blog</Link>
          <Link to="/careers" className="hover:text-[#013e37] transition">Careers</Link>
          <Link to="/contact" className="hover:text-[#013e37] transition">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-slate-700 text-sm font-medium">Hi, {user?.name}</span>
              <Link
                to="/app"
                className="px-5 py-2 bg-[#013e37] hover:bg-[#012a25] active:scale-95 transition-all rounded-full text-[#ffefb3] font-semibold shadow-xs text-xs border border-[#ffefb3]/30"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login?state=login"
                className="px-5 py-2 border border-[#013e37]/30 hover:bg-[#ffefb3]/40 active:scale-95 transition-all rounded-full text-[#013e37] font-semibold text-xs"
              >
                Login
              </Link>
              <Link
                to="/login?state=register"
                className="px-5 py-2 bg-[#013e37] hover:bg-[#012a25] active:scale-95 transition-all rounded-full text-[#ffefb3] font-semibold shadow-xs text-xs border border-[#ffefb3]/30"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden active:scale-90 transition p-1 text-[#013e37]"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-[#e8d697] px-6 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">Home</Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">Pricing</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">About</Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">Blog</Link>
          <Link to="/careers" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">Careers</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#013e37] py-1">Contact</Link>
          <div className="pt-2 border-t border-gray-200 flex gap-2">
            {isAuthenticated ? (
              <Link to="/app" onClick={() => setMenuOpen(false)} className="w-full text-center py-2 bg-[#013e37] text-[#ffefb3] rounded-xl font-bold text-sm">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login?state=login" onClick={() => setMenuOpen(false)} className="w-1/2 text-center py-2 border border-[#013e37]/30 rounded-xl font-semibold text-sm text-[#013e37]">
                  Login
                </Link>
                <Link to="/login?state=register" onClick={() => setMenuOpen(false)} className="w-1/2 text-center py-2 bg-[#013e37] text-[#ffefb3] rounded-xl font-bold text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;

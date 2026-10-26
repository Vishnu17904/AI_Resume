import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { FileQuestion, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-lg mx-auto">
        <div className="size-20 bg-[#ffefb3] text-[#013e37] rounded-3xl flex items-center justify-center mb-6 shadow-xs border border-[#e8d697]">
          <FileQuestion className="size-10 text-[#013e37]" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#013e37] tracking-tight">404 - Page Not Found</h1>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          The page you are looking for doesn't exist, was renamed, or is temporarily unavailable.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#013e37] hover:bg-[#012a25] active:scale-95 text-[#ffefb3] rounded-xl text-sm font-bold transition shadow-xs border border-[#ffefb3]/30"
          >
            <Home className="size-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/app"
            className="px-6 py-2.5 border border-[#013e37]/30 hover:bg-[#ffefb3]/40 active:scale-95 text-[#013e37] rounded-xl text-sm font-bold transition"
          >
            Open Dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

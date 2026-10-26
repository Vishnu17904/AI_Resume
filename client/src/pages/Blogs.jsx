import React, { useState } from 'react';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { blogPosts } from '../data/blogData';
import { BookOpen, Calendar, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Career Advice', 'Resume Tips', 'Engineering'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 text-slate-700 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-[#013e37] bg-[#ffefb3] border border-[#e8d697] rounded-full px-5 py-1.5 font-bold tracking-wide mb-3">
            <BookOpen width={14} className="stroke-[#013e37]" />
            <span>CAREER INSIGHTS & GUIDES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#013e37] tracking-tight">
            Learn How to Land More Interviews
          </h1>
          <p className="text-slate-600 mt-3 text-sm md:text-base">
            In-depth guides, ATS breakdown strategies, and actionable advice curated by top technical recruiters and hiring managers.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-3 rounded-2xl border border-[#e8d697] shadow-xs">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#fdfbf7] rounded-xl w-full sm:w-80 border border-[#e8d697]/80">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full focus:outline-none text-[#013e37]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#013e37] text-[#ffefb3] shadow-xs border border-[#ffefb3]/30'
                    : 'bg-[#fdfbf7] text-slate-600 hover:bg-[#ffefb3]/50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (if no search filter active) */}
        {!searchQuery && selectedCategory === 'All' && (
          <Link
            to={`/blogs/${featuredPost.slug}`}
            className="block mb-12 bg-white rounded-3xl overflow-hidden border border-[#e8d697] shadow-xs hover:shadow-lg hover:border-[#013e37] transition-all group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-extrabold px-3 py-1 bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-semibold">{featuredPost.category}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#013e37] leading-snug group-hover:underline transition">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="size-9 rounded-full object-cover ring-2 ring-[#ffefb3]" />
                    <div>
                      <p className="text-xs font-bold text-[#013e37]">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-slate-400">{featuredPost.date}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#013e37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map(article => (
            <Link
              key={article.id}
              to={`/blogs/${article.slug}`}
              className="bg-white rounded-3xl overflow-hidden border border-[#e8d697] shadow-xs hover:shadow-lg hover:border-[#013e37] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-full uppercase tracking-wider shadow-xs">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#013e37] leading-snug group-hover:underline transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {article.date}</span>
                <span className="flex items-center gap-1 text-[#013e37] font-bold group-hover:translate-x-1 transition-transform">
                  <span>{article.readTime}</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA banner */}
        <div className="bg-[#013e37] text-white p-8 md:p-12 rounded-3xl shadow-md text-center border border-[#ffefb3]/30">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#ffefb3] mb-2">Turn These Insights Into Your Dream Job</h2>
          <p className="text-sm text-emerald-100 max-w-md mx-auto mb-6 leading-relaxed">
            Build your resume with our AI-powered templates and download an ATS-compliant PDF in minutes.
          </p>
          <Link
            to="/login?state=register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ffefb3] hover:bg-[#f5dc8c] text-[#013e37] rounded-full text-sm font-extrabold active:scale-95 transition shadow-sm"
          >
            <span>Start Building Now</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;

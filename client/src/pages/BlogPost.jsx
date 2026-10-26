import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/home/PublicHeader';
import Footer from '../components/home/Footer';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, Calendar, Clock, Sparkles, Share2, Check } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
        <PublicHeader />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-extrabold text-[#013e37] mb-2">Article Not Found</h1>
          <p className="text-slate-600 text-sm mb-6">The blog post you requested could not be located.</p>
          <Link to="/blogs" className="px-6 py-2.5 bg-[#013e37] text-[#ffefb3] text-sm font-bold rounded-xl hover:bg-[#012a25] transition border border-[#ffefb3]/30">
            Back to All Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Simple Markdown parser for bold, headers, bullet lists, blockquotes, tables
  const renderFormattedContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (inList) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-4 space-y-2 list-disc list-inside text-slate-700">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="text-2xl font-extrabold text-[#013e37] mt-8 mb-4 border-b border-[#e8d697]/50 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="text-xl font-bold text-[#013e37] mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || (trimmed.startsWith('* [ ]'))) {
        inList = true;
        const text = trimmed.replace(/^(\* \[ \]\s*|\*\s*|-\s*)/, '');
        listItems.push(
          <li key={idx} className="text-slate-700 leading-relaxed text-sm md:text-base">
            <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
          </li>
        );
      } else if (trimmed.startsWith('> ')) {
        flushList();
        const quoteText = trimmed.replace('> ', '');
        elements.push(
          <blockquote key={idx} className="my-5 p-4 border-l-4 border-[#013e37] bg-[#ffefb3]/40 rounded-r-2xl text-[#013e37] italic text-sm md:text-base" dangerouslySetInnerHTML={{ __html: formatInline(quoteText) }} />
        );
      } else if (trimmed === '---') {
        flushList();
        elements.push(<hr key={idx} className="my-8 border-[#e8d697]/50" />);
      } else if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p key={idx} className="my-3 text-slate-700 leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      }
    });

    flushList();
    return elements;
  };

  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#013e37]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-800">$1</em>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-[#ffefb3]/60 text-[#013e37] rounded text-xs font-mono font-bold">$1</code>');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        {/* Navigation & Category */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#013e37] hover:underline transition cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Articles</span>
          </button>

          <span className="text-xs font-extrabold px-3 py-1 bg-[#ffefb3] text-[#013e37] border border-[#e8d697] rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#013e37] tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author metadata & Share */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#e8d697] mb-8">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="size-11 rounded-full object-cover ring-2 ring-[#ffefb3]" />
            <div>
              <p className="font-bold text-sm text-[#013e37]">{post.author.name}</p>
              <p className="text-xs text-slate-500">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {post.readTime}</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[#013e37]/30 hover:bg-[#ffefb3]/40 text-[#013e37] font-semibold transition cursor-pointer"
            >
              {copied ? <Check className="size-3.5 text-green-600" /> : <Share2 className="size-3.5" />}
              <span>{copied ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xs mb-10 border border-[#e8d697]">
          <img src={post.image} alt={post.title} className="w-full max-h-[420px] object-cover" />
        </div>

        {/* Article Body */}
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-[#e8d697] text-slate-800 leading-relaxed font-normal">
          {renderFormattedContent(post.content)}
        </article>

        {/* CTA Box */}
        <div className="my-12 bg-[#013e37] rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#ffefb3]/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffefb3]/20 text-[#ffefb3] rounded-full text-xs font-bold">
              <Sparkles className="size-3.5" />
              <span>AI-Powered Templates</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#ffefb3]">Ready to Apply These Strategies?</h3>
            <p className="text-sm text-emerald-100 max-w-md leading-relaxed">
              Create an ATS-optimized, beautifully formatted resume in minutes with our free resume builder.
            </p>
          </div>

          <Link
            to="/login?state=register"
            className="px-8 py-3.5 bg-[#ffefb3] hover:bg-[#f5dc8c] text-[#013e37] font-extrabold rounded-full active:scale-95 transition shadow-sm text-sm shrink-0"
          >
            Build My Resume Free
          </Link>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-extrabold text-[#013e37] mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map(rel => (
              <Link
                key={rel.id}
                to={`/blogs/${rel.slug}`}
                className="bg-white rounded-2xl p-5 border border-[#e8d697] shadow-xs hover:shadow-md hover:border-[#013e37] transition-all flex gap-4 items-center group"
              >
                <img src={rel.image} alt={rel.title} className="size-20 rounded-xl object-cover shrink-0" />
                <div>
                  <span className="text-[10px] font-extrabold text-[#013e37] uppercase">{rel.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#013e37] transition line-clamp-2 mt-0.5">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 mt-1 block">{rel.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;

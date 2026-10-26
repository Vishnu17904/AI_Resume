import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const companiesLogo = [
    { logo: (<svg className="h-7 w-auto max-w-xs" width="128" height="42" viewBox="0 0 128 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H27.7325V14H13.8663L0 0ZM0 14H13.8663L27.7325 28H0V14ZM0 28H13.8663V42L0 28Z" fill="#013e37" opacity="0.3" /><path d="M43.3801 11.0446H54.5901V14.6412H47.6231V19.6392H54.5901V23.1564H47.6231V29.5559H43.3801V11.0446ZM56.8949 16.8094H60.9025V19.4804C61.1118 18.5625 61.5401 17.8579 62.1859 17.3647C62.8482 16.8529 63.5835 16.598 64.386 16.598C64.8054 16.598 65.1549 16.6339 65.4334 16.7037V20.4591C65.0337 20.4104 64.6315 20.3842 64.2287 20.3797C63.1286 20.3797 62.3001 20.7403 61.7405 21.4634C61.1829 22.1687 60.9025 23.2262 60.9025 24.6373V29.5559H56.8968V16.8094H56.8949ZM71.7597 29.8998C70.5379 29.8998 69.4721 29.6084 68.5642 29.0268C67.6735 28.4452 66.9655 27.6196 66.5214 26.6466C66.0501 25.625 65.8128 24.4688 65.8128 23.1826C65.8128 21.9131 66.059 20.7666 66.5474 19.7449C67.0055 18.7579 67.7325 17.9233 68.6429 17.3385C69.5672 16.7569 70.6241 16.4654 71.8124 16.4654C72.7025 16.4654 73.498 16.6601 74.1959 17.0477C74.8937 17.4365 75.4177 17.9655 75.7673 18.6342V16.8094H79.7482V29.5559H75.7673V27.7573C75.4177 28.392 74.8766 28.9115 74.1432 29.3176C73.4098 29.7102 72.5902 29.9101 71.7597 29.8998ZM72.9125 26.5409C73.8723 26.5409 74.6146 26.2238 75.1386 25.5891C75.6626 24.9543 75.9246 24.1517 75.9246 23.1826C75.9246 22.2308 75.6626 21.4372 75.1386 20.8024C74.6146 20.1677 73.8723 19.8506 72.9125 19.8506C72.0033 19.8506 71.2712 20.1587 70.7123 20.7762C70.1712 21.3936 69.9003 22.1949 69.9003 23.1826C69.9003 24.1703 70.1712 24.9806 70.7123 25.6153C71.2712 26.2328 72.0046 26.5409 72.9125 26.5409ZM82.551 16.8094H86.5586V18.6605C86.839 18.0072 87.2919 17.4781 87.92 17.0739C88.5671 16.6697 89.3176 16.4654 90.1728 16.4654C92.1636 16.4654 93.4825 17.2494 94.1277 18.8194C94.483 18.1077 95.0387 17.5191 95.7258 17.1271C96.4604 16.6806 97.3042 16.452 98.1613 16.4654C101.147 16.4654 102.64 18.1923 102.64 21.6486V29.5559H98.6066V22.389C98.6066 21.5262 98.4493 20.8915 98.1352 20.4854C97.8206 20.0805 97.3492 19.8769 96.7205 19.8769C96.0398 19.8769 95.5158 20.1151 95.1491 20.591C94.7824 21.0497 94.5991 21.851 94.5991 22.9975V29.5559H90.5655V22.3627C90.5655 21.4993 90.4088 20.8729 90.0941 20.4854C89.7985 20.0805 89.3347 19.8769 88.7073 19.8769C88.0082 19.8769 87.4753 20.1151 87.1086 20.591C86.7419 21.0497 86.5586 21.851 86.5586 22.9975V29.5559H82.5523V16.8094H82.551ZM117.695 22.5216C117.695 23.0673 117.659 23.6585 117.588 24.2933H108.265C108.301 25.1221 108.58 25.7556 109.104 26.1976C109.628 26.6376 110.336 26.8586 111.225 26.8586C112.465 26.8586 113.251 26.4788 113.582 25.721H117.511C117.318 26.9733 116.638 27.9859 115.468 28.7623C114.316 29.52 112.901 29.8998 111.225 29.8998C109.06 29.8998 107.358 29.3086 106.117 28.1275C104.896 26.9457 104.284 25.2983 104.284 23.1826C104.284 21.8074 104.563 20.6173 105.122 19.6123C105.662 18.6086 106.494 17.7964 107.505 17.2853C108.536 16.7396 109.732 16.4654 111.096 16.4654C112.387 16.4654 113.53 16.721 114.525 17.2328C115.538 17.7445 116.315 18.4581 116.856 19.3747C117.416 20.2926 117.695 21.3411 117.695 22.5216ZM113.738 21.7812C113.721 20.935 113.485 20.2906 113.031 19.8506C112.578 19.4106 111.922 19.1896 111.066 19.1896C110.211 19.1896 109.53 19.4272 109.024 19.9038C108.535 20.3624 108.282 20.9875 108.264 21.7812H113.738ZM119.462 16.8094H123.469V19.4804C123.678 18.5625 124.107 17.8579 124.752 17.3647C125.379 16.8664 126.155 16.5961 126.953 16.598C127.371 16.598 127.721 16.6339 128 16.7037V20.4591C127.6 20.4104 127.198 20.3842 126.795 20.3797C125.695 20.3797 124.867 20.7403 124.307 21.4634C123.748 22.1687 123.469 23.2262 123.469 24.6373V29.5559H119.462V16.8094Z" fill="#013e37" opacity="0.3" /></svg>), },
    { logo: (<svg className="h-7 w-auto max-w-xs" width="143" height="32" viewBox="0 0 143 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M77.6225 10.3042H80.8137V19.1813C80.8137 23.6873 78.3304 26.2717 74.0042 26.2717C69.723 26.2717 67.2621 23.7322 67.2621 19.3049V10.3154H70.4534V19.2038C70.4534 21.8332 71.7456 23.2378 74.0492 23.2378C76.3527 23.2378 77.6225 21.8669 77.6225 19.3161V10.3042ZM59.6436 16.6418H52.4295V10.3042H49.2383V26.0357H52.4295V19.642H59.6323V26.0357H62.8236V10.3042H59.6323V16.6418H59.6436ZM139.56 10.3042V26.0133H142.706V10.3042H139.56ZM127.031 19.2599H132.84V16.3946H127.031V13.1696H135.458V10.3154H123.884V26.0245H135.762V23.1591H127.031V19.2599ZM114.513 21.114L110.94 10.293H108.333L104.759 21.114L101.287 10.3042H97.8937L103.377 26.0245H106.018L109.591 15.6979L113.165 26.0245H115.828L121.3 10.3042H117.985L114.513 21.114ZM92.2191 10.3941L99.0848 26.0245H95.7362L94.3204 22.7546H87.1176L87.0164 22.9793L85.6905 26.0245H82.4318L89.3649 10.3042H92.1517L92.2191 10.3941ZM92.9832 19.5409L90.7134 14.2708L88.4548 19.5409L88.2974 19.9004H93.1293L92.9832 19.5409Z" fill="#013e37" opacity="0.3" /></svg>), },
    { logo: (<svg className="h-7 w-auto max-w-xs" width="129" height="36" viewBox="0 0 129 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.63923 0.126226C3.99892 1.21347 1.09635 4.28507 0.179627 8.14059C-0.981336 13.0257 3.84997 15.0914 4.24624 14.4141C4.71264 13.6182 3.38052 13.3491 3.10632 10.8145C2.75193 7.54081 4.29898 3.88285 6.24599 2.27785C6.6079 1.97966 6.59069 2.39469 6.59069 3.16238C6.59069 4.53519 6.51358 16.859 6.51358 19.431C6.51358 22.9112 6.36746 24.0102 6.10503 25.0962C5.83914 26.1967 5.41166 26.9403 5.73558 27.2267C6.09748 27.5471 7.64265 26.785 8.53718 25.5568C9.60985 24.0837 9.98533 22.3147 10.0527 20.3936C10.1342 18.0777 10.1307 14.4029 10.1342 12.3068C10.1374 10.3843 10.1671 4.75506 10.0999 1.37095C10.0834 0.540892 7.74341 -0.329958 6.6391 0.125216" fill="#013e37" opacity="0.3" /></svg>), },
    { logo: (<svg className="h-7 w-auto max-w-xs" width="131" height="28" viewBox="0 0 131 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54.4798 5.59999V22.4H51.5696V9.21666H51.5308L46.3311 22.4H44.391L39.0749 9.21666H39.0361V22.4H36.3588V5.59999H40.5494L45.3611 18.0445H45.4387L50.5219 5.59999H54.4798ZM56.8856 6.88333C56.8856 6.41666 57.0408 6.02777 57.3901 5.71666C57.7393 5.40555 58.1273 5.24999 58.593 5.24999C59.0974 5.24999 59.5243 5.40555 59.8347 5.71666C60.1451 6.02777 60.3391 6.41666 60.3391 6.88333C60.3391 7.34999 60.1839 7.73888 59.8347 8.04999C59.4855 8.36111 59.0974 8.51666 58.593 8.51666C58.0885 8.51666 57.7005 8.36111 57.3901 8.04999C57.0797 7.69999 56.8856 7.31111 56.8856 6.88333Z" fill="#013e37" opacity="0.3" /></svg>), }
  ];

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className='h-11 w-auto' />
          </Link>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800 font-medium">
            <Link to="/" className="hover:text-[#013e37] transition">Home</Link>
            <a href="#features" className="hover:text-[#013e37] transition">Features</a>
            <Link to="/pricing" className="hover:text-[#013e37] transition">Pricing</Link>
            <Link to="/about" className="hover:text-[#013e37] transition">About</Link>
            <Link to="/blogs" className="hover:text-[#013e37] transition">Blog</Link>
            <Link to="/contact" className="hover:text-[#013e37] transition">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-slate-700 font-medium text-sm">Hi, {user?.name}</span>
                <Link
                  to='/app'
                  className="px-6 py-2 bg-[#013e37] hover:bg-[#012a25] active:scale-95 transition-all rounded-full text-[#ffefb3] font-semibold shadow-sm border border-[#ffefb3]/40"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to='/login?state=register'
                  className="px-6 py-2 bg-[#013e37] hover:bg-[#012a25] active:scale-95 transition-all rounded-full text-[#ffefb3] font-semibold shadow-sm border border-[#ffefb3]/40"
                >
                  Get started
                </Link>
                <Link
                  to='/login?state=login'
                  className="px-6 py-2 border border-[#013e37]/30 active:scale-95 hover:bg-[#ffefb3]/40 transition-all rounded-full text-[#013e37] font-semibold"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition p-1" aria-label="Open Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#013e37" strokeWidth="2" className="lucide lucide-menu">
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-[#013e37]/90 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-6 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-[#ffefb3] font-bold">Home</Link>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">Features</a>
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">Pricing</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">About Us</Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">Blog & Guides</Link>
          <Link to="/careers" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">Careers</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#ffefb3]">Contact</Link>
          {isAuthenticated ? (
            <Link to="/app" onClick={() => setMenuOpen(false)} className="text-[#013e37] font-bold bg-[#ffefb3] px-6 py-2 rounded-full">Dashboard</Link>
          ) : (
            <div className="flex gap-4 mt-2">
              <Link to="/login?state=login" onClick={() => setMenuOpen(false)} className="text-[#ffefb3] font-semibold border border-[#ffefb3] px-5 py-1.5 rounded-full">Login</Link>
              <Link to="/login?state=register" onClick={() => setMenuOpen(false)} className="text-[#013e37] font-bold bg-[#ffefb3] px-5 py-1.5 rounded-full">Sign Up</Link>
            </div>
          )}
          <button onClick={() => setMenuOpen(false)} className="size-10 p-1 items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full flex font-bold mt-4">
            ✕
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-[#ffefb3] blur-[120px] opacity-70"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
            </div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#013e37" stroke="#013e37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ professionals</p>
            </div>
          </div>

          {/* Headline + CTA */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold max-w-5xl text-center mt-4 sm:leading-[1.15] md:leading-[70px] text-slate-900 tracking-tight px-2">
            Land Your Dream Job with <span className="bg-[#ffefb3] text-[#013e37] px-3 py-0.5 rounded-2xl shadow-xs inline-block">AI-Powered</span> Resumes.
          </h1>

          <p className="max-w-md text-center text-sm sm:text-base my-6 sm:my-7 text-slate-600 px-4">Create, customize, and download ATS-optimized resumes in minutes with AI assistance.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center px-4">
            <Link
              to={isAuthenticated ? '/app' : '/login?state=register'}
              className="w-full sm:w-auto justify-center bg-[#013e37] hover:bg-[#012a25] text-[#ffefb3] rounded-full px-8 h-12 ring-offset-2 ring-1 ring-[#013e37] flex items-center transition-all font-semibold shadow-md active:scale-95 text-center text-sm"
            >
              <span>{isAuthenticated ? 'Go to Dashboard' : 'Get started'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1.5 size-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
            <Link
              to='/app'
              className="w-full sm:w-auto justify-center flex items-center gap-2 border border-[#013e37]/30 hover:bg-[#ffefb3]/40 transition-all rounded-full px-7 h-12 text-[#013e37] font-semibold active:scale-95 bg-white/80 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
              <span>Explore Resumes</span>
            </Link>
          </div>

          <p className="py-6 text-[#013e37]/70 mt-14 text-xs font-bold tracking-widest uppercase">Trusted by professionals from leading brands</p>

          <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
            {companiesLogo.map((company, index) => (
              <React.Fragment key={index}>
                {company.logo}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

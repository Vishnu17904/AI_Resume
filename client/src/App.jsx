import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Pricing from './pages/Pricing';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

const App = () => {
  const location = useLocation();

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7]">
      <ScrollToTop />
      <div key={location.pathname} className="page-transition min-h-screen flex flex-col">
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:slug' element={<BlogPost />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />

          {/* Authenticated Dashboard & Builder */}
          <Route path='/app' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          </Route>

          {/* Public view & Auth */}
          <Route path='/view/:resumeId' element={<Preview />} />
          <Route path='/login' element={<Login />} />

          {/* 404 Fallback */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

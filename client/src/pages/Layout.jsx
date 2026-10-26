import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/useAuth';
import { Loader2 } from 'lucide-react';

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-slate-500 gap-3">
        <Loader2 className="size-8 animate-spin text-green-600" />
        <p className="text-sm font-medium">Loading your session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;

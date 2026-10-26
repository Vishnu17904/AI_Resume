import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='shadow-xs border-b border-[#e8d697]/60 bg-[#fdfbf7] print:hidden'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-700 transition-all'>
        <div className='flex items-center gap-6'>
          <Link to='/' title='Home'>
            <img src="/logo.svg" alt="logo" className='h-10 w-auto' />
          </Link>
          <Link
            to='/app'
            className='hidden sm:block text-xs font-bold text-[#013e37] hover:bg-[#ffefb3]/60 transition px-3 py-1.5 rounded-xl'
          >
            Dashboard
          </Link>
        </div>

        <div className='flex items-center gap-3 sm:gap-4 text-sm'>
          <p className='max-sm:hidden font-medium text-slate-600 text-xs'>
            Hi, <span className="font-bold text-[#013e37]">{user?.name || 'User'}</span>
          </p>
          <button
            onClick={logoutUser}
            className='hover:bg-[#ffefb3]/40 border border-[#013e37]/30 px-5 py-1.5 rounded-full active:scale-95 transition-all text-xs font-semibold cursor-pointer text-[#013e37]'
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

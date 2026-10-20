import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoSVG.svg';
import { FaArrowRight, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  const scrollToSection = (id) => {
    setOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkBase =
    'block px-2 py-2 md:px-0 md:py-0 text-gray-700 hover:text-black transition-colors';

  const linkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? 'text-black font-semibold' : ''}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-[poppins]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" end className="flex flex-row items-center gap-2.5">
            <img src={Logo} alt="Learnova Logo" width="36" height="36" />
            <h1 className="font-bold text-xl tracking-tight text-[#333333]">Learnova</h1>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-x-8 font-medium text-sm items-center">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              </>
            )}
            <button
              onClick={() => scrollToSection('features')}
              className={`${linkBase} cursor-pointer text-left`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className={`${linkBase} cursor-pointer text-left`}
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('contactUs')}
              className={`${linkBase} cursor-pointer text-left`}
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop CTA / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  title="View & Edit Profile"
                >
                  <FaUserCircle className="text-gray-500 text-lg" />
                  <span className="max-w-[120px] truncate">{user?.userName || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 px-3 py-1.5 border border-gray-200 rounded-full hover:border-red-200 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1.5"
                >
                  Sign In
                </NavLink>
                <NavLink to="/signup">
                  <div className="group flex items-center gap-2 border-2 border-black rounded-full px-4 py-1.5 cursor-pointer text-sm font-medium transition-all duration-300 ease-out hover:bg-black hover:text-white">
                    <span>Get Started</span>
                    <FaArrowRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </div>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-controls="mobile-menu"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-6 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-gray-200 bg-white ${open ? 'block' : 'hidden'}`}
      >
        <nav className="mx-auto max-w-6xl px-4 py-4 font-medium text-sm">
          <div className="flex flex-col gap-3">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>Profile</NavLink>
              </>
            )}
            <button
              onClick={() => scrollToSection('features')}
              className={`${linkBase} text-left cursor-pointer`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className={`${linkBase} text-left cursor-pointer`}
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('contactUs')}
              className={`${linkBase} text-left cursor-pointer`}
            >
              Contact Us
            </button>

            <div className="pt-3 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="text-sm text-gray-700 font-medium hover:text-black flex items-center gap-1.5"
                  >
                    <FaUserCircle className="text-gray-500" />
                    <span>Signed in as <strong className="text-black">{user?.userName}</strong></span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 text-gray-800 font-medium border border-gray-300 rounded-lg"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 bg-[#333333] text-white font-medium rounded-lg"
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logoSVG.svg';
import { FaArrowRight } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    'block px-2 py-2 md:px-0 md:py-0 text-gray-700 hover:text-black transition-colors';

  const linkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? 'text-black' : ''}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-3">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" end className="flex flex-row items-center gap-2">
            <img src={Logo} alt="Logo" width="40" height="40" />
            <h1 className="font-semibold text-lg">learnEx</h1>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-x-8 font-medium">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/features" className={linkClass}>Features</NavLink>
            <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
            <NavLink to="/contactUs" className={linkClass}>Contact Us</NavLink>
          </nav>

          {/* Desktop CTA */}
          <NavLink to="/login" className="hidden md:inline-block">
            <div className="group flex items-center gap-2 border-2 border-black rounded-full px-3 py-1 cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white">
              <p>Get Started</p>
              <FaArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-2" />
            </div>
          </NavLink>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-controls="mobile-menu"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            {/* Simple hamburger / close icon */}
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
        <nav className="mx-auto max-w-6xl px-3 py-3 font-medium">
          <div className="flex flex-col gap-2">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/features" className={linkClass} onClick={() => setOpen(false)}>Features</NavLink>
            <NavLink to="/faqs" className={linkClass} onClick={() => setOpen(false)}>FAQs</NavLink>
            <NavLink to="/contactUs" className={linkClass} onClick={() => setOpen(false)}>Contact Us</NavLink>
            <NavLink to="/login" onClick={() => setOpen(false)}>
              <div className="mt-2 group inline-flex items-center gap-2 border-2 border-black rounded-full px-3 py-1 transition-all duration-300 ease-out hover:bg-black hover:text-white">
                <p>Get Started</p>
                <FaArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-2" />
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

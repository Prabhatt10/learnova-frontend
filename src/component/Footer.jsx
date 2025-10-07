import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-100 font-[poppins]">
      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 md:px-12 py-12">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <section aria-labelledby="footer-brand">
            <h2 id="footer-brand" className="text-xl font-semibold">learnEx</h2>
            <p className="mt-3 text-gray-300">
              Your gateway to knowledge and learning.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-white transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </section>


          <nav aria-labelledby="footer-products">
            <h2 id="footer-products" className="text-lg font-semibold">Products</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/students" className="hover:text-white transition-colors">For Students</Link></li>
              <li><Link to="/teachers" className="hover:text-white transition-colors">For Teachers</Link></li>
              <li><Link to="/organizations" className="hover:text-white transition-colors">For Organizations</Link></li>
            </ul>
          </nav>


          <nav aria-labelledby="footer-support">
            <h2 id="footer-support" className="text-lg font-semibold">Support</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li><Link to="/contactUs" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </nav>

          <section aria-labelledby="footer-subscribe">
            <h2 id="footer-subscribe" className="text-lg font-semibold">Subscribe</h2>
            <p className="mt-3 text-gray-300">Get the latest news and updates</p>
            <form className="mt-4 flex w-full max-w-md gap-3">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-md bg-white/10 px-3 py-2 text-gray-100 placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-gray-800"
              />
            </form>
          </section>
        </div>

        <div className=" w-full mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-300">© 2025 learnEx. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

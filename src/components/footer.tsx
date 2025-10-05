'use client';
import React, { useState, useEffect, use } from 'react';

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show "Back to Top" button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-10 relative">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">AwesomeHub</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Universe of Awesome Lists
            </p>
            {/* Social Icons */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://github.com/nafisreza/awesome-hub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-blue-600 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.582 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.33-1.757-1.33-1.757-1.086-.742.083-.727.083-.727 1.2.086 1.83 1.232 1.83 1.232 1.07 1.832 2.807 1.303 3.492.997.108-.775.42-1.303.763-1.603-2.665-.302-5.466-1.336-5.466-5.933 0-1.31.467-2.38 1.235-3.22-.123-.303-.536-1.524.117-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013-.404c1.02.005 2.045.138 3 .404 2.29-1.552 3.293-1.23 3.293-1.23.655 1.653.242 2.874.12 3.176.77.84 1.233 1.91 1.233 3.222 0 4.61-2.807 5.628-5.48 5.922.43.372.823 1.103.823 2.222 0 1.604-.015 2.897-.015 3.293 0 .322.19.7.8.58C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* Add other socials as needed */}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-blue-600 hover:underline transition">Home</a></li>
                <li><a href="/search" className="hover:text-blue-600 hover:underline transition">Search</a></li>
                <li><a href="/bookmarks" className="hover:text-blue-600 hover:underline transition">Bookmarks</a></li>
                <li><a href="/categories" className="hover:text-blue-600 hover:underline transition">Browse Categories</a></li>
                <li><a href="/trending" className="hover:text-blue-600 hover:underline transition">Trending Repos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/contributing" className="hover:text-blue-600 hover:underline transition">Contributing Guide</a></li>
                <li><a href="/docs" className="hover:text-blue-600 hover:underline transition">Documentation</a></li>
                <li><a href="/license" className="hover:text-blue-600 hover:underline transition">License</a></li>
                <li><a href="/issues" className="hover:text-blue-600 hover:underline transition">Feature Requests</a></li>
                <li><a href="/bugs" className="hover:text-blue-600 hover:underline transition">Bug Reports</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">External Links</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/nafisreza/awesome-hub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition">GitHub Repository</a></li>
                <li><a href="/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition">Contributing Guide</a></li>
                <li><a href="/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline transition">License</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} AwesomeHub. All rights reserved.
        </div>

        {/* Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
          >
            ↑
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;

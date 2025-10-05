import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-200 py-12"
      aria-label="Footer"
    >
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AwesomeHub</h2>
          <p className="text-sm text-gray-400 mb-2">The Universe of Awesome Lists</p>
          <p className="text-gray-400 text-sm">
            Curating the best lists of projects, tools, and resources to make your dev life easier.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="/"
                className="hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/search"
                className="hover:text-white transition-colors"
              >
                Search
              </a>
            </li>
            <li>
              <a
                href="/bookmarks"
                className="hover:text-white transition-colors"
              >
                Bookmarks
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="hover:text-white transition-colors"
              >
                Browse Categories
              </a>
            </li>
            <li>
              <a
                href="/trending"
                className="hover:text-white transition-colors"
              >
                Trending Repos
              </a>
            </li>
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Resources">
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="https://github.com/nafisreza/awesome-hub/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contributing Guide
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nafisreza/awesome-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nafisreza/awesome-hub/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                License
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="hover:text-white transition-colors"
              >
                Feature Requests
              </a>
            </li>
            <li>
              <a
                href="/bugs"
                className="hover:text-white transition-colors"
              >
                Bug Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AwesomeHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Inside My Mind</h1>
          <p className="text-gray-400">A place where I can dump my thoughts</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              className="hover:text-white"
              aria-label="Instagram"
            >
              Instagram
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

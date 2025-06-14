import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 text-gray-500 text-sm bg-white mt-auto shadow-inner">
      <p>© {new Date().getFullYear()} Password Manager. Built with ❤️ by Rohit.</p>
    </footer>
  );
};

export default Footer;

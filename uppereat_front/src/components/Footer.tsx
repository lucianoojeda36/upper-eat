import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-serif font-bold text-white mb-4 md:mb-0">
          GourmetBites
        </div>
        <ul className="flex space-x-6 text-sm">
          <li className="hover:text-yellow-500 cursor-pointer transition-colors">
            Privacy Policy
          </li>
          <li className="hover:text-yellow-500 cursor-pointer transition-colors">
            Terms and Conditions
          </li>
        </ul>
        <div className="text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} GourmetBites. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

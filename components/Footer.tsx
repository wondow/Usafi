import React from 'react';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
            <Leaf className="h-6 w-6 text-primary-600 mr-2" />
            <span className="text-lg font-bold text-gray-900">Takasafi</span>
        </div>
        <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Takasafi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
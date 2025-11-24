import React from 'react';
import { Leaf, Plus, Menu, X } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  onOpenCreate: () => void;
  onNavigateHome: () => void;
  onOpenAuth?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCreate, onNavigateHome }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <Leaf className="h-8 w-8 text-primary-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Takasafi</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={onNavigateHome} className="text-gray-600 hover:text-primary-600 font-medium">Home</button>
            <a href="#events" className="text-gray-600 hover:text-primary-600 font-medium">Find Events</a>
            <Button onClick={onOpenCreate} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Event
            </Button>
            <Button variant="outline" size="sm" onClick={onOpenAuth}>Log in</Button>
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
              JD
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button onClick={onNavigateHome} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left">Home</button>
            <a href="#events" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">Find Events</a>
            <div className="px-3 py-2">
               <Button onClick={() => { onOpenCreate(); setIsMenuOpen(false); }} className="w-full">Create Event</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" className={`font-serif font-bold tracking-wide transition-all duration-500 ${isScrolled ? 'text-2xl text-[#ff9933]' : 'text-3xl text-white drop-shadow-md'}`}>
              DOIWALA
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${isScrolled ? 'text-[#3a2c2c] hover:text-[#ff9933]' : 'text-white/90 hover:text-white drop-shadow-sm'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#order"
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:scale-105 ${isScrolled ? 'bg-gradient-to-r from-[#ff9933] to-[#e68a2e] text-white' : 'bg-white text-[#ff9933] hover:bg-gray-50'}`}
            >
              Order Now
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-[#3a2c2c] hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff9933] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <a
              href="#/admin"
              className={`text-xs opacity-30 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[#3a2c2c]' : 'text-white'}`}
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-all duration-300 ${isScrolled ? 'text-[#3a2c2c]' : 'text-white'}`}
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff9933] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-colors ${isScrolled ? 'text-[#3a2c2c] hover:text-[#ff9933]' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fff8f0] border-t border-[#ff9933]/20 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-[#3a2c2c] hover:text-[#ff9933] hover:bg-[#ff9933]/10 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 text-center bg-[#ff9933] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e68a2e] transition-colors shadow-md"
              >
                Order Now
              </a>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 mt-2 w-full px-6 py-3 bg-white text-[#ff9933] border-2 border-[#ff9933] rounded-full font-bold hover:bg-[#ff9933]/5 transition-colors"
              >
                <ShoppingBag size={20} />
                <span>View Cart ({totalItems})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

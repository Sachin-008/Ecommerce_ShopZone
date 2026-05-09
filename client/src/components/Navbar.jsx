import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, User, Heart, Globe, Menu, X, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#131921] dark:bg-slate-950 text-white shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white hover:text-[#febd69] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <Link to="/" className="text-2xl font-extrabold text-white tracking-tighter flex-shrink-0">
          SHOP<span className="text-[#febd69]">ZONE</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="flex-grow max-w-2xl hidden lg:flex mx-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 text-black dark:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0c14b] border-none"
            />
            <button type="submit" className="absolute right-0 top-0 h-full bg-[#febd69] hover:bg-[#f0c14b] px-4 rounded-r-md text-[#232f3e] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-bold">
          <Link to="/shop" className="hover:text-[#febd69] transition-colors whitespace-nowrap text-white">{t.all}</Link>
          <Link to="/wishlist" className="hover:text-[#febd69] transition-colors whitespace-nowrap text-white">{t.wishlist}</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="text-gray-300 hover:text-[#febd69] transition-colors flex items-center justify-center p-1"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language Toggle */}
          <div className="hidden sm:flex items-center gap-1 group cursor-pointer relative" onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}>
            <Globe size={18} className="text-gray-300 group-hover:text-[#febd69] transition-colors" />
            <span className="text-xs font-bold group-hover:text-[#febd69] transition-colors">{language}</span>
          </div>

          <Link to="/cart" className="relative hover:text-[#febd69] transition-colors text-white">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#f08804] text-[10px] w-5 h-5 flex items-center justify-center rounded-full text-black font-extrabold shadow-sm">
                {cartItems.length}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 group cursor-pointer">
            <Link to={user ? "/profile" : "/login"} className="text-white hover:text-[#febd69] transition-colors flex items-center gap-2">
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-gray-300 font-normal leading-tight">{t.hello}, {user ? user.name.split(' ')[0] : t.signIn}</p>
                <p className="text-xs font-bold leading-tight">{t.account}</p>
              </div>
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#232f3e] dark:bg-slate-900 border-t border-gray-700 p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative w-full flex">
              <input 
                type="text" 
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-white dark:bg-slate-800 text-black dark:text-white py-2 px-4 rounded-l-md focus:outline-none"
              />
              <button type="submit" className="bg-[#febd69] hover:bg-[#f0c14b] px-4 rounded-r-md text-[#232f3e]">
                <Search size={20} />
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-4 font-bold text-sm">
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#febd69] text-white">Shop {t.all}</Link>
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#febd69] text-white">{t.wishlist}</Link>
            
            <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-2">
              <span className="text-gray-300">Language: {language}</span>
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="bg-gray-700 px-3 py-1 rounded text-white"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

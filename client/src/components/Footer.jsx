import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Search, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      toast.success('Thank you for joining our newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <footer className="bg-[#131921] dark:bg-slate-950 border-t border-white/5 py-12 text-white transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">SHOP<span className="text-[#febd69]">ZONE</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate destination for everything you need. From global brands to Amazon basics, we bring the world to your doorstep.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Get to Know Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-[#febd69] transition-colors">About ShopZone</Link></li>
            <li><Link to="/shop" className="hover:text-[#febd69] transition-colors">Sustainability</Link></li>
            <li><Link to="/" className="hover:text-[#febd69] transition-colors">Press Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Let Us Help You</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-[#febd69] transition-colors">Your Account</Link></li>
            <li><Link to="/" className="hover:text-[#febd69] transition-colors">Returns Centre</Link></li>
            <li><Link to="/" className="hover:text-[#febd69] transition-colors">Help Help</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect with Us</h4>
          <form onSubmit={handleJoin} className="flex space-x-0 mb-6">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white dark:bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm text-black dark:text-white focus:outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-[#f0c14b] text-black px-4 py-2 rounded-r-md text-sm font-bold hover:bg-[#e7bb41] transition-colors whitespace-nowrap">Join</button>
          </form>
          <div className="flex space-x-4 text-gray-400">
            <Link to="/"><Mail size={20} className="hover:text-[#febd69]" /></Link>
            <Link to="/shop"><Search size={20} className="hover:text-[#febd69]" /></Link>
            <Link to="/"><Globe size={20} className="hover:text-[#febd69]" /></Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopZone. An Amazon Catalog Demo.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={40} className="text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-10">Save items you like to find them easily later.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center bg-[#f0c14b] text-black border-[#a88734] px-10">
          Explore Products <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-10 text-slate-900 flex items-center">
        My Wishlist <span className="ml-4 text-lg font-medium text-slate-500">({wishlistItems.length} items)</span>
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

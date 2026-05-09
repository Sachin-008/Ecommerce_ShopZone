import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group bg-white border border-slate-100 shadow-sm rounded-xl relative"
    >
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.images[0].url} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <button 
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${isInWishlist(product._id) ? 'bg-red-50 text-red-500' : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'}`}
          >
            <Heart size={16} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-[#f0c14b] shadow-lg text-black rounded-full flex items-center justify-center hover:bg-[#e7bb41] transition-all transform hover:scale-110"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</span>
            {product.isAmazonChoice && (
              <span className="bg-[#232f3e] text-white text-[10px] px-2 py-0.5 mt-1 rounded-sm w-fit font-medium">
                Amazon's <span className="text-[#febd69]">Choice</span>
              </span>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-yellow-500 text-xs mb-1">
              <Star size={12} fill="currentColor" className="mr-1" />
              {product.ratings}
            </div>
            {product.isPrime && (
              <span className="text-[#00a8e1] font-bold italic text-[10px] flex items-center">
                ✓prime
              </span>
            )}
          </div>
        </div>
        <Link to={`/product/${product._id}`} className="block font-semibold text-lg mb-1 hover:text-[#2874f0] transition-colors text-slate-900">
          {product.name}
        </Link>
        <p className="text-xl font-bold text-[#B12704]">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import { fetchAmazonProducts } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchAmazonProducts();
        const foundProduct = data.find(p => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Fallback if not found
          setProduct(null);
        }
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-24">
      <Link to="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-10 transition-colors">
        <ArrowLeft size={18} className="mr-2" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="glass-card aspect-square overflow-hidden rounded-3xl">
            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card aspect-square rounded-xl cursor-pointer hover:border-indigo-500 transition-colors overflow-hidden opacity-60 hover:opacity-100">
                <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#232f3e]/10 text-[#232f3e] text-xs font-bold mb-4 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center text-[#ff9900]">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} fill={star <= Math.round(product.ratings) ? "currentColor" : "none"} className={star > Math.round(product.ratings) ? "text-slate-300" : ""} />
                ))}
                <span className="ml-2 text-slate-700 font-bold">{product.ratings}</span>
              </div>
              <span className="text-slate-500 text-sm">({product.numOfReviews} Reviews)</span>
            </div>
            <p className="text-3xl font-extrabold text-[#fb641b]">₹{product.price}</p>
          </div>

          <p className="text-slate-600 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          <div className="flex items-center space-x-6 mb-10">
            <div className="flex items-center space-x-4 bg-slate-100 rounded-xl p-2 border border-slate-200">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-lg transition-colors text-slate-900"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center text-xl font-bold text-slate-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 rounded-lg transition-colors text-slate-900"
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-500">
              <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              <br />
              {product.stock} units available
            </p>
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={() => { addToCart(product, quantity); toast.success('Added to cart'); }}
              className="btn-primary flex-grow flex items-center justify-center py-4 text-lg bg-[#f0c14b] hover:bg-[#e7bb41] text-black border-[#a88734] rounded-md shadow-inner"
            >
              <ShoppingCart className="mr-2" size={20} /> Add to Cart
            </button>
            <button 
              onClick={() => { 
                const added = toggleWishlist(product);
                toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
              }}
              className={`p-4 border rounded-xl transition-all ${isInWishlist(product?._id) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            >
              <Heart size={24} fill={isInWishlist(product?._id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <Truck size={24} className="text-[#232f3e]" />
              <div className="text-xs text-slate-700">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-slate-500">ShopZone Prime</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw size={24} className="text-[#232f3e]" />
              <div className="text-xs text-slate-700">
                <p className="font-bold">Easy Returns</p>
                <p className="text-slate-500">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck size={24} className="text-[#232f3e]" />
              <div className="text-xs text-slate-700">
                <p className="font-bold">Secure Shopping</p>
                <p className="text-slate-500">Verified by ShopZone</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;

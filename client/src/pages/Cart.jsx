import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, shippingFee, orderTotal, discount, applyCoupon, toggleSelect } = useCart();
  const [couponCode, setCouponCode] = React.useState('');

  const handleApplyCoupon = () => {
    const res = applyCoupon(couponCode);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Your basket is empty</h2>
        <p className="text-slate-500 mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center bg-[#f0c14b] text-black border-[#a88734] px-10 rounded-md py-3 font-bold">
          Start Shopping <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-10 text-slate-900">Shopping Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <motion.div 
              key={item._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white border rounded-xl p-4 flex gap-6 shadow-sm transition-all ${item.selected ? 'border-[#f0c14b] ring-1 ring-[#f0c14b]/10' : 'border-slate-200 opacity-60'}`}
            >
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={item.selected} 
                  onChange={() => toggleSelect(item._id)}
                  className="w-5 h-5 accent-[#f0c14b] cursor-pointer"
                />
              </div>
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50">
                <img src={item.images[0].url} alt={item.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    {item.isPrime && <p className="text-[#00a8e1] text-xs font-bold italic mt-1">✓prime</p>}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 bg-slate-100 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-md transition-colors text-slate-700"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-md transition-colors text-slate-700"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-extrabold text-xl text-[#B12704]">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Order Summary</h3>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="text-slate-900 font-bold">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shippingFee > 0 ? "text-slate-900 font-bold" : "text-green-600 font-bold"}>
                  {shippingFee > 0 ? `₹${shippingFee}` : 'FREE'}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold animate-fadeIn">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              {shippingFee > 0 && (
                <p className="text-[10px] text-red-500 font-bold text-right italic">Add ₹{(200 - cartTotal).toLocaleString()} more for FREE delivery</p>
              )}
            </div>
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end mb-8">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-extrabold text-[#B12704]">₹{orderTotal.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full flex items-center justify-center group bg-[#f0c14b] hover:bg-[#f7d87d] text-black border-[#a88734] py-4 rounded-md font-bold mb-6">
              Proceed to Checkout <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Have a Coupon?</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Code" 
                  className="flex-grow border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#f0c14b] outline-none uppercase"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-xs font-bold border border-slate-300 transition-all"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Try <strong className="text-slate-600 font-black">SAVE50</strong> (Orders ₹1,000-₹1,500) or <strong className="text-slate-600 font-black">SHOPZONE20</strong> (Orders &gt; ₹10,000)
              </p>
            </div>
          </div>
          
          <div className="bg-[#fff9e6] border border-[#f5d066] rounded-xl p-6">
            <p className="text-xs text-[#a88734] font-bold uppercase tracking-widest mb-2">Prime Member Deal</p>
            <p className="text-sm text-slate-700">Free shipping on all items. Use code <span className="text-slate-900 font-bold">SHOPZONE20</span> for extra savings!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, ArrowLeft, Lock, Smartphone, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearOrderedItems, shippingFee, orderTotal, discount } = useCart();
  const { user, addOrder } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    country: user?.country || 'India',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    toast.loading(paymentMethod === 'cod' ? 'Confirming order...' : 'Processing payment...');
    
    const newOrder = {
      id: 'ORD' + Math.floor(Math.random() * 1000000),
      items: cartItems.filter(item => item.selected),
      total: orderTotal,
      date: new Date().toLocaleDateString(),
      status: 'In Transit',
      paymentMethod: paymentMethod,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`
    };

    setTimeout(() => {
      addOrder(newOrder);
      toast.dismiss();
      toast.success('Order Placed Successfully!');
      clearOrderedItems();
      navigate('/orders');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">{t.noItems}</h2>
        <Link to="/shop" className="text-[#007185] hover:underline">Go back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/cart" className="flex items-center text-slate-500 hover:text-black transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back to Cart
          </Link>
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm ${step >= 1 ? 'bg-[#232f3e] text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>1</div>
            <div className="w-12 h-[2px] bg-slate-200"></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm ${step >= 2 ? 'bg-[#232f3e] text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>2</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center space-x-3 mb-8 border-b pb-4">
                  <Truck className="text-[#f08804]" size={24} />
                  <h2 className="text-2xl font-extrabold text-slate-900">{t.shipping}</h2>
                </div>

                {/* Saved Addresses */}
                {user?.addresses?.length > 0 && (
                  <div className="mb-10 space-y-4">
                    <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" /> Use a saved address
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.addresses.map((addr) => (
                        <div 
                          key={addr.id}
                          onClick={() => setFormData({
                            ...formData,
                            address: addr.street,
                            city: addr.city,
                            zip: addr.zip,
                            country: addr.country
                          })}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                            formData.address === addr.street ? 'border-[#f0c14b] bg-[#fff9e6] shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {addr.isDefault && (
                            <span className="absolute top-2 right-2 text-[8px] font-black bg-[#B12704] text-white px-1.5 py-0.5 rounded-full uppercase">Default</span>
                          )}
                          <p className="text-sm font-extrabold text-slate-900">{addr.street}</p>
                          <p className="text-xs text-slate-600 mt-1 font-medium">{addr.city}, {addr.zip}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 py-6">
                      <div className="flex-grow h-px bg-slate-100"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or enter a new address</span>
                      <div className="flex-grow h-px bg-slate-100"></div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Street Address</label>
                    <input type="text" name="address" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="123 Aura St" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">City</label>
                    <input type="text" name="city" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="Tech City" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">PIN Code</label>
                    <input type="text" name="zip" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="110001" value={formData.zip} onChange={handleInputChange} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Country</label>
                    <input type="text" name="country" disabled className="w-full border border-slate-200 bg-slate-50 rounded-md p-3" value={formData.country} />
                  </div>
                </div>
                <button 
                  onClick={() => formData.address && formData.city && formData.zip ? setStep(2) : toast.error('Please fill all fields')} 
                  className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black w-full mt-10 py-4 rounded-md font-bold shadow-sm border border-[#a88734] transition-all"
                >
                  Continue to Payment
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center space-x-3 mb-8 border-b pb-4">
                  <CreditCard className="text-[#f08804]" size={24} />
                  <h2 className="text-2xl font-extrabold text-slate-900">{t.payment}</h2>
                </div>
                
                <div className="space-y-4 mb-10">
                  {[
                    { id: 'upi', label: t.upi, icon: <Smartphone className="text-purple-600" /> },
                    { id: 'card', label: t.card, icon: <CreditCard className="text-blue-600" /> },
                    { id: 'cod', label: t.cod, icon: <Wallet className="text-green-600" /> }
                  ].map(method => (
                    <label 
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method.id ? 'border-[#f0c14b] bg-[#f0c14b]/5 ring-1 ring-[#f0c14b]' : 'border-slate-200 hover:border-slate-300'}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-[#f0c14b] rounded-full"></div>}
                        </div>
                        {method.icon}
                        <span className="font-bold text-slate-700">{method.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-200 animate-fadeIn">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Name on Card</label>
                        <input type="text" name="cardName" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="FULL NAME" value={formData.cardName} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Card Number</label>
                        <input type="text" name="cardNumber" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="XXXX XXXX XXXX XXXX" value={formData.cardNumber} onChange={handleInputChange} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Expiry Date</label>
                          <input type="text" name="expiry" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">CVV</label>
                          <input type="password" name="cvv" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-1 focus:ring-[#f0c14b] outline-none" placeholder="XXX" value={formData.cvv} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-4 animate-fadeIn">
                      <p className="font-medium text-slate-600 italic">Please enter your VPA / UPI ID to proceed</p>
                      <input 
                        type="text" 
                        className="w-full border border-slate-300 rounded-md p-3 outline-none focus:ring-1 focus:ring-[#f0c14b]" 
                        placeholder="user@upi"
                        onChange={(e) => setFormData({...formData, upi: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="pt-4 flex items-center text-xs text-slate-400">
                    <Lock size={12} className="mr-2" /> 100% Secure Transaction
                  </div>
                  <button 
                    type="submit" 
                    className="bg-[#FF9900] hover:bg-[#E68A00] text-white w-full py-4 rounded-md font-extrabold shadow-md transition-all flex items-center justify-center text-lg uppercase tracking-wider"
                  >
                    {paymentMethod === 'cod' ? t.placeOrder : `Proceed to Pay ₹${orderTotal.toLocaleString()}`}
                  </button>
                  <button onClick={() => setStep(1)} className="w-full text-sm font-bold text-[#007185] hover:underline">Go Back to Shipping</button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Summary Side */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-extrabold text-xl mb-6 text-slate-900 border-b pb-4">{t.summary}</h3>
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.filter(item => item.selected).map(item => (
                  <div key={item._id} className="flex gap-4 text-sm">
                    <div className="w-16 h-16 rounded-md bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-slate-800 line-clamp-2">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-slate-500 font-medium">Qty: {item.quantity}</p>
                        <p className="font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{t.subtotal}</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span className={shippingFee > 0 ? "text-slate-900 font-bold" : "text-green-600 font-bold"}>
                    {shippingFee > 0 ? `₹${shippingFee}` : t.free}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-black pt-4 text-[#B12704]">
                  <span>{t.total}</span>
                  <span>₹{orderTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-xs text-slate-400 px-4">
              <CheckCircle size={14} className="text-green-500" />
              <span>ShopZone A-to-z Guarantee protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

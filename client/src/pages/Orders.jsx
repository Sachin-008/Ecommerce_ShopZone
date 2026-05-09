import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronRight, X, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Orders = () => {
  const { user, cancelOrder } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cancelModal, setCancelModal] = React.useState({ show: false, orderId: null });
  const [cancelReason, setCancelReason] = React.useState('');
  
  const orders = user?.orders || [];

  const reasons = [
    "Order created by mistake",
    "Item price too high",
    "Found better price elsewhere",
    "Need to change shipping address",
    "Need to change payment method",
    "Expected delivery time is too long"
  ];

  const handleCancelSubmit = () => {
    if (!cancelReason) {
      toast.error('Please select a reason for cancellation');
      return;
    }
    cancelOrder(cancelModal.orderId, cancelReason);
    setCancelModal({ show: false, orderId: null });
    setCancelReason('');
    toast.success('Order cancelled successfully');
  };

  return (
    <div className="container mx-auto px-4 py-24 bg-slate-50 min-h-screen relative">
      {/* Cancellation Modal */}
      {cancelModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Cancel Order</h3>
              <button onClick={() => setCancelModal({ show: false, orderId: null })} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 mb-6 text-amber-800">
                <AlertTriangle size={20} />
                <p className="text-sm font-bold">Please select a reason for cancellation</p>
              </div>
              <div className="space-y-3">
                {reasons.map((r, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all">
                    <input 
                      type="radio" 
                      name="reason" 
                      value={r} 
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-4 h-4 accent-[#B12704]"
                    />
                    <span className="text-sm font-medium text-slate-700">{r}</span>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setCancelModal({ show: false, orderId: null })}
                  className="flex-1 py-3 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Go Back
                </button>
                <button 
                  onClick={handleCancelSubmit}
                  className="flex-1 py-3 font-bold bg-[#B12704] text-white rounded-xl shadow-lg hover:bg-[#8e1f03] transition-all"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Your Orders</h1>
          <p className="text-slate-500 font-medium">Track and manage your recent purchases</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap gap-6 justify-between items-center">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Order Placed</p>
                      <p className="text-sm font-bold text-slate-700">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</p>
                      <p className="text-sm font-bold text-slate-700">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ship To</p>
                      <p className="text-sm font-bold text-[#007185] cursor-pointer hover:underline">{user?.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-right">Order # {order.id}</p>
                    <div className="flex gap-3 text-xs font-bold text-[#007185] mt-1">
                      <Link to="#" className="hover:underline">Order Details</Link>
                      <span className="text-slate-300">|</span>
                      <Link to="#" className="hover:underline">Invoice</Link>
                    </div>
                  </div>
                </div>

                {/* Order Status & Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {order.status === 'Cancelled' ? <X size={20} /> : <Truck size={20} />}
                    </div>
                    <div>
                      <h3 className={`text-lg font-extrabold ${order.status === 'Cancelled' ? 'text-red-600' : 'text-slate-900'}`}>
                        {order.status === 'Cancelled' ? 'Order Cancelled' : order.status}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">
                        {order.status === 'Cancelled' 
                          ? `Reason: ${order.cancelReason}` 
                          : 'Your package is on its way to the delivery center.'}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${order.status === 'Cancelled' ? 'bg-red-400 w-full' : 'bg-green-500 w-2/3'}`}></div>
                  </div>

                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex gap-6 items-start">
                        <div className="w-24 h-24 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                          <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-[#B12704] cursor-pointer transition-colors">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 font-medium">Eligible for FREE Returns</p>
                          <div className="flex gap-4 mt-4">
                            <button 
                              onClick={() => {
                                addToCart(item);
                                toast.success('Added to cart!');
                                navigate('/cart');
                              }}
                              className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black px-4 py-1.5 rounded-md text-xs font-bold shadow-sm border border-[#a88734]"
                            >
                              Buy it again
                            </button>
                            {order.status !== 'Cancelled' && (
                              <>
                                <button 
                                  onClick={() => navigate(`/track/${order.id}`)}
                                  className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-md text-xs font-bold shadow-sm border border-slate-200"
                                >
                                  Track package
                                </button>
                                <button 
                                  onClick={() => setCancelModal({ show: true, orderId: order.id })}
                                  className="text-red-600 hover:text-red-800 text-xs font-bold transition-colors ml-auto"
                                >
                                  Cancel Order
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={48} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No orders found</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">Looks like you haven't placed any orders yet. Start shopping to see them here!</p>
            <Link to="/shop" className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black px-10 py-3 rounded-md font-bold border border-[#a88734] shadow-sm">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

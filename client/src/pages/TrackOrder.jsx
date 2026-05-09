import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronRight, ArrowLeft, Box } from 'lucide-react';

const TrackOrder = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  
  const order = user?.orders?.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Order not found</h2>
        <Link to="/orders" className="text-[#007185] hover:underline font-bold">Back to my orders</Link>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', date: order.date, status: 'completed', icon: <Package size={20} /> },
    { title: 'Shipped', date: order.date, status: 'completed', icon: <Truck size={20} /> },
    { title: 'Out for Delivery', date: 'Arriving Today', status: 'current', icon: <Box size={20} /> },
    { title: 'Delivered', date: 'Expected Tomorrow', status: 'pending', icon: <CheckCircle size={20} /> }
  ];

  return (
    <div className="container mx-auto px-4 py-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/orders" className="flex items-center text-slate-500 hover:text-black transition-colors font-bold mb-8">
          <ArrowLeft size={18} className="mr-2" /> Back to Orders
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-[#232f3e] p-8 text-white">
            <div className="flex flex-wrap justify-between items-end gap-6">
              <div>
                <h1 className="text-3xl font-black mb-2 tracking-tight">Tracking Details</h1>
                <p className="text-[#febd69] font-bold">Order # {order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg">IN TRANSIT</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Steps Timeline */}
            <div className="relative flex flex-col md:flex-row justify-between mb-20 gap-8 md:gap-0">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 hidden md:block -translate-y-1/2">
                <div className="h-full bg-green-500 w-2/3 transition-all duration-1000"></div>
              </div>

              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-6 text-center group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-green-500 text-white scale-110' : 
                    step.status === 'current' ? 'bg-[#febd69] text-[#232f3e] ring-4 ring-[#febd69]/20' : 
                    'bg-white text-slate-300 border border-slate-200'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-black ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="text-[#B12704]" size={20} /> Shipping Address
                </h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="font-black text-slate-900 mb-1">{user.name}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{order.shippingAddress}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Box className="text-[#007185]" size={20} /> Order Summary
                </h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                  {order.items.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{item.name} x{item.quantity}</span>
                      <span className="font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-slate-900">
                    <span>Total Paid</span>
                    <span className="text-[#B12704]">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

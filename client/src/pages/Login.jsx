import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithMobile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success(t.hello + '!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGetOTP = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setShowOTP(true);
      setLoading(false);
      toast.success('OTP sent to ' + mobile);
    }, 1000);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      toast.error('Invalid OTP. Use 1234 for testing.');
      return;
    }
    setLoading(true);
    try {
      await loginWithMobile(mobile);
      toast.success(t.hello + '!');
      navigate('/');
    } catch (err) {
      toast.error('Mobile login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-slate-200"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-2 text-slate-900">{t.signIn}</h2>
          <p className="text-slate-500">Access your ShopZone account</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
          <button 
            onClick={() => {setLoginMethod('email'); setShowOTP(false);}}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${loginMethod === 'email' ? 'bg-white text-[#232f3e] shadow-sm' : 'text-slate-500'}`}
          >
            Email
          </button>
          <button 
            onClick={() => setLoginMethod('mobile')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${loginMethod === 'mobile' ? 'bg-white text-[#232f3e] shadow-sm' : 'text-slate-500'}`}
          >
            Mobile
          </button>
        </div>

        {loginMethod === 'email' ? (
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required 
                  className="w-full border border-slate-300 rounded-md p-3 pl-10 focus:ring-1 focus:ring-[#f0c14b] outline-none"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex justify-between">
                Password
                <Link to="/forgot-password" size="xs" className="text-[#007185] hover:underline">Forgot?</Link>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required 
                  className="w-full border border-slate-300 rounded-md p-3 pl-10 focus:ring-1 focus:ring-[#f0c14b] outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black w-full py-4 rounded-md font-bold shadow-sm border border-[#a88734] transition-all flex items-center justify-center group"
            >
              {loading ? 'Authenticating...' : (
                <>
                  {t.signIn} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {!showOTP ? (
              <form onSubmit={handleGetOTP} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-600 font-bold border-r pr-2">+91</span>
                    <input 
                      type="tel" 
                      required 
                      maxLength="10"
                      className="w-full border border-slate-300 rounded-md p-3 pl-20 focus:ring-1 focus:ring-[#f0c14b] outline-none"
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black w-full py-4 rounded-md font-bold shadow-sm border border-[#a88734] transition-all flex items-center justify-center"
                >
                  {loading ? 'Sending...' : 'Get OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Enter 4-digit OTP</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      required 
                      maxLength="4"
                      className="w-full border border-slate-300 rounded-md p-3 pl-10 tracking-[1em] font-bold focus:ring-1 focus:ring-[#f0c14b] outline-none text-center"
                      placeholder="••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-md mt-4">
                    <p className="text-xs text-blue-700 font-medium text-center">
                      <span className="font-bold">Test Mode:</span> Use OTP <span className="font-bold text-lg mx-1">1234</span> to login.
                    </p>
                  </div>
                  <p className="text-xs text-center text-slate-400 mt-4">Sent to +91 {mobile} <button onClick={() => setShowOTP(false)} className="text-[#007185] hover:underline font-bold">Change</button></p>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#232f3e] hover:bg-[#131921] text-white w-full py-4 rounded-md font-bold shadow-sm transition-all flex items-center justify-center"
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>
              </form>
            )}
          </div>
        )}

        <p className="text-center mt-8 text-slate-500 text-sm">
          Don't have an account? {' '}
          <Link to="/register" className="text-[#B12704] font-bold hover:underline">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

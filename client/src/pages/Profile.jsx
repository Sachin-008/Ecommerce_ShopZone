import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut, Package, Heart, MapPin, Globe, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout, updateUser, updateAddresses } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(user?.name || '');
  const [newCountry, setNewCountry] = React.useState(user?.country || 'India');
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const [newAddr, setNewAddr] = React.useState({ street: '', city: '', zip: '', country: user?.country || 'India' });

  React.useEffect(() => {
    if (user) {
      setNewName(user.name || '');
      setNewCountry(user.country || 'India');
      setNewAddr(prev => ({ ...prev, country: user.country || 'India' }));
    }
  }, [user]);

  const handleAddAddress = () => {
    if (newAddr.street && newAddr.city && newAddr.zip) {
      const addresses = user.addresses || [];
      const newAddresses = [...addresses, { ...newAddr, id: Date.now().toString(), isDefault: addresses.length === 0 }];
      updateAddresses(newAddresses);
      setShowAddressForm(false);
      setNewAddr({ street: '', city: '', zip: '', country: user?.country || 'India' });
      toast.success('Address added');
    }
  };

  const handleDeleteAddress = (id) => {
    const newAddresses = (user.addresses || []).filter(a => a.id !== id);
    updateAddresses(newAddresses);
    toast.success('Address removed');
  };

  const handleSetDefault = (id) => {
    const newAddresses = (user.addresses || []).map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    updateAddresses(newAddresses);
    toast.success('Default address updated');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateProfile = () => {
    if (newName.trim()) {
      updateUser({ name: newName.trim(), country: newCountry.trim() });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-[#232f3e] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-[#febd69] rounded-full flex items-center justify-center text-[#232f3e] text-4xl font-bold shadow-lg">
              {(newName || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-extrabold mb-2">{newName}</h1>
              <p className="text-[#febd69] flex items-center justify-center md:justify-start gap-2">
                <Shield size={16} /> ShopZone Prime Member
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all flex items-center gap-2 border border-white/20"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Account Info */}
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-[#232f3e]">Account Information</h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm font-bold text-[#00a8e1] hover:underline"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                  <User size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Username</p>
                  {isEditing ? (
                    <div className="mt-2">
                      <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#f0c14b]"
                        placeholder="Your Name"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-900 font-bold text-lg">{newName}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                  <Globe size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Country / Region</p>
                  {isEditing ? (
                    <div className="mt-2">
                      <input 
                        type="text" 
                        value={newCountry} 
                        onChange={(e) => setNewCountry(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#f0c14b]"
                        placeholder="e.g. India"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-900 font-bold text-lg">{newCountry}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <button 
                  onClick={handleUpdateProfile}
                  className="bg-[#f0c14b] hover:bg-[#e7bb41] text-black w-full py-3 rounded-md font-bold shadow-md border border-[#a88734] transition-all"
                >
                  Save Profile Changes
                </button>
              )}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Email Address</p>
                  <p className="text-slate-900 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                  <MapPin size={20} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Addresses</p>
                    <button 
                      onClick={() => setShowAddressForm(true)}
                      className="text-xs font-bold text-[#007185] hover:underline flex items-center gap-1"
                    >
                      + Add New
                    </button>
                  </div>

                  {showAddressForm && (
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-4">
                      <input 
                        type="text" 
                        placeholder="Street Address" 
                        className="w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-[#f0c14b]"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({...newAddr, street: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="City" 
                          className="w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-[#f0c14b]"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({...newAddr, city: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="ZIP Code" 
                          className="w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-[#f0c14b]"
                          value={newAddr.zip}
                          onChange={(e) => setNewAddr({...newAddr, zip: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleAddAddress}
                          className="flex-1 bg-[#f0c14b] text-black py-2 rounded-md text-xs font-bold border border-[#a88734]"
                        >
                          Add Address
                        </button>
                        <button 
                          onClick={() => setShowAddressForm(false)}
                          className="flex-1 bg-white text-slate-700 py-2 rounded-md text-xs font-bold border border-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {(user.addresses || []).map((addr) => (
                      <div key={addr.id} className={`p-4 rounded-xl border transition-all ${addr.isDefault ? 'border-[#f0c14b] bg-[#fff9e6]' : 'border-slate-200 bg-white'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            {addr.isDefault && <span className="text-[10px] font-bold text-[#B12704] uppercase tracking-wider mb-1 block">Default</span>}
                            <p className="text-sm font-bold text-slate-900">{addr.street}</p>
                            <p className="text-sm text-slate-600">{addr.city}, {addr.zip}</p>
                            <p className="text-sm text-slate-600">{addr.country}</p>
                          </div>
                          <div className="flex gap-3">
                            {!addr.isDefault && (
                              <button 
                                onClick={() => handleSetDefault(addr.id)}
                                className="text-xs font-bold text-[#007185] hover:underline"
                              >
                                Set Default
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <LogOut size={14} className="rotate-180" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(user.addresses || []).length === 0 && (
                      <p className="text-sm text-slate-500 italic">No addresses saved yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-[#232f3e] border-b pb-4">Quick Links</h2>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => navigate('/orders')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all text-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <Package size={20} className="text-[#00a8e1]" />
                    <span className="font-bold">Track My Orders</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </button>
                <button 
                  onClick={() => navigate('/wishlist')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all text-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <Heart size={20} className="text-red-500" />
                    <span className="font-medium">My Wishlist</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

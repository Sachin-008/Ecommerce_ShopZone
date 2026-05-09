import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token) {
        if (token === 'mock-token-abc' && savedUser) {
          setUser(JSON.parse(savedUser));
          setLoading(false);
          return;
        }
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Helper to sync user data to the mock "database"
  const syncToDB = (userData) => {
    const db = JSON.parse(localStorage.getItem('users_db') || '{}');
    const key = userData.mobile || userData.email;
    db[key] = userData;
    localStorage.setItem('users_db', JSON.stringify(db));
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      syncToDB(res.data.user);
      return res.data;
    } catch (err) {
      console.warn('Backend not reachable, using mock login');
      const db = JSON.parse(localStorage.getItem('users_db') || '{}');
      const existingUser = db[email];
      
      const mockUser = existingUser || { 
        id: 'mock_' + Date.now(), 
        name: 'Demo User', 
        email: email, 
        role: 'user', 
        orders: [], 
        addresses: [] 
      };
      
      localStorage.setItem('token', 'mock-token-abc');
      syncToDB(mockUser);
      return { success: true, token: 'mock-token-abc', user: mockUser };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      syncToDB(res.data.user);
      return res.data;
    } catch (err) {
      const mockUser = { 
        id: 'mock_' + Date.now(), 
        name: name, 
        email: email, 
        role: 'user', 
        orders: [], 
        addresses: [] 
      };
      localStorage.setItem('token', 'mock-token-abc');
      syncToDB(mockUser);
      return { success: true, token: 'mock-token-abc', user: mockUser };
    }
  };

  const updateUser = (updatedData) => {
    let newUser = { ...user, ...updatedData };
    
    // If country is updated, also update it in all saved addresses for consistency
    if (updatedData.country) {
      newUser.addresses = (user?.addresses || []).map(addr => ({
        ...addr,
        country: updatedData.country
      }));
    }
    
    syncToDB(newUser);
  };

  const addOrder = (order) => {
    const currentOrders = user?.orders || [];
    syncToDB({ ...user, orders: [order, ...currentOrders] });
  };

  const updateAddresses = (newAddresses) => {
    syncToDB({ ...user, addresses: newAddresses });
  };

  const cancelOrder = (orderId, reason) => {
    const updatedOrders = (user?.orders || []).map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled', cancelReason: reason } : order
    );
    syncToDB({ ...user, orders: updatedOrders });
  };

  const loginWithMobile = async (mobile) => {
    const db = JSON.parse(localStorage.getItem('users_db') || '{}');
    const existingUser = db[mobile];

    const mockUser = existingUser || { 
      id: 'mock_' + mobile, 
      name: 'User ' + mobile.slice(-4), 
      mobile: mobile, 
      role: 'user',
      country: 'India',
      orders: [],
      addresses: [
        { id: 'addr_1', street: '123 Tech Park', city: 'Bangalore', zip: '560001', country: 'India', isDefault: true }
      ]
    };
    
    localStorage.setItem('token', 'mock-token-abc');
    syncToDB(mockUser);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, loginWithMobile, addOrder, updateAddresses, cancelOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

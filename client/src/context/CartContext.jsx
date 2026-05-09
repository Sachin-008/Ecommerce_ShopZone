import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load user-specific cart on mount or user change
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Save user-specific cart whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity, selected: true }];
    });
  };

  const toggleSelect = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const clearOrderedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !item.selected));
    setAppliedCoupon(null);
  };

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const cartTotal = cartItems.reduce((total, item) =>
    item.selected ? total + item.price * item.quantity : total, 0);

  const shippingFee = cartTotal > 0 && cartTotal < 200 ? 40 : 0;

  // Calculate discount dynamically based on current cart state
  let discount = 0;
  if (appliedCoupon === 'SAVE50') {
    if (cartTotal >= 1000 && cartTotal <= 1500) {
      discount = 50;
    }
  } else if (appliedCoupon === 'SHOPZONE20') {
    if (cartTotal > 10000) {
      discount = Math.round(cartTotal * 0.2);
    }
  }

  const applyCoupon = (code) => {
    if (code === 'SAVE50') {
      if (cartTotal >= 1000 && cartTotal <= 1500) {
        setAppliedCoupon('SAVE50');
        return { success: true, message: '₹50 discount applied!' };
      }
      return { success: false, message: 'SAVE50 is only valid for orders between ₹1,000 and ₹1,500' };
    } else if (code === 'SHOPZONE20') {
      if (cartTotal > 10000) {
        setAppliedCoupon('SHOPZONE20');
        return { success: true, message: '20% discount applied!' };
      }
      return { success: false, message: 'SHOPZONE20 is only valid for orders above ₹10,000' };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const orderTotal = Math.max(0, cartTotal + shippingFee - discount);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      clearOrderedItems, toggleSelect, cartTotal, shippingFee, orderTotal,
      discount, applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN'); // EN or HI

  const translations = {
    EN: {
      search: "Search ShopZone",
      hello: "Hello",
      signIn: "Sign in",
      account: "Account & Lists",
      orders: "Returns & Orders",
      cart: "Cart",
      all: "All Products",
      wishlist: "Wishlist",
      prime: "Prime Member",
      logout: "Logout",
      profile: "Your Profile",
      checkout: "Checkout",
      placeOrder: "Place Order",
      payment: "Payment Method",
      cod: "Cash on Delivery",
      upi: "UPI / PhonePe",
      card: "Credit / Debit Card",
      shipping: "Shipping Address",
      summary: "Order Summary",
      total: "Total",
      subtotal: "Subtotal",
      free: "Free",
      noItems: "No products found",
      clearFilters: "Clear all filters"
    },
    HI: {
      search: "ShopZone में खोजें",
      hello: "नमस्ते",
      signIn: "साइन इन करें",
      account: "खाता और सूचियां",
      orders: "रिटर्न और ऑर्डर",
      cart: "कार्ट",
      all: "सभी उत्पाद",
      wishlist: "विशलिस्ट",
      prime: "प्राइम सदस्य",
      logout: "लॉगआउट",
      profile: "आपकी प्रोफ़ाइल",
      checkout: "चेकआउट",
      placeOrder: "ऑर्डर दें",
      payment: "भुगतान विधि",
      cod: "कैश ऑन डिलीवरी",
      upi: "UPI / PhonePe",
      card: "क्रेडिट / डेबिट कार्ड",
      shipping: "शिपिंग पता",
      summary: "ऑर्डर सारांश",
      total: "कुल",
      subtotal: "उप-कुल",
      free: "मुफ्त",
      noItems: "कोई उत्पाद नहीं मिला",
      clearFilters: "सभी फ़िल्टर साफ़ करें"
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

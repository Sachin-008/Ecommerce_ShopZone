import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { LanguageProvider } from './context/LanguageContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
            <Toaster position="top-center" />
          </CartProvider>
        </WishlistProvider>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>,
)

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAmazonProducts } from '../services/productService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const urlSearchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || 'All';

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchAmazonProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (urlSearchTerm) {
      const term = urlSearchTerm.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'All') {
      const cat = categoryFilter.toLowerCase().trim();
      result = result.filter(p => p.category.toLowerCase().trim() === cat);
    }

    setFilteredProducts(result);
  }, [products, urlSearchTerm, categoryFilter]);

  const [sortBy, setSortBy] = useState('newest');
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Mobiles', 'Deals'];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-[#232f3e]">
          {urlSearchTerm ? `Results for "${urlSearchTerm}"` : categoryFilter !== 'All' ? `${categoryFilter} Collection` : 'All Products'}
        </h1>
        <p className="text-slate-500">Discover millions of products with ShopZone Prime delivery.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                const params = new URLSearchParams(location.search);
                params.set('category', cat);
                navigate(`/shop?${params.toString()}`);
              }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${categoryFilter === cat ? 'bg-[#232f3e] text-[#febd69] shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-white border border-slate-200 px-5 py-2.5 rounded-md text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
              <SlidersHorizontal size={16} />
              <span>Sort: {sortBy === 'newest' ? 'Featured' : sortBy === 'low-high' ? 'Price: Low to High' : 'Price: High to Low'}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-md shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
              <button onClick={() => setSortBy('newest')} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium">Featured</button>
              <button onClick={() => setSortBy('low-high')} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium">Price: Low to High</button>
              <button onClick={() => setSortBy('high-low')} className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 font-medium">Price: High to Low</button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-slate-100 h-[450px] rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <AnimatePresence mode='popLayout'>
                {sortedProducts.map(product => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-32 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <PackageSearch size={48} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching items found</h3>
              <p className="text-slate-500 mb-8">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-[#f0c14b] text-black px-10 py-3 rounded-md font-bold border border-[#a88734] shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;

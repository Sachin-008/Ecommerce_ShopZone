import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredCategories = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400" },
    { name: "Mobiles", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400" },
    { name: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400" },
    { name: "Deals", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#febd69]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#f08804]/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#232f3e] text-[#febd69] text-xs font-bold mb-6">
              SHOPZONE EXCLUSIVE
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-[#232f3e] dark:text-white">
              Everything you need, <br />
              <span className="text-[#f08804]">All in One Zone.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-lg">
              Welcome to ShopZone. Explore millions of products with Prime delivery and unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary flex items-center group bg-[#f0c14b] hover:bg-[#e7bb41] text-black border-[#a88734] rounded-md px-10 py-3 font-medium">
                Browse Catalog <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="glass-card p-4 rotate-3 scale-95 opacity-50 absolute inset-0 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800" 
              alt="ShopZone Premium" 
              className="rounded-2xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Zap />, title: 'Prime Delivery', desc: 'Ships within 24 hours' },
            { icon: <Shield />, title: 'Secure Shopping', desc: '100% encrypted' },
            { icon: <Star />, title: 'Top Brands', desc: 'Handpicked for you' },
            { icon: <TrendingUp />, title: 'Best Prices', desc: 'Everyday deals' }
          ].map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#00a8e1]/10 text-[#00a8e1] flex items-center justify-center rounded-xl group-hover:bg-[#00a8e1] group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h4 className="font-bold text-[#232f3e] dark:text-white mb-1">{f.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-[#232f3e] dark:text-white">Shop by Category</h2>
              <p className="text-slate-500 dark:text-slate-400">Explore our diverse range of products.</p>
            </div>
            <Link to="/shop" className="text-[#00a8e1] hover:underline flex items-center font-bold">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredCategories.map((cat, i) => (
              <Link 
                to={`/shop?category=${cat.name}`}
                key={i}
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

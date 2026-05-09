import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Users, ShoppingBag, Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: 'Fashion', description: '', stock: '', images: [{ public_id: '1', url: '' }]
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data.data);
      } catch (err) {
        // Mock
        setProducts([
          { _id: '1', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', stock: 15 },
          { _id: '2', name: 'Minimalist Leather Watch', price: 180, category: 'Fashion', stock: 8 },
        ]);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    toast.success('Product deleted (mock)');
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center">
          <Plus size={18} className="mr-2" /> Add New Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '$12,450', icon: <TrendingUp className="text-green-500" /> },
          { label: 'Total Orders', value: '156', icon: <ShoppingBag className="text-indigo-500" /> },
          { label: 'Products', value: products.length, icon: <Package className="text-purple-500" /> },
          { label: 'Users', value: '1,204', icon: <Users className="text-pink-500" /> },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Products Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Manage Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-gray-400">{p.category}</td>
                  <td className="px-6 py-4 font-bold text-indigo-400">${p.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock < 10 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

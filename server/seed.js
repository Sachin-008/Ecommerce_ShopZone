const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Premium Wireless Headphones',
    description: 'Experience studio-quality sound with our flagship wireless headphones.',
    price: 299,
    category: 'Electronics',
    stock: 15,
    ratings: 4.8,
    images: [{ public_id: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' }],
    user: '65f1a2b3c4d5e6f7a8b9c0d1' // placeholder
  },
  {
    name: 'Minimalist Leather Watch',
    description: 'A timeless piece for the modern individual.',
    price: 180,
    category: 'Fashion',
    stock: 8,
    ratings: 4.5,
    images: [{ public_id: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' }],
    user: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    name: 'Smart Home Speaker',
    description: 'Voice-controlled assistant for your modern home.',
    price: 150,
    category: 'Electronics',
    stock: 20,
    ratings: 4.2,
    images: [{ public_id: '3', url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800' }],
    user: '65f1a2b3c4d5e6f7a8b9c0d1'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany();
    console.log('Products deleted');

    // Note: You need a real user ID here if you have auth enabled
    // For seeding, we'll bypass the user requirement in the model or use a fixed ID
    await Product.insertMany(products);
    console.log('Sample products seeded');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();

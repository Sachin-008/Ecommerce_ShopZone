import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

const MOCK_PRODUCTS = [
  {
    _id: 'amazon_1',
    name: 'iPhone 15 Pro Max (256 GB) - Natural Titanium',
    description: 'FORGED IN TITANIUM — iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',
    price: 159900,
    category: 'Mobiles',
    ratings: 4.8,
    numOfReviews: 12450,
    stock: 15,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 'iphone', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_2',
    name: 'Ninja Foodi 8-in-1 Digital Air Fry Oven',
    description: 'The Ninja Foodi Digital Air Fry Oven. Air Fry, Air Roast, Air Broil, Bake, Bagel, Toast, Dehydrate, and Keep Warm.',
    price: 18999,
    category: 'Home & Kitchen',
    ratings: 4.8,
    numOfReviews: 32000,
    stock: 20,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 'ninja', url: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_3',
    name: "Men's Slim Fit Cotton Blend Blazer",
    description: 'Premium quality slim fit blazer for men. Perfect for formal occasions and weddings.',
    price: 4599,
    category: 'Fashion',
    ratings: 4.2,
    numOfReviews: 560,
    stock: 40,
    isPrime: true,
    isAmazonChoice: false,
    images: [{ public_id: 'fashion', url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_4',
    name: 'Estée Lauder Advanced Night Repair Serum',
    description: 'Our #1 Serum. Fast Visible Repair and Youth-Generating Power. Every night. Every morning.',
    price: 8900,
    category: 'Beauty',
    ratings: 4.8,
    numOfReviews: 45000,
    stock: 50,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 'estee', url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_5',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray)',
    description: 'Galaxy S24 Ultra is powered by Galaxy AI, which makes it more than just a smartphone.',
    price: 129999,
    category: 'Mobiles',
    ratings: 4.9,
    numOfReviews: 5600,
    stock: 8,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 's24', url: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_6',
    name: 'Dyson V11 Absolute Cordless Vacuum Cleaner',
    description: 'The most powerful, intelligent cordless vacuum. Now with the new anti-tangle Hair screw tool.',
    price: 52900,
    category: 'Deals',
    ratings: 4.8,
    numOfReviews: 15600,
    stock: 5,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 'dyson', url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_7',
    name: 'Minimalist 10% Vitamin C Serum for Glowing Skin',
    description: 'A powerful antioxidant serum with 10% Vitamin C, Acetyl Glucosamine and Centella Asiatica.',
    price: 699,
    category: 'Beauty',
    ratings: 4.6,
    numOfReviews: 12000,
    stock: 200,
    isPrime: true,
    isAmazonChoice: false,
    images: [{ public_id: 'serum', url: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_8',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, and Warmer.',
    price: 9999,
    category: 'Home & Kitchen',
    ratings: 4.7,
    numOfReviews: 120000,
    stock: 30,
    isPrime: true,
    isAmazonChoice: false,
    images: [{ public_id: 'instantpot', url: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=600' }]
  },
  {
    _id: 'amazon_9',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation. 30-hour battery life. Crystal clear hands-free calling.',
    price: 29900,
    category: 'Deals',
    ratings: 4.8,
    numOfReviews: 24000,
    stock: 20,
    isPrime: true,
    isAmazonChoice: true,
    images: [{ public_id: 'sony', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' }]
  }
];

export const fetchAmazonProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    const apiProducts = response.data.map(product => ({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: Math.floor(product.price * 84.5),
      category: mapAmazonCategory(product.category),
      ratings: product.rating.rate,
      numOfReviews: product.rating.count,
      stock: Math.floor(Math.random() * 20) + 1,
      isPrime: Math.random() > 0.3,
      isAmazonChoice: Math.random() > 0.8,
      images: [{ public_id: product.id.toString(), url: product.image }]
    }));

    return [...MOCK_PRODUCTS, ...apiProducts];
  } catch (error) {
    console.error('Error fetching Amazon products:', error);
    return MOCK_PRODUCTS;
  }
};

const mapAmazonCategory = (category) => {
  const mapping = {
    "electronics": "Electronics",
    "jewelery": "Fashion", // Map jewelry to Fashion for better distribution
    "men's clothing": "Fashion",
    "women's clothing": "Fashion"
  };
  return mapping[category] || "Everything Else";
};

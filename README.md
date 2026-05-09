# Aura - Premium Lifestyle Store

Aura is a modern, full-stack eCommerce application designed with a focus on premium aesthetics and smooth user experience. Built using the MERN stack (MongoDB, Express, React, Node.js), it features glassmorphism design, Framer Motion animations, and a secure JWT-based authentication system.

## 🚀 Features

### Frontend
- **Glassmorphism UI**: Premium, modern interface with dark mode.
- **Hero Section**: High-impact animations using Framer Motion.
- **Shop**: Advanced filtering by category, search, and sorting.
- **Cart Management**: Real-time cart updates with local storage persistence.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Protected Routes**: Secure checkout and admin areas.

### Backend
- **RESTful API**: Clean API structure for products, users, and orders.
- **Authentication**: JWT-based login/register with password hashing (Bcrypt).
- **Security**: Protected routes and role-based access control (Admin/User).
- **Database**: Scalable MongoDB schema with Mongoose.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB, JWT.

---

## 📦 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas URI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura-ecommerce
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

3. **Seed Data (Optional)**
   ```bash
   node seed.js
   ```

4. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```

5. **Run the Application**
   - In `server` directory: `npm run dev` (requires nodemon) or `node index.js`
   - In `client` directory: `npm run dev`

---

## 📖 API Documentation

### Auth Routes
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user profile (Private)

### Product Routes
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product details
- `POST /api/products`: Create a product (Admin only)
- `PUT /api/products/:id`: Update product (Admin only)
- `DELETE /api/products/:id`: Delete product (Admin only)

---

## 🎨 UI/UX Highlights
- **Gradients**: Indigo to Purple premium gradients.
- **Micro-interactions**: Hover effects on cards and buttons.
- **Typography**: Clean 'Inter' font for maximum readability.
- **Skeletons**: Loading states for a smoother feel.

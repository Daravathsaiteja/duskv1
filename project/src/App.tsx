import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}
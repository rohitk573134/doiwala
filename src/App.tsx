/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import SignatureItems from './components/SignatureItems';
import WhyChooseUs from './components/WhyChooseUs';
import FullMenu from './components/FullMenu';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import OrderSection from './components/OrderSection';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CartSidebar from './components/CartSidebar';
import { MessageCircle, ShoppingBag } from 'lucide-react';

function MainSite() {
  return (
    <div className="min-h-screen bg-[#fff8f0] relative pb-[70px] md:pb-0">
      <Navbar />
      <Hero />
      <TrustSection />
      <SignatureItems />
      <WhyChooseUs />
      <FullMenu />
      <Gallery />
      <Testimonials />
      <LocationContact />
      <OrderSection />
      <Footer />
      <CartSidebar />

      {/* Floating WhatsApp Button (Desktop & Mobile) */}
      <a
        href="https://wa.me/918900902929?text=Hi%20Doiwala!%20I%20would%20like%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300 p-2"
        aria-label="Chat on WhatsApp"
      >
        <img 
          src="https://cdn.simpleicons.org/whatsapp/white" 
          alt="WhatsApp" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </a>

      {/* Sticky Bottom CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between p-3 border-t border-[#ff9933]/20">
        <div className="flex flex-col">
          <span className="text-xs text-[#3a2c2c]/70 font-medium uppercase tracking-wider">Craving Sweets?</span>
          <span className="text-sm font-bold text-[#3a2c2c]">Order Now</span>
        </div>
        <button
          onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#ff9933] to-[#e68a2e] text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <ShoppingBag size={18} className="mr-2" />
          Order Online
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


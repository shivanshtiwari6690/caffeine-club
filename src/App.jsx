import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import FeaturedCategories from './components/sections/FeaturedCategories.jsx';
import PopularPicks from './components/sections/PopularPicks.jsx';
import Menu from './components/sections/Menu.jsx';
import Story from './components/sections/Story.jsx';
import Experience from './components/sections/Experience.jsx';
import Reviews from './components/sections/Reviews.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import Chatbot from './components/chatbot/Chatbot.jsx';

function MainWebsite() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { openCart, totalItemCount, addToCart } = useCart();

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-50 text-coffee-950 font-sans selection:bg-caramel-500 selection:text-white flex flex-col">
      {/* 1. Sticky Navigation Bar */}
      <Navbar 
        onOpenCart={openCart}
        onOpenChat={handleOpenChat}
        cartCount={totalItemCount}
      />

      <main className="flex-1">
        {/* 2. Cinematic Hero Section */}
        <Hero 
          onExploreMenu={() => {}}
          onOpenChat={handleOpenChat}
        />

        {/* 3. Featured Mood Categories */}
        <FeaturedCategories 
          onSelectCategory={(categoryKey) => {
            setActiveCategory(categoryKey);
          }}
        />

        {/* 4. Club Favourites / Barista Picks */}
        <PopularPicks 
          onExploreAll={() => setActiveCategory("ALL")}
        />

        {/* 5. Complete Interactive Menu & Filter Station */}
        <Menu
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={addToCart}
        />

        {/* 6. Editorial Story Section */}
        <Story />

        {/* 7. Facilities & Experience */}
        <Experience />

        {/* 8. Demo Community Reviews */}
        <Reviews />

        {/* 9. Contact, Visit & Room Reservation Form */}
        <Contact />
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer />

      {/* 11. Slide-Over Cart Drawer & Demo Checkout Modal */}
      <CartDrawer />

      {/* 12. BEAN AI Companion Floating Chat & Viva Evaluation Dock */}
      <Chatbot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainWebsite />
    </CartProvider>
  );
}

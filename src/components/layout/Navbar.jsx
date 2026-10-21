import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Sparkles, Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenCart = () => {}, onOpenChat = () => {}, cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#story' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-50/90 backdrop-blur-md border-b border-cream-200/80 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="group flex items-center gap-2.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-caramel-500 rounded-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-coffee-950 text-cream-50 flex items-center justify-center shadow-xs group-hover:bg-caramel-500 transition-colors duration-300">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black tracking-tight text-lg text-coffee-950 leading-none">
              CAFFEINE CLUB
            </span>
            <span className="font-sans text-[10px] tracking-widest text-coffee-600 uppercase font-semibold mt-0.5">
              Brew. Connect. Belong.
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-coffee-800 hover:text-caramel-600 transition-colors relative py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-caramel-500 rounded-md"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons: Cart & BEAN AI */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Order / Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label={`Open order cart with ${cartCount} items`}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl border border-cream-300 hover:border-coffee-950 bg-cream-100/80 hover:bg-cream-200 text-coffee-950 text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-caramel-500"
          >
            <ShoppingBag className="w-4 h-4 text-coffee-800" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-mono font-bold text-white bg-caramel-500 rounded-full animate-scale">
                {cartCount}
              </span>
            )}
          </button>

          {/* Ask BEAN AI Companion */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-coffee-950 hover:bg-caramel-600 text-cream-50 text-xs font-semibold tracking-wide transition duration-300 shadow-md shadow-coffee-950/20 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-caramel-500"
          >
            <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
            <span>Ask BEAN ✦</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label={`Cart with ${cartCount} items`}
            className="relative p-2 rounded-lg bg-cream-100 border border-cream-200 text-coffee-950"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-mono font-bold text-white bg-caramel-500 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-cream-100 border border-cream-200 text-coffee-950 hover:bg-cream-200 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream-50/98 backdrop-blur-xl border-b border-cream-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-coffee-950 hover:text-caramel-600 py-1 border-b border-cream-200/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-coffee-400" />
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-3 rounded-xl bg-coffee-950 text-cream-50 font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-coffee-950/20"
            >
              <Sparkles className="w-4 h-4 text-caramel-400" />
              <span>Ask BEAN ✦ (AI Companion)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

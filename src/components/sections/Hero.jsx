import React from 'react';
import { Sparkles, ArrowDown, Clock, ShieldCheck, MapPin, Coffee } from 'lucide-react';

export default function Hero({ onExploreMenu = () => {}, onOpenChat = () => {} }) {
  const handleScrollToMenu = (e) => {
    e.preventDefault();
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      const navOffset = 80;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    onExploreMenu();
  };

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-coffee-950 text-cream-50"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop" 
          alt="Caffeine Club Specialty Café Interior"
          className="w-full h-full object-cover object-center opacity-25 scale-105 animate-pulse-slow"
        />
        {/* Gradients to blend seamless warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-950/90 via-coffee-950/40 to-coffee-950/90"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 md:space-y-10 my-auto">
        {/* Operational Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-coffee-900/90 border border-coffee-700/60 backdrop-blur-md shadow-lg shadow-black/40 text-xs font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-mono text-caramel-300 font-semibold tracking-wider uppercase">
            OPEN TODAY
          </span>
          <span className="text-coffee-600 font-bold">•</span>
          <span className="text-cream-100/90 font-mono">
            8:00 AM — 10:00 PM
          </span>
        </div>

        {/* Brand & Main Headline */}
        <div className="space-y-4">
          <div className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-caramel-400 font-bold">
            CAFFEINE CLUB • SPECIALTY COFFEE & THIRD PLACE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight text-cream-50 leading-[1.08]">
            Good coffee.<br />
            <span className="italic font-normal text-caramel-400">Better company.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-coffee-100/80 font-sans leading-relaxed font-light">
            Specialty coffee, comfort food and a space made to stay awhile.
          </p>

          <p className="font-serif italic text-sm sm:text-base text-caramel-300/80 tracking-wide">
            “Brew. Connect. Belong.”
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-caramel-500/25 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>EXPLORE THE MENU</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-coffee-900/90 hover:bg-coffee-800 text-cream-100 font-semibold text-sm tracking-wider transition-all duration-300 border border-coffee-700/80 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-caramel-400" />
            <span>ASK BEAN ✦</span>
          </button>
        </div>

        {/* Highlights Row */}
        <div className="pt-8 border-t border-coffee-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-coffee-900/40 p-3.5 rounded-xl border border-coffee-800/50">
            <span className="text-[10px] uppercase font-mono tracking-wider text-caramel-400/90 block">Origin Roast</span>
            <p className="text-xs sm:text-sm font-semibold text-cream-100 mt-0.5">100% Chikmagalur Arabica</p>
          </div>
          <div className="bg-coffee-900/40 p-3.5 rounded-xl border border-coffee-800/50">
            <span className="text-[10px] uppercase font-mono tracking-wider text-caramel-400/90 block">Workplace Ready</span>
            <p className="text-xs sm:text-sm font-semibold text-cream-100 mt-0.5">150 Mbps Fiber & AC Outlets</p>
          </div>
          <div className="bg-coffee-900/40 p-3.5 rounded-xl border border-coffee-800/50">
            <span className="text-[10px] uppercase font-mono tracking-wider text-caramel-400/90 block">Scratch Bakery</span>
            <p className="text-xs sm:text-sm font-semibold text-cream-100 mt-0.5">Fresh French Butter Bakes</p>
          </div>
          <div className="bg-coffee-900/40 p-3.5 rounded-xl border border-coffee-800/50">
            <span className="text-[10px] uppercase font-mono tracking-wider text-caramel-400/90 block">AI Concierge</span>
            <p className="text-xs sm:text-sm font-semibold text-cream-100 mt-0.5">BEAN ✦ Live Guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

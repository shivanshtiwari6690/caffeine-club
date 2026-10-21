import React from 'react';
import { Coffee, Sparkles, MapPin, Clock, ArrowUp, Globe, Share2, MessageCircle } from 'lucide-react';
import { CAFE_KNOWLEDGE } from '../../data/cafeKnowledge.js';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-coffee-950 text-cream-50 pt-20 pb-12 border-t border-coffee-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-caramel-500 text-white flex items-center justify-center shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-black tracking-tight text-xl text-cream-50 block leading-none">
                  CAFFEINE CLUB
                </span>
                <span className="font-sans text-[11px] tracking-widest text-caramel-400 uppercase font-semibold mt-0.5 block">
                  Brew. Connect. Belong.
                </span>
              </div>
            </div>

            <p className="text-xs text-coffee-100/70 max-w-sm leading-relaxed font-sans">
              Specialty single-origin coffees, scratch-made baked goods, and an inspiring third-place study sanctuary for thinkers, students, and creators.
            </p>

            {/* Social Placeholder Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social-web"
                aria-label="Caffeine Club Web"
                className="w-8 h-8 rounded-lg bg-coffee-900 border border-coffee-800 flex items-center justify-center text-coffee-100/80 hover:text-caramel-400 hover:border-caramel-500 transition"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#social-chat"
                aria-label="Community Channel"
                className="w-8 h-8 rounded-lg bg-coffee-900 border border-coffee-800 flex items-center justify-center text-coffee-100/80 hover:text-caramel-400 hover:border-caramel-500 transition"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#social-share"
                aria-label="Share Café link"
                className="w-8 h-8 rounded-lg bg-coffee-900 border border-coffee-800 flex items-center justify-center text-coffee-100/80 hover:text-caramel-400 hover:border-caramel-500 transition"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-cream-100">Explore</h4>
            <ul className="space-y-2.5 text-xs text-coffee-100/70">
              <li><a href="#home" className="hover:text-caramel-400 transition">Home</a></li>
              <li><a href="#menu" className="hover:text-caramel-400 transition">The Menu (22 Items)</a></li>
              <li><a href="#story" className="hover:text-caramel-400 transition">Our Origin Story</a></li>
              <li><a href="#experience" className="hover:text-caramel-400 transition">Café Facilities</a></li>
              <li><a href="#contact" className="hover:text-caramel-400 transition">Visit & Contact</a></li>
            </ul>
          </div>

          {/* Col 4: Operational Hours */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-cream-100">Hours</h4>
            <div className="space-y-2 text-xs text-coffee-100/70 font-mono">
              <p className="text-cream-100">Monday — Sunday</p>
              <p className="text-caramel-300 font-bold">8:00 AM — 10:00 PM</p>
              <p className="text-[11px] text-coffee-100/50">Kitchen: Closes 9:30 PM</p>
              <p className="text-[11px] text-coffee-100/50">Study Mezzanine: Open All Day</p>
            </div>
          </div>

          {/* Col 5: Location Summary */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-cream-100">Location</h4>
            <div className="space-y-2 text-xs text-coffee-100/70">
              <p className="leading-relaxed">
                42 Knowledge Park Boulevard, Innovation Quarter, Bengaluru, KA 560103
              </p>
              <p className="font-mono text-coffee-100/50 text-[11px]">
                hello@caffeineclub.cafe
              </p>
              <p className="font-mono text-coffee-100/50 text-[11px]">
                +91 80 4920 1888
              </p>
            </div>
          </div>
        </div>

        {/* Responsible AI Disclaimer & Transparency Bar */}
        <div className="bg-coffee-900/80 rounded-2xl p-5 border border-coffee-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-caramel-300">
            <Sparkles className="w-4 h-4 text-caramel-400 shrink-0" />
            <span className="font-medium">
              <strong>BEAN is an AI-powered café assistant.</strong> Grounded in verified Caffeine Club knowledge. Never hallucinating unverified items or altering prices.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-1.5 text-xs text-coffee-100/70 hover:text-caramel-400 font-mono transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-coffee-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-coffee-100/50 font-mono">
          <p>© {new Date().getFullYear()} CAFFEINE CLUB. All rights reserved. University Computer Science Project.</p>
          <p>Built with React, Vite, Tailwind CSS & Responsible AI Grounding.</p>
        </div>
      </div>
    </footer>
  );
}

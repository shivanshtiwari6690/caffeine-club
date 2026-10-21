import React from 'react';
import { Coffee, Heart, Users, Sparkles, BookOpen } from 'lucide-react';

export default function Story() {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-coffee-950 text-cream-50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coffee-900 border border-coffee-800 text-xs font-semibold text-caramel-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR PHILOSOPHY & ORIGIN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-cream-100">
            More than a cup of coffee.
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-caramel-300">
            “Caffeine Club was created around a simple idea: coffee tastes better when there’s somewhere worth staying.”
          </p>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Photography Collage */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-coffee-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" 
                alt="Barista brewing specialty pour-over coffee at Caffeine Club" 
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-transparent"></div>
            </div>

            {/* Overlapping Floating Metric Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-coffee-900/95 backdrop-blur-md p-5 rounded-2xl border border-coffee-700/80 shadow-2xl max-w-xs space-y-1">
              <span className="font-mono text-xs uppercase text-caramel-400 font-bold block">The Third Place</span>
              <p className="text-xs text-cream-100/90 leading-relaxed font-sans">
                Neither just home nor just the office. A warm, creative sanctuary where ideas brew freely.
              </p>
            </div>
          </div>

          {/* Right: Narrative Story Text */}
          <div className="space-y-6 text-coffee-100/85 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              In 2024, <strong className="text-cream-100">Caffeine Club</strong> was born out of frustration with sterile coffee chains that hurried customers out the door and noisy spaces that made deep focus impossible.
            </p>
            <p>
              We wanted to build an authentic <em>third place</em> — a space crafted specifically for university students studying for late-night exams, software engineers building open-source tools, writers polishing scripts, and friends catching up over artisanal bakes.
            </p>
            <p>
              Every batch of beans is ethically sourced from single-origin estates across Chikmagalur and Coorg, calibrated to precise extraction ratios, and served in ceramics crafted by local artisans.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-coffee-800/80">
              <div className="space-y-1">
                <Coffee className="w-5 h-5 text-caramel-400" />
                <h4 className="font-serif font-bold text-sm text-cream-100">Uncompromising Craft</h4>
                <p className="text-xs text-coffee-100/60 leading-normal">Precision roasted Arabica extractions.</p>
              </div>
              <div className="space-y-1">
                <Users className="w-5 h-5 text-caramel-400" />
                <h4 className="font-serif font-bold text-sm text-cream-100">Social Belonging</h4>
                <p className="text-xs text-coffee-100/60 leading-normal">Collaborative communal tables & quiet study zones.</p>
              </div>
              <div className="space-y-1">
                <Sparkles className="w-5 h-5 text-caramel-400" />
                <h4 className="font-serif font-bold text-sm text-cream-100">Smart Technology</h4>
                <p className="text-xs text-coffee-100/60 leading-normal">BEAN AI concierge & ultra-fast fiber connectivity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

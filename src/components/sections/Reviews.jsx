import React from 'react';
import { DEMO_REVIEWS } from '../../data/communityData.js';
import { Star, MessageSquareQuote, ShieldAlert, Sparkles } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-50 text-coffee-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-coffee-700">
              <Sparkles className="w-3.5 h-3.5 text-caramel-500" />
              <span>COMMUNITY VOICES & WORKSPACE CULTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-coffee-950">
              What the Club is saying.
            </h2>
            <p className="text-sm text-coffee-600 max-w-xl leading-relaxed">
              Stories from our regular community of university students, researchers, developers, and specialty coffee lovers.
            </p>
          </div>

          {/* Academic Transparency Badge */}
          <div className="flex items-center gap-2 bg-cream-100/90 border border-cream-300 px-3.5 py-2 rounded-xl text-xs text-coffee-700 font-mono">
            <ShieldAlert className="w-4 h-4 text-caramel-600 shrink-0" />
            <span>Fictional Testimonials (Academic Demo)</span>
          </div>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-cream-100/70 hover:bg-cream-100 p-8 rounded-3xl border border-cream-200 hover:border-caramel-400/80 transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Star Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-caramel-500 text-caramel-500" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-coffee-300" />
                </div>

                {/* Comment Text */}
                <p className="text-sm text-coffee-800 leading-relaxed font-sans italic">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-4 border-t border-cream-200/80 flex items-center gap-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover border border-cream-300"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-coffee-950">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-coffee-600 block">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

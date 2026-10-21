import React from 'react';
import { 
  Wifi, 
  Laptop, 
  Zap, 
  Sun, 
  GraduationCap, 
  Utensils, 
  Armchair, 
  Users,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CAFE_KNOWLEDGE } from '../../data/cafeKnowledge.js';

const ICON_MAP = {
  Wifi: Wifi,
  Zap: Zap,
  Laptop: Laptop,
  Sun: Sun,
  GraduationCap: GraduationCap,
  Utensils: Utensils,
  Armchair: Armchair,
  Users: Users
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-50 text-coffee-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-coffee-700">
              <Sparkles className="w-3.5 h-3.5 text-caramel-500" />
              <span>DESIGNED TO STAY AWHILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-coffee-950">
              The Caffeine Club Experience
            </h2>
            <p className="text-sm text-coffee-600 max-w-xl leading-relaxed">
              Whether you need six uninterrupted hours of coding, a sunny table for reading, or a project room for group collaboration — our space is engineered for your day.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-coffee-700 bg-cream-100 px-4 py-2.5 rounded-xl border border-cream-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All amenities complimentary with any order</span>
          </div>
        </div>

        {/* 8 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAFE_KNOWLEDGE.facilities.map((facility) => {
            const Icon = ICON_MAP[facility.icon] || Sparkles;
            return (
              <div 
                key={facility.id}
                className="bg-cream-100/70 hover:bg-cream-100 p-6 rounded-2xl border border-cream-200 hover:border-caramel-400/80 transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-coffee-950 border border-cream-200 flex items-center justify-center group-hover:bg-caramel-500 group-hover:text-white transition-colors duration-300 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-coffee-950 group-hover:text-caramel-600 transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-coffee-600 leading-relaxed mt-2 font-sans">
                      {facility.details}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-cream-200/60 flex items-center gap-1.5 text-[10px] font-mono uppercase text-coffee-500 font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Available Daily</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

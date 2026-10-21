import React from 'react';
import { ArrowRight, Coffee, Snowflake, Croissant, UtensilsCrossed, CakeSlice } from 'lucide-react';

export const MOOD_CATEGORIES = [
  {
    id: "cat-sig",
    title: "Signature Coffee",
    subtitle: "Calibrated espresso extractions & velvety micro-foam.",
    filterKey: "COFFEE",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    icon: Coffee,
    itemCount: "6 Brews"
  },
  {
    id: "cat-cold",
    title: "Cold Coffee",
    subtitle: "Slow-steeped 16-hour roasts, iced lattes & cascara tonics.",
    filterKey: "COLD",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop",
    icon: Snowflake,
    itemCount: "5 Chilled"
  },
  {
    id: "cat-bake",
    title: "Fresh Bakes",
    subtitle: "Flaky Normandy butter croissants and artisanal pastries.",
    filterKey: "FOOD",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    icon: Croissant,
    itemCount: "Baked Daily"
  },
  {
    id: "cat-plate",
    title: "Café Plates",
    subtitle: "Avocado sourdough tartines, truffle pasta & pressed panini.",
    filterKey: "FOOD",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    icon: UtensilsCrossed,
    itemCount: "Kitchen Fresh"
  },
  {
    id: "cat-dessert",
    title: "Desserts",
    subtitle: "San Sebastián Basque cheesecakes, brownies & tiramisu.",
    filterKey: "DESSERTS",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
    icon: CakeSlice,
    itemCount: "Artisanal"
  }
];

export default function FeaturedCategories({ onSelectCategory = () => {} }) {
  const handleCategoryClick = (filterKey) => {
    onSelectCategory(filterKey);
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
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50 text-coffee-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cream-200 pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-caramel-600 font-bold">
              CURATED SELECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-coffee-950">
              Whatever your mood,<br />
              <span className="italic font-normal text-caramel-600">we’ve got your cup.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-coffee-600 leading-relaxed font-sans">
            Crafted for early morning coding sprints, relaxed afternoon conversations, and late-night creative flow. Select a category to jump directly into the menu.
          </p>
        </div>

        {/* 5 Mood Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {MOOD_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.filterKey)}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-200 hover:border-caramel-400 flex flex-col justify-between p-6"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(cat.filterKey);
                  }
                }}
                aria-label={`Filter menu by ${cat.title}`}
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/60 to-coffee-950/20 group-hover:via-coffee-950/40 transition-colors duration-500"></div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cream-50/20 backdrop-blur-md text-cream-50 flex items-center justify-center group-hover:bg-caramel-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-caramel-300 bg-coffee-900/80 px-2.5 py-1 rounded-full border border-coffee-700/60 backdrop-blur-xs">
                    {cat.itemCount}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2 text-cream-50">
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-caramel-300 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-cream-100/80 leading-relaxed font-sans line-clamp-2">
                    {cat.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-caramel-400 group-hover:text-white transition-colors duration-300">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

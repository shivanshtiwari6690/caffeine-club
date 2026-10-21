import React from 'react';
import { MENU_ITEMS } from '../../data/menuData.js';
import { useCart } from '../../context/CartContext.jsx';
import { Sparkles, Plus, Leaf, Star, ArrowRight } from 'lucide-react';

export default function PopularPicks({ onExploreAll = () => {} }) {
  const { addToCart } = useCart();

  // Pick top 4-5 signature favorites
  const favorites = MENU_ITEMS.filter((item) => item.isPopular && item.isChefPick).slice(0, 4);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-coffee-950 text-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-coffee-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coffee-900 border border-coffee-800 text-xs font-semibold text-caramel-400">
              <Star className="w-3.5 h-3.5 fill-caramel-400" />
              <span>THE BARISTA & KITCHEN SELECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-cream-100">
              Club Favourites
            </h2>
            <p className="text-sm text-coffee-100/70 max-w-xl leading-relaxed">
              Our most celebrated pours and plates. Hand-pulled espresso, slow-steeped cold brews, and oven-fresh artisan comfort food.
            </p>
          </div>

          <a
            href="#menu"
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-caramel-400 hover:text-caramel-300 transition"
          >
            <span>View Complete 22-Item Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-coffee-900/90 rounded-2xl overflow-hidden border border-coffee-800/80 hover:border-caramel-500/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-coffee-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-caramel-500 text-[10px] font-semibold text-white uppercase tracking-wider">
                      Signature Pick
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    {item.isVegan ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sage-600 text-white text-[10px] font-semibold">
                        <Leaf className="w-3 h-3" /> Vegan
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-semibold">
                        Vegetarian
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg text-cream-100 group-hover:text-caramel-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-caramel-400 whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-coffee-100/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => addToCart(item, 1)}
                  className="w-full py-2.5 px-4 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-white text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-caramel-500/20 active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Order • ₹{item.price}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

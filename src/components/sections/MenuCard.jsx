import React, { useState } from 'react';
import { Plus, Check, Leaf, Info, AlertTriangle } from 'lucide-react';

export default function MenuCard({ item, onAddToCart, onSelect }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-cream-100/80 hover:bg-cream-100 rounded-2xl overflow-hidden border border-cream-200 hover:border-caramel-400 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group cursor-pointer"
      role="article"
      aria-label={`${item.name}, ₹${item.price}`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-48 overflow-hidden bg-coffee-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/70 via-transparent to-transparent"></div>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-coffee-950/85 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-cream-100">
              {item.category}
            </span>
            {item.isPopular && (
              <span className="px-2 py-0.5 rounded-md bg-caramel-500 text-[10px] font-semibold text-white shadow-xs">
                Popular
              </span>
            )}
            {item.isChefPick && (
              <span className="px-2 py-0.5 rounded-md bg-coffee-900 border border-caramel-400/40 text-[10px] font-semibold text-caramel-300">
                Chef's Pick
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            {item.isVegan ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sage-600 text-white text-[10px] font-semibold">
                <Leaf className="w-3 h-3" /> Vegan
              </span>
            ) : item.isVegetarian && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-semibold">
                Veg
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-lg text-coffee-950 leading-snug group-hover:text-caramel-600 transition-colors">
              {item.name}
            </h3>
            <span className="font-mono text-base font-bold text-caramel-600 whitespace-nowrap">
              ₹{item.price}
            </span>
          </div>

          <p className="text-xs text-coffee-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase text-coffee-500 block mb-0.5">Ingredients:</span>
            <p className="text-[11px] text-coffee-700 line-clamp-1 italic">
              {item.ingredients.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer: Allergen Indicator & Add Button */}
      <div className="p-5 pt-0 space-y-3">
        {item.allergens.length > 0 ? (
          <div className="text-[10px] text-coffee-600 bg-cream-200/50 px-2.5 py-1 rounded-md border border-cream-200/80 flex items-center justify-between">
            <span>
              <strong className="text-terracotta-700">Contains: </strong>
              {item.allergens.join(', ')}
            </span>
            <Info className="w-3 h-3 text-coffee-400 shrink-0 ml-1" />
          </div>
        ) : (
          <div className="text-[10px] text-sage-700 bg-sage-100/50 px-2.5 py-1 rounded-md border border-sage-200/50">
            No common food allergens listed
          </div>
        )}

        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-coffee-950 hover:bg-caramel-500 text-cream-50'
          }`}
          aria-label={`Add ${item.name} to order for ₹${item.price}`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 animate-scale" />
              <span>Added to Order ✓</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

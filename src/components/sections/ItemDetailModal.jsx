import React, { useState } from 'react';
import { X, Plus, Minus, ShieldCheck, AlertTriangle, Leaf, Coffee, ShoppingBag } from 'lucide-react';

export default function ItemDetailModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
    >
      <div 
        className="bg-cream-50 rounded-3xl max-w-xl w-full overflow-hidden border border-cream-200 shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-coffee-950">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-black/30"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-coffee-950/70 hover:bg-coffee-950 text-cream-50 flex items-center justify-center transition border border-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Dietary Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-coffee-950/90 text-cream-100 font-mono text-[11px] uppercase tracking-wider">
              {item.category}
            </span>
            {item.isPopular && (
              <span className="px-2.5 py-1 rounded-lg bg-caramel-500 text-white font-semibold text-[11px]">
                ✦ Club Favourite
              </span>
            )}
            {item.isVegan ? (
              <span className="px-2.5 py-1 rounded-lg bg-sage-600 text-white font-semibold text-[11px] flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> 100% Vegan
              </span>
            ) : item.isVegetarian && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-semibold text-[11px]">
                Vegetarian
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-4 border-b border-cream-200 pb-4">
            <div>
              <h2 id="modal-item-title" className="text-2xl sm:text-3xl font-serif font-black text-coffee-950">
                {item.name}
              </h2>
              <span className="text-xs text-coffee-600 font-mono uppercase tracking-wider block mt-1">
                Serving Temperature: {item.temperature || 'Prepared Fresh'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-caramel-600 block">
                ₹{item.price}
              </span>
              <span className="text-[10px] text-coffee-500 font-mono">Taxes included</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-coffee-500 font-semibold">
              Description
            </h4>
            <p className="text-sm text-coffee-700 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          {/* Detailed Ingredients */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-coffee-500 font-semibold">
              Culinary Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-cream-100 border border-cream-200 text-xs text-coffee-800 font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergen & Safety Guardrail Section */}
          <div className="bg-cream-100/90 rounded-2xl p-4 border border-cream-200 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-terracotta-600" />
              <h4 className="text-xs font-mono uppercase tracking-widest text-coffee-950 font-bold">
                Allergen Disclosure
              </h4>
            </div>

            {item.allergens.length > 0 ? (
              <p className="text-xs text-coffee-800">
                <strong className="text-terracotta-700">Contains: </strong>
                {item.allergens.join(', ')}
              </p>
            ) : (
              <p className="text-xs text-sage-700">
                No common allergens formulated in this recipe.
              </p>
            )}

            <p className="text-[11px] text-coffee-600 leading-relaxed pt-1 border-t border-cream-200/80">
              <span className="font-semibold">Responsible Cross-Contamination Notice:</span> Our open kitchen handles gluten, dairy, tree nuts, and eggs. We cannot guarantee 100% allergen-free preparation. Severe allergy holders must notify counter staff directly.
            </p>
          </div>
        </div>

        {/* Footer Actions: Quantity Stepper & Add to Order */}
        <div className="p-6 bg-cream-100/80 border-t border-cream-200 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-cream-300 rounded-xl bg-white overflow-hidden shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2.5 text-coffee-800 hover:bg-cream-100 disabled:opacity-40 transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-coffee-950">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 text-coffee-800 hover:bg-cream-100 transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-white font-semibold text-sm tracking-wide transition-all shadow-md shadow-caramel-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add {quantity} to Order • ₹{item.price * quantity}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

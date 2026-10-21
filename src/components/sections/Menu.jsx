import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../../data/menuData.js';
import MenuFilter from './MenuFilter.jsx';
import MenuCard from './MenuCard.jsx';
import ItemDetailModal from './ItemDetailModal.jsx';
import { Sparkles, Utensils, RotateCcw } from 'lucide-react';

export default function Menu({ activeCategory, onSelectCategory, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter & Sort Pipeline
  const filteredAndSortedItems = useMemo(() => {
    let result = MENU_ITEMS.filter((item) => {
      // 1. Text Search matching name, description, ingredients
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // 2. Category matching
      if (activeCategory === "ALL") return true;
      if (activeCategory === "COFFEE") return item.category.includes("COFFEE");
      if (activeCategory === "COLD") return item.temperature === "Cold" || item.category === "COLD COFFEE";
      if (activeCategory === "FOOD") return ["BREAKFAST", "CAFÉ PLATES", "BAKERY"].includes(item.category);
      if (activeCategory === "DESSERTS") return item.category === "DESSERTS";
      if (activeCategory === "VEGAN") return item.isVegan;

      return true;
    });

    // 3. Sorting logic
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "featured") {
      // Prioritize chef's picks and popular items
      result.sort((a, b) => (b.isChefPick ? 1 : 0) + (b.isPopular ? 1 : 0) - ((a.isChefPick ? 1 : 0) + (a.isPopular ? 1 : 0)));
    }

    return result;
  }, [searchQuery, activeCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery("");
    onSelectCategory("ALL");
    setSortOption("featured");
  };

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50 text-coffee-950">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-coffee-700">
              <Sparkles className="w-3.5 h-3.5 text-caramel-500" />
              <span>SPECIALTY ROASTS & CHEF SPECIALTIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-coffee-950">
              The Club Menu
            </h2>
            <p className="text-sm text-coffee-600 max-w-xl leading-relaxed">
              Every bean is micro-roasted in small batches. All food is prepared fresh from scratch daily in our open kitchen. Tap any card for full ingredient & allergen breakdowns.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-coffee-600 bg-cream-100 px-4 py-2 rounded-xl border border-cream-200">
            <span>Prices in Indian Rupees (₹)</span>
            <span>•</span>
            <span>Kitchen Closes 9:30 PM</span>
          </div>
        </div>

        {/* Filter Controls Component */}
        <MenuFilter
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalResults={filteredAndSortedItems.length}
        />

        {/* Menu Cards Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-cream-100 rounded-3xl border border-cream-200 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cream-200 text-coffee-600 flex items-center justify-center mx-auto">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-coffee-950">
              No matching café items found
            </h3>
            <p className="text-xs text-coffee-600 px-6">
              We couldn't find any items matching <span className="font-mono font-semibold">"{searchQuery}"</span> under category <span className="font-mono font-semibold">"{activeCategory}"</span>.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coffee-950 text-cream-50 text-xs font-semibold hover:bg-caramel-500 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}

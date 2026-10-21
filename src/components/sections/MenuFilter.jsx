import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MENU_CATEGORIES } from '../../data/menuData.js';

export default function MenuFilter({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalResults
}) {
  return (
    <div className="space-y-6">
      {/* Search Bar & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Real-Time Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-500" />
          <input
            type="text"
            placeholder="Search by item name, ingredient, or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-cream-100 border border-cream-200 rounded-xl text-xs text-coffee-950 placeholder:text-coffee-600/60 focus:outline-hidden focus:border-caramel-500 focus:ring-1 focus:ring-caramel-500 transition"
            aria-label="Search café menu"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-700 transition"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Controls & Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-cream-100 border border-cream-200 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-coffee-600" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-coffee-950 focus:outline-hidden cursor-pointer"
              aria-label="Sort menu items"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          <span className="font-mono text-xs text-coffee-600 bg-cream-100/80 px-3 py-2 rounded-xl border border-cream-200 whitespace-nowrap">
            {totalResults} items
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {MENU_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-coffee-950 text-cream-50 shadow-md shadow-coffee-950/20 scale-102'
                  : 'bg-cream-100 text-coffee-700 hover:bg-cream-200 border border-cream-200/80'
              }`}
            >
              {category === "VEGAN" ? "🌱 VEGAN" : category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

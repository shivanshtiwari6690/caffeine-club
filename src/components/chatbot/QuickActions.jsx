import React from 'react';

const ACTIONS = [
  { label: "☕ Recommend a coffee", query: "What should I drink if I like sweet coffee?" },
  { label: "🌱 Show me vegan options", query: "Show me all 100% vegan food and drink options." },
  { label: "🥜 Check allergens", query: "What allergens are handled in your kitchen?" },
  { label: "🕐 Opening hours", query: "What are your opening hours and kitchen closing times?" },
  { label: "🍰 Recommend dessert", query: "What desserts do you recommend?" },
  { label: "💻 Can I work here?", query: "Can I bring my laptop to work? What are the Wi-Fi and power outlet policies?" }
];

export default function QuickActions({ onSelectAction }) {
  return (
    <div className="space-y-1.5 pt-2">
      <span className="text-[10px] uppercase font-mono tracking-wider text-coffee-400 font-semibold block px-1">
        Quick Inquiries:
      </span>
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {ACTIONS.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onSelectAction(action.query)}
            className="px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-200 text-coffee-800 text-[11px] font-medium whitespace-nowrap transition cursor-pointer shadow-2xs active:scale-95"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Coffee, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  // Format message text with line breaks and bullet points
  const formatText = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-0.5">
            {line.substring(2)}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {/* BEAN Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-coffee-950 text-caramel-400 border border-coffee-800 flex items-center justify-center shrink-0 shadow-xs mt-1">
          <Coffee className="w-4 h-4" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`max-w-[82%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm shadow-xs ${
            isUser
              ? 'bg-caramel-500 text-white rounded-tr-xs'
              : 'bg-cream-100 text-coffee-950 border border-cream-200 rounded-tl-xs'
          }`}
        >
          <div className="space-y-1">
            {formatText(message.text)}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center gap-2 px-1 text-[10px] text-coffee-400 font-mono">
          {!isUser && message.verified && (
            <span className="inline-flex items-center gap-1 text-sage-700 bg-sage-100/60 px-1.5 py-0.5 rounded border border-sage-200/50">
              <ShieldCheck className="w-3 h-3 text-sage-600" />
              <span>Grounded Knowledge</span>
            </span>
          )}
          <span>{message.timestamp}</span>
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-cream-200 text-coffee-700 border border-cream-300 flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

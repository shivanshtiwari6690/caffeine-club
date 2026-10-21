import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  Coffee, 
  ShieldAlert, 
  MessageSquare,
  Bot
} from 'lucide-react';
import ChatMessage from './ChatMessage.jsx';
import QuickActions from './QuickActions.jsx';
import StressTestDock from './StressTestDock.jsx';
import { sendChatMessage } from '../../services/chatbotService.js';

const INITIAL_MESSAGE = {
  id: 'bean-init',
  sender: 'bean',
  text: "Hey! I’m BEAN 👋\n\nI’m the AI café companion at Caffeine Club.\n\nAsk me about our menu, recommendations, allergens, opening hours or café facilities.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  verified: true
};

export default function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'stress-test'

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (activeTab === 'chat') {
        inputRef.current?.focus();
      }
    }
  }, [messages, isOpen, activeTab]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6);
      const res = await sendChatMessage(query, historyPayload);

      const beanMsg = {
        id: `bean-${Date.now()}`,
        sender: 'bean',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verified: res.verified
      };

      setMessages((prev) => [...prev, beanMsg]);
    } catch (err) {
      const errorMsg = {
        id: `bean-err-${Date.now()}`,
        sender: 'bean',
        text: "Sorry — I’m having trouble connecting right now. You can still browse the Caffeine Club menu, or try asking me again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verified: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleRunStressTest = (query) => {
    setActiveTab('chat');
    handleSend(query);
  };

  return (
    <>
      {/* 1. Floating Launch Trigger (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-coffee-950 hover:bg-caramel-500 text-cream-50 shadow-2xl hover:shadow-caramel-500/30 transition-all duration-300 border border-coffee-800 cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
          aria-label="Ask BEAN, AI café companion"
        >
          <div className="relative">
            <Coffee className="w-5 h-5 text-caramel-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <span className="font-serif font-bold text-sm tracking-wide">
            ASK BEAN ✦
          </span>
        </button>
      )}

      {/* 2. Floating Chatbot Window */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[640px] h-[85vh] bg-cream-50 rounded-3xl border border-cream-200 shadow-2xl flex flex-col overflow-hidden animate-scale"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bean-chat-title"
        >
          {/* Header */}
          <div className="bg-coffee-950 text-cream-50 p-4 sm:p-5 border-b border-coffee-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-caramel-500 text-white flex items-center justify-center shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="bean-chat-title" className="font-serif font-black text-base text-cream-100">
                    BEAN ✦
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-coffee-900 px-2 py-0.5 rounded-md border border-coffee-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <span className="text-[11px] text-coffee-100/70 block">
                  Your AI café companion
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset Conversation"
                aria-label="Reset Conversation"
                className="p-2 text-coffee-400 hover:text-cream-100 hover:bg-coffee-900 rounded-lg transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                aria-label="Close Chat"
                className="p-2 text-coffee-400 hover:text-cream-100 hover:bg-coffee-900 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Switcher: Chat vs. Viva Stress Test Dock */}
          <div className="flex border-b border-cream-200 bg-cream-100/60 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'chat'
                  ? 'border-b-2 border-caramel-500 text-coffee-950 bg-cream-50'
                  : 'text-coffee-600 hover:text-coffee-950'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Café Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('stress-test')}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'stress-test'
                  ? 'border-b-2 border-caramel-500 text-coffee-950 bg-cream-50'
                  : 'text-coffee-600 hover:text-coffee-950'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-caramel-600" />
              <span>Viva Stress Tests (10)</span>
            </button>
          </div>

          {/* Main Body Area */}
          {activeTab === 'stress-test' ? (
            <StressTestDock onRunTest={handleRunStressTest} />
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Loading / Brewing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-coffee-500 p-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-cream-200 flex items-center justify-center">
                    <Coffee className="w-3.5 h-3.5 text-caramel-500" />
                  </div>
                  <span>BEAN is brewing an answer...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Footer Controls: Quick Actions & Message Input */}
          <div className="p-3 bg-cream-100/90 border-t border-cream-200 shrink-0 space-y-2">
            {activeTab === 'chat' && (
              <QuickActions onSelectAction={(query) => handleSend(query)} />
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 pt-1"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder={activeTab === 'stress-test' ? "Switch to chat to type..." : "Ask BEAN about coffee, allergens, Wi-Fi..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-white border border-cream-300 rounded-xl text-xs text-coffee-950 placeholder:text-coffee-400 focus:outline-hidden focus:border-caramel-500 transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-coffee-950 hover:bg-caramel-500 text-cream-50 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

# CAFFEINE CLUB — Specialty Coffee & BEAN AI Companion
> University Computer Science Project: “THE CAFÉ WEBSITE — Build, Launch and Critique”

**Brand:** CAFFEINE CLUB  
**Tagline:** “Brew. Connect. Belong.”  
**AI Companion:** BEAN (“Your AI café companion”)  
**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, Node.js / Express, Lucide Icons  

---

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Secure Backend Proxy (Port 3001)
```bash
node server/server.js
# Or: npm run server
```

### 3. Start the Frontend Development Server (Port 5173)
In a second terminal:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## Key Features & Assessment Criteria

1. **Working Café Platform:**
   - Sticky frosted glass navigation with mobile hamburger drawer.
   - Cinematic full-screen hero with live operational indicator (`OPEN TODAY: 8:00 AM — 10:00 PM`).
   - 5 curated mood categories (*Signature Coffee*, *Cold Coffee*, *Fresh Bakes*, *Café Plates*, *Desserts*).
   - 22-item specialty menu with real-time text search, category filters, and 4 sorting strategies.
   - Dietary badges (100% Vegan, Vegetarian) and explicit allergen tags.
   - Detailed item modal with quantity stepper and cross-contamination warnings.
   - Global demo order cart with slide-over drawer, quantity adjustments, and simulated checkout token receipt.
   - Editorial storytelling (*“More than a cup of coffee”*).
   - 8-facility amenity grid (150 Mbps Wi-Fi, AC power outlets, oak tables, group rooms).
   - Validated visit & room reservation form with error handling.

2. **Responsible AI Companion (BEAN):**
   - Floating interactive chatbot in bottom-right corner.
   - Grounded strictly in `cafeKnowledge.js` (Single Source of Truth).
   - Dual-mode architecture: connect to Google Gemini via server-side API key or run completely offline with zero degradation.
   - Built-in **Viva Stress Test Dock** featuring the 10 university examination queries.

3. **Academic Documentation:**
   - Full viva defense critique available in [`VIVA_CRITIQUE_GUIDE.md`](./VIVA_CRITIQUE_GUIDE.md).

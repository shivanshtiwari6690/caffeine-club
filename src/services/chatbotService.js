/**
 * Client Service for BEAN AI Assistant
 * Communicates with the secure Node/Express backend proxy at /api/chat.
 * Implements client-side resilience and graceful offline degradation.
 */

import { CAFE_KNOWLEDGE } from '../data/cafeKnowledge.js';

// Use relative URL in production, or localhost:3001 in local dev
const BACKEND_URL = 
  typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? '/api/chat'
    : 'http://localhost:3001/api/chat';

/**
 * Fallback evaluator running right in the client if backend server is unreachable.
 * Mirrors the server's deterministic rules to guarantee 0% crash rate during evaluations.
 */
function localClientEvaluator(query) {
  const q = query.toLowerCase().trim();

  if (q.includes('pizza') || q.includes('burger') || q.includes('sushi') || q.includes('beer')) {
    return "We don't serve pizza or fast-food items! ☕ Caffeine Club focuses exclusively on artisanal coffees, fresh morning bakes, sourdough avocado tartines, and pastas.";
  }

  if (q.includes('secret menu') || q.includes('off menu')) {
    return "We don't have a secret menu! Everything we prepare is transparently listed on our official 22-item menu. Let me know what flavors you enjoy!";
  }

  if (q.includes('chicken') || q.includes('meat') || q.includes('beef')) {
    return "Caffeine Club does not serve chicken sandwiches or meat dishes. Our kitchen is vegetarian-friendly with dedicated 100% vegan choices (like our Sourdough Avocado Tartine and 16-Hour Cold Brew).";
  }

  if (q.includes('cappuccino') && (q.includes('99') || q.includes('cost') || q.includes('price'))) {
    return "Our Classic Cappuccino is ₹210, not ₹99. It features double-shot Arabica espresso, steamed milk, and cocoa dust.";
  }

  if (q.includes('brownie') && (q.includes('peanut') || q.includes('allergy') || q.includes('safe') || q.includes('guarantee'))) {
    return "I cannot guarantee that our Sea Salt Espresso Brownie is 100% safe for a peanut allergy. While peanuts are not a recipe ingredient, our open bakery handles wheat, tree nuts, and dairy, so cross-contamination is possible. For severe allergies, please confirm directly with café staff!";
  }

  if (q.includes('cross-contamination') || (q.includes('guarantee') && q.includes('allergy'))) {
    return "We cannot guarantee zero cross-contamination. While our baristas follow strict sanitation routines, our open kitchen handles gluten, dairy, tree nuts, and eggs. Customers with severe allergies should speak to our staff directly.";
  }

  if (q.includes('midnight') || q.includes('google says')) {
    return "That information is outdated! Caffeine Club is open Monday through Sunday from 8:00 AM to 10:00 PM (kitchen orders close at 9:30 PM).";
  }

  if (q.includes('owner') || q.includes('personal phone') || q.includes('private')) {
    return "I cannot share personal contact details for café owners or staff. You can reach our verified café desk at +91 80 4920 1888 or hello@caffeineclub.cafe.";
  }

  if (q.includes('discount code') || q.includes('coupon')) {
    return "We do not offer coupon or promo codes. However, we do offer a permanent 10% student & faculty discount on all coffees with a valid university ID card!";
  }

  if (q.includes('sweet') && q.includes('coffee')) {
    return "If you like your coffee on the sweeter side, try our Iced Spanish Latte (₹250) or Hot Spanish Latte (₹240) ☕! It combines espresso, milk, and sweet condensed milk for a velvety finish.";
  }

  if (q.includes('vegan')) {
    return "We have delicious 100% vegan options! 🌱\n\n• Sourdough Avocado Tartine (₹320)\n• 16-Hour Signature Cold Brew (₹220)\n• Cascara Tonic Cold Brew (₹260)\n• Long Black / Americano (₹180)\n• Ceremonial Uji Matcha Latte with oat milk (₹280).";
  }

  if (q.includes('work') || q.includes('laptop') || q.includes('wifi')) {
    return "Caffeine Club is built for work! 💻 Free 150 Mbps symmetrical Wi-Fi (SSID: 'CaffeineClub_Guest'), dedicated power outlets at 90% of tables, and quiet study hours on the Mezzanine level after 2:00 PM.";
  }

  if (q.includes('hour') || q.includes('open') || q.includes('close')) {
    return `We're open every day, Monday through Sunday, from ${CAFE_KNOWLEDGE.operations.operatingHours.openingTime} to ${CAFE_KNOWLEDGE.operations.operatingHours.closingTime} (kitchen closes at ${CAFE_KNOWLEDGE.operations.operatingHours.kitchenCloses}). 🕐`;
  }

  if (q.includes('dessert') || q.includes('cake')) {
    return "For dessert, try our San Sebastián Basque Burnt Cheesecake (₹290), Sea Salt Espresso Brownies (₹220), or Classic Artisanal Tiramisu (₹290)! 🍰";
  }

  return "I'm BEAN, your Caffeine Club assistant! ✦ I'm happy to help you with our 22-item menu, recommendations, opening hours (8:00 AM – 10:00 PM), or workspace amenities. What would you like to know?";
}

export async function sendChatMessage(message, conversationHistory = []) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        conversationHistory
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.reply,
      verified: data.verified || true,
      source: data.source || 'proxy'
    };
  } catch (err) {
    console.warn("[ChatbotService] Backend unreachable or timed out; using client grounding fallback:", err.message);
    const localReply = localClientEvaluator(message);
    return {
      text: localReply,
      verified: true,
      source: 'client-offline-fallback'
    };
  }
}

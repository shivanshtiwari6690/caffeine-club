/**
 * CAFFEINE CLUB — Verified Ground-Truth Knowledge Base
 * This file is the single source of truth for both the UI and BEAN AI.
 * Any factual question about the café must strictly resolve against this data.
 */

import { MENU_ITEMS } from './menuData.js';

export const CAFE_KNOWLEDGE = {
  brand: {
    name: "CAFFEINE CLUB",
    tagline: "Brew. Connect. Belong.",
    aiAssistant: "BEAN",
    aiTagline: "Your AI café companion",
    concept: "A specialty coffee roastery, creative workspace, and community hub designed for students, developers, and young professionals who value exceptional coffee and an inspiring environment.",
    established: 2024
  },

  operations: {
    address: "42 Knowledge Park Boulevard, Innovation Quarter, Bengaluru, KA 560103",
    landmark: "Directly opposite the Tech Campus Gate 3",
    operatingHours: {
      days: "Monday through Sunday (All 7 Days)",
      openingTime: "8:00 AM",
      closingTime: "10:00 PM",
      kitchenCloses: "9:30 PM",
      holidayNotice: "Open 365 days a year, including university exam study weeks."
    },
    contact: {
      phonePlaceholder: "+91 80 4920 1888",
      emailPlaceholder: "hello@caffeineclub.cafe",
      instagramPlaceholder: "@caffeineclub.blr"
    }
  },

  facilities: [
    {
      id: "fac-wifi",
      title: "Free High-Speed Wi-Fi",
      details: "Symmetrical 150 Mbps fiber connection. SSID: 'CaffeineClub_Guest' with unlimited free access for customers.",
      icon: "Wifi"
    },
    {
      id: "fac-power",
      title: "Dedicated Charging Points",
      details: "Universal AC power sockets and 65W USB-C PD fast chargers installed at 90% of tables and bar seating.",
      icon: "Zap"
    },
    {
      id: "fac-work",
      title: "Work-Friendly Tables",
      details: "Ergonomic oak tables designed for laptops, notebooks, and extended study or work sessions.",
      icon: "Laptop"
    },
    {
      id: "fac-outdoor",
      title: "Sunlit Outdoor Patio",
      details: "Pet-friendly garden terrace surrounded by natural greenery and shaded canvas umbrellas.",
      icon: "Sun"
    },
    {
      id: "fac-student",
      title: "Student Friendly",
      details: "Spacious communal study desks, quiet mezzanine study zone after 2:00 PM, and late-night study hours during exams.",
      icon: "GraduationCap"
    },
    {
      id: "fac-food",
      title: "Freshly Prepared Food",
      details: "Scratch-made kitchen with fresh artisanal breads baked daily and locally sourced organic ingredients.",
      icon: "Utensils"
    },
    {
      id: "fac-seating",
      title: "Comfortable Seating",
      details: "A mix of plush velvet armchairs, booth seating, communal oak benches, and bar-height counter stools.",
      icon: "Armchair"
    },
    {
      id: "fac-groups",
      title: "Group-Friendly Spaces",
      details: "Bookable 6-8 person collaborative glass project rooms equipped with 4K HDMI presentation monitors.",
      icon: "Users"
    }
  ],

  policies: {
    seatingAndLaptops: "Laptop usage is welcomed throughout the café at all hours. We request sharing large tables during peak rush (12:00 PM - 2:00 PM).",
    reservations: "General seating is walk-in only (first-come, first-served). Group project rooms can be reserved 2 hours in advance via counter staff.",
    paymentMethods: [
      "UPI (Google Pay, PhonePe, Paytm)",
      "Credit & Debit Cards (Visa, MasterCard, RuPay, Amex)",
      "Cash",
      "Apple Pay & Contactless NFC"
    ],
    ordering: {
      dineIn: "Table-side QR ordering or counter service available.",
      takeaway: "Rapid counter pickup available.",
      delivery: "In-store pickup only. We do NOT operate on third-party delivery aggregators to ensure coffee temperature and extraction fidelity are never compromised."
    },
    discounts: "We offer special 10% student & faculty discounts with valid university ID cards on all hot and cold coffee beverages."
  },

  safetyAndAllergens: {
    officialStatement: "Our kitchen handles wheat/gluten, dairy, eggs, peanuts, tree nuts (walnuts, almonds), and soy. While our baristas use dedicated steam wands and sanitized pitchers for plant milks, WE CANNOT GUARANTEE 100% ALLERGEN-FREE FOOD OR BEVERAGES DUE TO THE RISK OF CROSS-CONTAMINATION.",
    severeAllergyRule: "Customers with severe anaphylactic allergies must alert the café shift manager directly prior to ordering. BEAN cannot guarantee personal safety.",
    plantMilksAvailable: ["Oat Milk (Minor Figures)", "Almond Milk", "Soy Milk (Available upon request)"]
  },

  // Live reference to the 22 menu items
  menuItems: MENU_ITEMS
};

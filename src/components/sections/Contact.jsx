import React, { useState } from 'react';
import { CAFE_KNOWLEDGE } from '../../data/cafeKnowledge.js';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Navigation
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-50 text-coffee-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-coffee-700">
            <Sparkles className="w-3.5 h-3.5 text-caramel-500" />
            <span>FIND US & SAY HELLO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-coffee-950">
            Visit Caffeine Club
          </h2>
          <p className="text-sm text-coffee-600 max-w-xl mx-auto leading-relaxed">
            Located in the heart of the innovation quarter. Stop by for your morning brew, reserve a project room, or drop us a note.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Location, Hours, Transit (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Operational Hours Card */}
            <div className="bg-coffee-950 text-cream-50 p-8 rounded-3xl border border-coffee-800 space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-caramel-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-cream-100">Our Sanctuary</h4>
                    <p className="text-xs text-coffee-100/80 leading-relaxed mt-1">
                      {CAFE_KNOWLEDGE.operations.address}
                    </p>
                    <span className="text-[11px] text-caramel-300 font-mono block mt-1">
                      {CAFE_KNOWLEDGE.operations.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-coffee-800/80">
                  <Clock className="w-5 h-5 text-caramel-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-cream-100">Opening Hours</h4>
                    <p className="text-xs text-cream-100 font-mono mt-1">
                      {CAFE_KNOWLEDGE.operations.operatingHours.days}
                    </p>
                    <p className="text-xs text-caramel-300 font-mono font-bold">
                      {CAFE_KNOWLEDGE.operations.operatingHours.openingTime} — {CAFE_KNOWLEDGE.operations.operatingHours.closingTime}
                    </p>
                    <span className="text-[11px] text-coffee-100/60 block mt-0.5">
                      Kitchen orders close at {CAFE_KNOWLEDGE.operations.operatingHours.kitchenCloses}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-coffee-800/80">
                  <Mail className="w-5 h-5 text-caramel-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-cream-100">Digital Enquiries</h4>
                    <p className="text-xs font-mono text-coffee-100/80 mt-1">
                      {CAFE_KNOWLEDGE.operations.contact.emailPlaceholder}
                    </p>
                    <p className="text-xs font-mono text-coffee-100/80">
                      {CAFE_KNOWLEDGE.operations.contact.phonePlaceholder}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transit Tip */}
              <div className="bg-coffee-900 p-4 rounded-2xl border border-coffee-800 flex items-start gap-3 text-xs text-coffee-100/80">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Transit & Parking:</strong> 3-minute walk from Metro Station Gate B. Dedicated bicycle racks and underground visitor parking available.
                </p>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="relative h-48 rounded-3xl overflow-hidden border border-cream-200 bg-cream-200/50 flex items-center justify-center text-center p-6 group shadow-xs">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                alt="Map preview placeholder"
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
              />
              <div className="relative z-10 space-y-1">
                <div className="w-10 h-10 rounded-full bg-caramel-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <h5 className="font-serif font-bold text-sm text-coffee-950">
                  Innovation Quarter Campus
                </h5>
                <p className="text-[11px] font-mono text-coffee-600">
                  12.9352° N, 77.6245° E (Bengaluru)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-cream-100 p-8 sm:p-10 rounded-3xl border border-cream-200 shadow-sm">
            <div className="space-y-2 mb-6">
              <h3 className="font-serif font-black text-2xl text-coffee-950">
                Send a Message or Book a Room
              </h3>
              <p className="text-xs text-coffee-600 leading-relaxed">
                Have questions about student study slots, events, group rooms, or catering? Drop our concierge a message.
              </p>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-sage-100 border border-sage-300 text-sage-800 flex items-center gap-3 text-xs animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Thank you!</strong> Your message has been received by the club desk. Our team will get back to you shortly.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-coffee-800 block">
                    Your Name <span className="text-terracotta-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aarav Mehta"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-coffee-950 placeholder:text-coffee-400 focus:outline-hidden transition ${
                      errors.name ? 'border-terracotta-600 ring-1 ring-terracotta-600' : 'border-cream-300 focus:border-caramel-500'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] text-terracotta-600">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-coffee-800 block">
                    Email Address <span className="text-terracotta-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@university.edu"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-coffee-950 placeholder:text-coffee-400 focus:outline-hidden transition ${
                      errors.email ? 'border-terracotta-600 ring-1 ring-terracotta-600' : 'border-cream-300 focus:border-caramel-500'
                    }`}
                  />
                  {errors.email && <span className="text-[11px] text-terracotta-600">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-coffee-800 block">
                  Inquiry Topic
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-300 text-xs text-coffee-950 focus:outline-hidden focus:border-caramel-500 transition cursor-pointer"
                >
                  <option value="General Inquiry">General Café Inquiry</option>
                  <option value="Study Room Reservation">Collaborative Project Room Booking</option>
                  <option value="Student Club Event">Student Society / Club Event</option>
                  <option value="Catering & Bulk Coffee">Workshop Coffee Catering</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-semibold text-coffee-800 block">
                  Your Message <span className="text-terracotta-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our barista team or space coordinators assist you today?"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs text-coffee-950 placeholder:text-coffee-400 focus:outline-hidden transition resize-none ${
                    errors.message ? 'border-terracotta-600 ring-1 ring-terracotta-600' : 'border-cream-300 focus:border-caramel-500'
                  }`}
                />
                {errors.message && <span className="text-[11px] text-terracotta-600">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-coffee-950 hover:bg-caramel-500 text-cream-50 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

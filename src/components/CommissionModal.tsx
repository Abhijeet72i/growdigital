import React, { useState } from 'react';
import { X, Check, ArrowRight, Send, MapPin, Mail, Phone } from 'lucide-react';
import { GrowDigitalLogo } from './GrowDigitalLogo';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('USA 🇺🇸');
  const [businessType, setBusinessType] = useState(initialTopic || 'Small Business / Startup');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid business email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setBusinessName('');
    setEmail('');
    setPhone('');
    setProjectDetails('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="space-y-1">
            <GrowDigitalLogo size="md" />
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-300 uppercase pt-0.5">
              <span>Start Your Project</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-orange-400 font-semibold">Serving USA 🇺🇸 &amp; Canada 🇨🇦</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">
                Project Request Received!
              </h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}! A GrowDigital senior strategist will review {businessName || 'your business'} details and reach out with a tailored proposal within 24 business hours.
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-400">
                Direct Inquiry: <a href="mailto:grow.digiii@gmail.com" className="text-white underline">grow.digiii@gmail.com</a>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-neutral-400">
                Have a business that needs a better website? Tell us what you're looking for.
              </div>

              {error && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-xs font-mono">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Miller"
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Miller &amp; Co. Realty"
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@millerco.com"
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    <option value="USA 🇺🇸">United States 🇺🇸</option>
                    <option value="Canada 🇨🇦">Canada 🇨🇦</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Business Type
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                    <option value="Hotel / Hospitality">Hotel / Hospitality</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-Commerce Store">E-Commerce Store</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Startup">Startup / Tech</option>
                    <option value="Small Business / Local">Small / Local Business</option>
                    <option value="Growing Company">Growing Company</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Tell us about your business goals, target timeline, or existing website..."
                  className="w-full bg-neutral-900/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Project Request →</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[11px] text-neutral-400 font-mono">
                Serving businesses across the USA 🇺🇸 and Canada 🇨🇦 · Direct: grow.digiii@gmail.com
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

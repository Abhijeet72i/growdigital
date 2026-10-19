
import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GrowDigitalLogo } from '../components/GrowDigitalLogo';
import {
  Send,
  CheckCircle2,
  Mail,
  Globe,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  initialTopic?: string;
}

interface ContactApiResponse {
  success?: boolean;
  message?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  initialTopic,
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States US');
  const [businessType, setBusinessType] = useState(
    initialTopic || 'Restaurant / Cafe'
  );
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [projectDetails, setProjectDetails] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) return;

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!businessName.trim()) {
      setError('Please enter your business name.');
      return;
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          businessName: businessName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          country,
          businessType,
          timeline,
          projectDetails: projectDetails.trim(),
        }),
      });

      // Read as text first to handle empty or non-JSON responses.
      const responseText = await response.text();

      let result: ContactApiResponse;

      try {
        result = responseText
          ? (JSON.parse(responseText) as ContactApiResponse)
          : {};
      } catch {
        throw new Error(
          `The server returned an invalid response (HTTP ${response.status}). Check your API route and server logs.`
        );
      }

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ||
            `Your request could not be sent (HTTP ${response.status}). Please try again.`
        );
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to submit your request. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setName('');
    setBusinessName('');
    setEmail('');
    setPhone('');
    setCountry('United States US');
    setBusinessType('Restaurant / Cafe');
    setTimeline('Within 1 Month');
    setProjectDetails('');
    setError('');
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen w-full bg-neutral-950 px-6 pb-24 pt-28 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={[{ label: 'Contact' }]} />

        {/* HERO */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <span className="font-semibold text-sky-400">
              Direct Strategy &amp; Inquiries
            </span>
            <span className="text-neutral-600">·</span>
            <span className="font-semibold text-orange-400">
              USA · Canada · Australia
            </span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Let&apos;s Build Something
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              Exceptional Together.
            </span>
          </h1>

          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            Tell us about your business and website goals. We&apos;ll review
            your requirements and prepare a tailored proposal.
          </p>
        </section>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* CONTACT INFORMATION */}
          <aside className="space-y-6 lg:col-span-5">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-xl">
              <div className="border-b border-white/10 pb-4">
                <GrowDigitalLogo size="md" />
              </div>

              <h2 className="font-display text-xl font-bold">
                Contact Information
              </h2>

              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 text-orange-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    Direct Email
                  </span>
                  <a
                    href="mailto:grow.digiii@gmail.com"
                    className="break-all text-sm font-semibold transition-colors hover:text-orange-400"
                  >
                    grow.digiii@gmail.com
                  </a>
                  <p className="mt-1 text-xs text-slate-400">
                    Contact us about your project
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    Active Territories
                  </span>
                  <p className="text-sm font-semibold">
                    USA 🇺🇸 · Canada 🇨🇦 · Australia 🇦🇺
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Serving businesses internationally
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 text-orange-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                    Response Time
                  </span>
                  <p className="text-sm font-semibold">
                    We&apos;ll respond as soon as possible
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-neutral-900/50 p-6">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4 text-sky-400" />
                <span className="text-sky-300">
                  Our Consultation Guarantee
                </span>
              </div>

              <ul className="space-y-2 font-mono text-[11px] text-slate-400">
                <li>✓ Free initial project discussion</li>
                <li>✓ Clear and honest recommendations</li>
                <li>✓ Solutions tailored to your business</li>
              </ul>
            </div>
          </aside>

          {/* CONTACT FORM */}
          <section className="rounded-3xl border border-white/15 bg-neutral-900/80 p-6 shadow-2xl sm:p-10 lg:col-span-7">
            {isSubmitted ? (
              <div className="space-y-4 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                  Project Request Sent!
                </h2>

                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300">
                  Thank you,{' '}
                  <span className="font-bold text-sky-400">{name}</span>.
                  Your enquiry has been accepted by the server. We can reply
                  to <span className="font-semibold text-white">{email}</span>.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold transition hover:from-orange-400 hover:to-orange-500"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="mb-1 font-display text-xl font-bold">
                    Tell Us About Your Project
                  </h2>
                  <p className="text-xs text-slate-300">
                    Fill out the details below to request a tailored proposal.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-sm text-rose-300"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="business-name" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Business Name *
                    </label>
                    <input
                      id="business-name"
                      name="businessName"
                      type="text"
                      autoComplete="organization"
                      required
                      maxLength={160}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your Business"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-country" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Country
                    </label>
                    <select
                      id="contact-country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
                    >
                      <option value="United States US">United States US</option>
                      <option value="Canada CA">Canada CA</option>
                      <option value="Australia AU">Australia AU</option>
                      <option value="United Kingdom UK">United Kingdom UK</option>
                      <option value="India IN">India IN</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="business-type" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Business Type
                    </label>
                    <select
                      id="business-type"
                      name="businessType"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
                    >
                      <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                      <option value="Hotel / Hospitality">Hotel / Hospitality</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Small Business / Startup">Small Business / Startup</option>
                      <option value="Growing Company">Growing Company</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-timeline" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Target Launch Timeline
                  </label>
                  <select
                    id="contact-timeline"
                    name="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="Immediately (Within 2 Weeks)">Immediately (Within 2 Weeks)</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="1 to 3 Months">1 to 3 Months</option>
                    <option value="Exploring Options / Flexible">Exploring Options / Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="project-details" className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Project Details &amp; Goals
                  </label>
                  <textarea
                    id="project-details"
                    name="projectDetails"
                    rows={4}
                    maxLength={5000}
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Tell us about your website, goals, features, or current website URL..."
                    className="w-full resize-y rounded-xl border border-white/15 bg-black/60 px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:from-orange-400 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {isSending ? 'Sending Request...' : 'Send Project Request →'}
                  </span>
                </button>

                <p className="text-center font-mono text-xs text-slate-400">
                  Serving businesses across the{' '}
                  <span className="font-semibold text-sky-300">USA US</span>
                  {' · '}
                  <span className="font-semibold text-orange-400">Canada CA</span>
                  {' · '}
                  <span className="font-semibold text-sky-300">Australia AU</span>
                  {' · '}
                  <a
                    href="mailto:grow.digiii@gmail.com"
                    className="text-sky-300 hover:underline"
                  >
                    grow.digiii@gmail.com
                  </a>
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

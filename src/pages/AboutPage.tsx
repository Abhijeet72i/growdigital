
import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GrowDigitalLogo } from '../components/GrowDigitalLogo';
import { WHY_US_HIGHLIGHTS, TARGET_CUSTOMERS } from '../data/streams';
import {
  Check,
  Globe,
  Terminal,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onStartProject,
}) => {
  const techStack = [
    {
      name: 'React 19 & Next.js',
      role: 'Modern UI & Static Generation',
    },
    {
      name: 'TypeScript',
      role: 'Type-Safe Resilient Logic',
    },
    {
      name: 'Tailwind CSS',
      role: 'Pixel-Perfect Fluid Layouts',
    },
    {
      name: 'Figma',
      role: 'High-Fidelity UI/UX Systems',
    },
    {
      name: 'Cloudflare & Vercel',
      role: 'Global Edge CDN Delivery',
    },
    {
      name: 'Node.js & Express',
      role: 'Scalable API Integration',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black px-6 pt-28 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Page Hero */}
        <section className="mb-16 max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

            <span className="font-semibold text-sky-400">
              The Agency Behind Your Digital Growth
            </span>

            <span aria-hidden="true" className="text-neutral-600">
              ·
            </span>

            <span className="font-semibold text-orange-400">
              USA · Canada · Australia
            </span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            More Than Just A Website —{' '}
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              A Digital Choice.
            </span>
          </h1>

          <p className="text-base font-normal leading-relaxed text-slate-200 sm:text-lg">
            Your website is often the first interaction customers have
            with your business. We build digital experiences that make
            that first impression count.
          </p>
        </section>

        {/* Agency Mission & Story */}
        <section className="mb-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 text-sm font-normal leading-relaxed text-slate-300 sm:text-base lg:col-span-7">
            <div className="mb-2">
              <GrowDigitalLogo size="lg" />
            </div>

            <h2 className="mb-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Why We Started GrowDigital
            </h2>

            <p>
              Most businesses face a frustrating dilemma when building a
              website: hire a traditional agency with expensive retainers
              and long timelines, or buy a generic template that looks like
              everyone else and fails to turn traffic into paying clients.
            </p>

            <p>
              <span className="font-semibold text-sky-400">Grow</span>
              <span className="font-bold text-orange-400">Digital</span>{' '}
              was created to offer a better choice: high-performance,
              modern websites designed with strategic purpose, built with
              modern web technology, and delivered with speed,
              transparency, and care.
            </p>

            <div className="space-y-1.5 rounded-2xl border border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-5 text-xs shadow-xl">
              <span className="block font-mono font-bold uppercase tracking-wider text-orange-400">
                Our Core Brand Promise
              </span>

              <p className="font-sans text-sm font-medium text-slate-200">
                We build websites that help businesses grow: fast,
                responsive, conversion-focused, and tailored to your brand.
              </p>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-6 rounded-3xl border border-white/10 bg-neutral-900/80 p-8 shadow-2xl lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-400">
                <Globe className="h-5 w-5" />
              </div>

              <div>
                <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-sky-300">
                  Service Territory
                </span>

                <span className="font-display text-lg font-bold text-white">
                  USA 🇺🇸 · Canada 🇨🇦 · Australia 🇦🇺
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-slate-400">
                  Response Time:
                </span>

                <span className="font-semibold text-orange-400">
                  &lt; 24 Business Hours
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-slate-400">
                  Code Ownership:
                </span>

                <span className="font-semibold text-white">
                  100% Client Retained
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-slate-400">
                  Direct Communication:
                </span>

                <span className="text-right font-semibold text-sky-300">
                  Lead Designers &amp; Developers
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-400 hover:to-orange-500"
            >
              <span>Get In Touch With Our Team</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* Six Agency Pillars */}
        <section className="mb-20">
          <div className="mb-10 max-w-2xl">
            <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-widest text-orange-400">
              Our 6 Pillars
            </span>

            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              The Standard Behind Every{' '}
              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                GrowDigital Build
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_US_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-orange-400">
                    {item.stat}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>

                <h3 className="mb-2 font-display text-xl font-bold text-white transition-colors group-hover:text-sky-300">
                  {item.title}
                </h3>

                <p className="text-xs font-normal leading-relaxed text-slate-300 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Target Industries */}
        <section className="mb-20 rounded-3xl border border-white/10 bg-neutral-900/50 p-8 sm:p-10">
          <div className="mb-6 max-w-2xl">
            <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Who We Build For
            </span>

            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Tailored Solutions For High-Ambition Industries
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Digital experiences designed around your industry,
              customers, and business objectives.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {TARGET_CUSTOMERS.map((customer, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-200 transition-all hover:border-orange-500/30 hover:bg-white/10 sm:text-sm"
              >
                <Check className="h-3.5 w-3.5 text-orange-400" />
                <span>{customer}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Stack */}
        <section className="mb-16 rounded-3xl border border-white/10 bg-neutral-950 p-8 sm:p-10">
          <div className="mb-8 max-w-2xl">
            <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
              Engineering Excellence
            </span>

            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Modern Technology We Rely On
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-sky-500/30"
              >
                <div>
                  <h3 className="text-xs font-semibold text-white">
                    {tech.name}
                  </h3>

                  <p className="mt-0.5 font-mono text-[11px] text-sky-300">
                    {tech.role}
                  </p>
                </div>

                <Terminal className="h-4 w-4 shrink-0 text-orange-400" />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/15 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 shadow-2xl md:flex-row sm:p-12">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sky-400">
              <HeartHandshake className="h-5 w-5" />

              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                Let's Build Something Great
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-white">
              Ready to grow your business online?
            </h2>

            <p className="mt-2 text-xs font-normal text-slate-300 sm:text-sm">
              Tell us about your project. We'll discuss your requirements
              and help you find the right digital solution.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className="flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-400 hover:to-orange-500 sm:text-sm"
          >
            Get Started With GrowDigital
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

      </div>
    </div>
  );
};

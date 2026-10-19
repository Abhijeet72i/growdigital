import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { growdigital_PROCESS } from '../data/streams';
import { ArrowRight, CheckCircle2, ChevronDown, Clock, ShieldCheck, Cpu, MessageSquare } from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (page: string) => void;
  onStartProject: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate, onStartProject }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const detailedSteps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      duration: 'Week 1',
      description: 'We understand your business, target audience, competitive landscape, and primary conversion objectives.',
      deliverables: ['Stakeholder Goal Blueprint', 'Competitor & UX Benchmark Analysis', 'Information Architecture & Site Map', 'Technical Requirements Document'],
      tag: 'Strategic Alignment',
    },
    {
      number: '02',
      title: 'UI/UX Design & Prototyping',
      duration: 'Weeks 1–2',
      description: 'We craft a bespoke aesthetic tailored to your brand with intuitive wireframes and interactive Figma prototypes.',
      deliverables: ['Custom Mobile & Desktop Figma Artboards', 'Typography & Palette Design System', 'Interactive Clickable Prototyping', 'Collaborative Feedback & Revisions'],
      tag: 'Visual Craft',
    },
    {
      number: '03',
      title: 'Modern Engineering',
      duration: 'Weeks 2–4',
      description: 'We translate approved designs into clean, fast, and accessible React/Next.js code with responsive perfection.',
      deliverables: ['Modular TypeScript Component Architecture', 'Sub-second Edge Server Setup', 'Form & Booking API Integrations', 'Cross-browser & Mobile Stress Testing'],
      tag: 'Technical Build',
    },
    {
      number: '04',
      title: 'Optimization & SEO',
      duration: 'Week 4',
      description: 'We stress-test performance, optimize Core Web Vitals, and configure structured search engine data.',
      deliverables: ['Google Lighthouse 95+ Core Vitals Audit', 'Schema.org JSON-LD Structured Data', 'OpenGraph Social Card Previews', 'Security Hardening & SSL Verification'],
      tag: 'Speed & Discovery',
    },
    {
      number: '05',
      title: 'Launch & Handover',
      duration: 'Launch Day & Beyond',
      description: 'Your website goes live smoothly with zero downtime, full client ownership transfer, and post-launch support.',
      deliverables: ['Zero-Downtime DNS Live Cutover', 'Domain & Cloudflare Security Setup', 'Admin Handover & Video Training', '30-Day Post-Launch Warranty Period'],
      tag: 'Live Execution',
    },
  ];

  const faqs = [
    {
      q: 'How long does a website project usually take?',
      a: 'Standard business websites are typically delivered in 2 to 3 weeks. Complex e-commerce platforms or custom web applications take 4 to 6 weeks. We provide a firm timeline commitment during initial scoping.',
    },
    {
      q: 'Do I own the website after launch?',
      a: 'Yes, 100%. Upon final delivery, all code repositories, design master files, domain settings, and cloud hosting accounts are transferred completely to you with zero vendor lock-in.',
    },
    {
      q: 'What technologies and frameworks do you build with?',
      a: 'We use modern, battle-tested technologies including React, Next.js, TypeScript, Tailwind CSS, Shopify Headless, and cloud edge networks (Cloudflare, Vercel, AWS). This guarantees sub-second page loads and bank-grade security.',
    },
    {
      q: 'Can our internal team easily update text and photos later?',
      a: 'Absolutely. We configure user-friendly CMS management solutions (Sanity, Strapi, or Shopify) and provide personalized video walk-throughs so your team can edit content with confidence.',
    },
    {
      q: 'Do you provide support after the website goes live?',
      a: 'Yes. Every project includes a 30-day post-launch warranty period with priority bug fixing. We also offer monthly maintenance packages for proactive security monitoring, backups, and regular content updates.',
    },
  ];

  return (
    <div className="w-full pt-28 pb-24 px-6 sm:px-10 lg:px-16 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Process' }]} />

        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="text-sky-400 font-semibold">Proven Delivery Framework</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-orange-400 font-semibold">5-Stage Methodology</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            From Idea{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              To Launch.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            A transparent, collaborative workflow engineered to eliminate delays, guarantee design excellence, and get your business online on schedule.
          </p>
        </div>

        {/* 5-Step Deep Dive Stack */}
        <div className="space-y-6 mb-20">
          {detailedSteps.map((step) => (
            <div
              key={step.number}
              className="bg-neutral-900/60 border border-white/10 hover:border-orange-500/30 rounded-3xl p-8 sm:p-10 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                {/* Left: Step Info */}
                <div className="max-w-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-orange-400">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 font-medium">
                      {step.tag}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {step.title}
                  </h2>

                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs font-mono text-orange-400/90 font-medium">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>Typical Timeline: {step.duration}</span>
                  </div>
                </div>

                {/* Right: Deliverables List */}
                <div className="flex-1 bg-neutral-950/80 rounded-2xl p-6 border border-white/10">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                    Phase Milestones &amp; Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 space-y-3 hover:border-sky-500/30 transition-all">
            <MessageSquare className="w-6 h-6 text-sky-400" />
            <h3 className="font-display text-lg font-bold text-white">Clear Communication</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Direct access to senior developers and designers with weekly video check-ins and private client portals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 space-y-3 hover:border-orange-500/30 transition-all">
            <Cpu className="w-6 h-6 text-orange-400" />
            <h3 className="font-display text-lg font-bold text-white">Live Staging Previews</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Test and review your website on a private, password-protected development link before anything goes live.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 space-y-3 hover:border-sky-500/30 transition-all">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            <h3 className="font-display text-lg font-bold text-white">Guaranteed Deadlines</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              We define clear milestone target dates upfront so your launch plans and marketing campaigns stay strictly on schedule.
            </p>
          </div>
        </div>

        {/* Process FAQs Accordion */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-white/10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block mb-2 font-semibold">
              Clear Answers
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
              Have questions about how we work? Here's what you need to know.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-neutral-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-orange-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Page CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to take your business{' '}
              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                from idea to launch?
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Get an accurate timeline and proposal customized for your specific business goals.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-orange-500/25 border border-orange-400/30"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

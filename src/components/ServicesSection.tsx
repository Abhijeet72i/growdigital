import React from 'react';
import {
  ArrowUpRight,
  Palette,
  Code2,
  ShoppingCart,
  Briefcase,
  Search,
  LifeBuoy,
  Check,
  Star,
} from 'lucide-react';
import { growdigital_SERVICES } from '../data/streams';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'srv-01':
      case 'srv-04':
        return <Palette className="w-5 h-5 text-orange-400" />;

      case 'srv-02':
      case 'srv-05':
        return <Code2 className="w-5 h-5 text-sky-400" />;

      case 'srv-03':
      case 'srv-06':
        return <ShoppingCart className="w-5 h-5 text-orange-400" />;

      default:
        return <Briefcase className="w-5 h-5 text-sky-400" />;
    }
  };

  const usaPlans = growdigital_SERVICES.filter((service) =>
    service.id.startsWith('srv-0') &&
    ['srv-01', 'srv-02', 'srv-03'].includes(service.id)
  );

  const canadaPlans = growdigital_SERVICES.filter((service) =>
    ['srv-04', 'srv-05', 'srv-06'].includes(service.id)
  );

  const renderPlanCard = (
    service: (typeof growdigital_SERVICES)[number],
    country: 'USA' | 'Canada'
  ) => {
    const isBusiness =
      service.id === 'srv-02' || service.id === 'srv-05';

    const isPremium =
      service.id === 'srv-03' || service.id === 'srv-06';

    const flag = country === 'USA' ? '🇺🇸' : '🇨🇦';

    const titleParts = service.title.split(' — ');
    const planName = titleParts[0];
    const price = titleParts[1];

    return (
      <div
        key={service.id}
        className={`
          group relative flex flex-col overflow-hidden
          rounded-2xl border
          bg-neutral-900/70 backdrop-blur-xl
          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-2xl
          ${
            isBusiness
              ? 'border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.12)]'
              : 'border-white/10 hover:border-sky-400/40'
          }
        `}
      >
        {/* Popular Badge */}
        {isBusiness && (
          <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-b-xl bg-gradient-to-r from-sky-500 to-orange-500 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {/* Top Accent */}
        <div
          className={`
            h-1 w-full
            ${
              isPremium
                ? 'bg-gradient-to-r from-sky-400 via-purple-400 to-orange-400'
                : isBusiness
                ? 'bg-gradient-to-r from-sky-400 to-orange-400'
                : 'bg-sky-400/60'
            }
          `}
        />

        <div className="flex flex-1 flex-col p-7">
          {/* Country + Number */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  group/flag flex h-12 w-12 items-center justify-center
                  rounded-xl border border-white/10
                  bg-white/5
                  transition-all duration-500
                  group-hover:border-sky-400/40
                  group-hover:bg-white/10
                "
              >
                <span
                  className="
                    text-3xl
                    transition-all duration-500 ease-out
                    group-hover/flag:-translate-y-1
                    group-hover/flag:rotate-6
                    group-hover/flag:scale-110
                  "
                >
                  {flag}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  {country}
                </p>

                <p className="text-xs font-mono font-semibold tracking-widest text-sky-400">
                  {service.number.replace(
                    country === 'USA' ? '🇺🇸 ' : '🇨🇦 ',
                    ''
                  )}
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              {getIcon(service.id)}
            </div>
          </div>

          {/* Plan Name */}
          <div className="mb-5">
            <h3 className="font-display text-2xl font-bold text-white">
              {planName}
            </h3>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold text-white">
                {price?.split(' ')[0]}
              </span>

              <span className="font-mono text-xs font-semibold text-orange-400">
                {price?.split(' ')[1]}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 min-h-[72px] text-sm leading-relaxed text-slate-300">
            {service.description}
          </p>

          {/* Package Details */}
          <div className="mb-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                Package Includes
              </span>

              <span className="text-[10px] font-mono text-orange-400">
                {service.features.length} Features
              </span>
            </div>

            <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
              {service.features.map((feature, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-400/10">
                    <Check className="h-3 w-3 text-sky-400" />
                  </div>

                  <span className="text-xs leading-relaxed text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Summary */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="mb-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">
                Support
              </p>

              <p className="text-xs font-semibold text-white">
                {service.features.find((f) =>
                  f.toLowerCase().includes('support')
                ) || 'Included'}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="mb-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">
                Delivery
              </p>

              <p className="text-xs font-semibold text-white">
                {service.features.find((f) =>
                  f.toLowerCase().includes('delivery')
                ) || 'Custom'}
              </p>
            </div>
          </div>

          {/* Highlight */}
          <div className="mb-6 rounded-lg border border-orange-400/20 bg-orange-400/5 px-4 py-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
              {service.highlight.replace('🇺🇸 ', '').replace('🇨🇦 ', '')}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => onSelectService(service.title)}
            className="
              mt-auto flex w-full items-center justify-center
              gap-2 rounded-xl
              border border-white/10
              bg-white/5
              px-5 py-3.5
              text-sm font-semibold text-white
              transition-all duration-300
              hover:border-orange-400/40
              hover:bg-orange-400
              hover:text-black
            "
          >
            <span>
              {isBusiness
                ? 'Choose Business Plan'
                : isPremium
                ? 'Choose Premium Plan'
                : 'Get Started'}
            </span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="services"
      className="
        relative z-10 w-full scroll-mt-20
        border-t border-white/10
        bg-neutral-950/95
        px-6 py-24
        backdrop-blur-xl
        sm:px-10 sm:py-32
        lg:px-16
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-16">
          <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

            <span className="font-semibold text-sky-400">
              Website Packages
            </span>

            <span aria-hidden="true" className="text-neutral-600">
              ·
            </span>

            <span className="font-semibold text-orange-400">
              USA &amp; Canada
            </span>
          </div>

          <div className="max-w-4xl">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Websites Built
              <br />
              For{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                Business Growth.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-slate-300 sm:text-base">
              Choose a website package designed around your business,
              audience and growth goals. Professional digital experiences
              for businesses across the USA and Canada.
            </p>
          </div>
        </div>

        {/* =========================
            USA
        ========================= */}
        <div className="mb-24">

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  group/usa-flag flex h-16 w-16 items-center justify-center
                  rounded-2xl border border-white/10
                  bg-white/5
                  transition-all duration-500
                  hover:border-sky-400/40
                  hover:bg-white/10
                "
              >
                <span
                  className="
                    text-4xl
                    transition-all duration-500
                    group-hover/usa-flag:-translate-y-1
                    group-hover/usa-flag:rotate-6
                    group-hover/usa-flag:scale-110
                  "
                >
                  🇺🇸
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
                  United States
                </p>

                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  USA Website Packages
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Professional websites for American businesses.
                </p>
              </div>
            </div>

            <div className="hidden h-px flex-1 bg-white/10 sm:ml-8 sm:block" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {usaPlans.map((service) =>
              renderPlanCard(service, 'USA')
            )}
          </div>
        </div>

        {/* =========================
            CANADA
        ========================= */}
        <div>

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  group/canada-flag flex h-16 w-16 items-center justify-center
                  rounded-2xl border border-white/10
                  bg-white/5
                  transition-all duration-500
                  hover:border-orange-400/40
                  hover:bg-white/10
                "
              >
                <span
                  className="
                    text-4xl
                    transition-all duration-500
                    group-hover/canada-flag:-translate-y-1
                    group-hover/canada-flag:-rotate-6
                    group-hover/canada-flag:scale-110
                  "
                >
                  🇨🇦
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-[0.2em] text-orange-400">
                  Canada
                </p>

                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Canada Website Packages
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Professional websites for Canadian businesses.
                </p>
              </div>
            </div>

            <div className="hidden h-px flex-1 bg-white/10 sm:ml-8 sm:block" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {canadaPlans.map((service) =>
              renderPlanCard(service, 'Canada')
            )}
          </div>
        </div>

        {/* =========================
            BOTTOM CTA
        ========================= */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex flex-col items-start justify-between gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                Need Something Custom?
              </p>

              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Let's build the right website for your business.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                Tell us about your business, goals and requirements.
                We'll help you choose the right package or create a
                completely custom solution.
              </p>
            </div>

            <button
              onClick={() => onSelectService('Custom Website')}
              className="
                flex shrink-0 items-center gap-2
                rounded-xl
                bg-orange-400
                px-6 py-3.5
                text-sm font-bold
                text-black
                transition-all duration-300
                hover:bg-orange-300
                hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]
              "
            >
              Get A Free Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
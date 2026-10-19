import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { growdigital_SERVICES } from '../data/streams';
import {
  Palette,
  Code2,
  ShoppingCart,
  Briefcase,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Star,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectService: (serviceTitle: string) => void;
}

type Country = 'USA' | 'Canada' | 'Australia';

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectService,
}) => {
  /* =========================================================
     ICONS
  ========================================================= */

  const getIcon = (id: string) => {
    switch (id) {
      case 'srv-01':
      case 'srv-04':
      case 'srv-07':
        return <Palette className="h-6 w-6 text-orange-400" />;

      case 'srv-02':
      case 'srv-05':
      case 'srv-08':
        return <Code2 className="h-6 w-6 text-sky-400" />;

      case 'srv-03':
      case 'srv-06':
      case 'srv-09':
        return <ShoppingCart className="h-6 w-6 text-orange-400" />;

      default:
        return <Briefcase className="h-6 w-6 text-sky-400" />;
    }
  };

  /* =========================================================
     PACKAGE DATA
  ========================================================= */

  const usaPlans = growdigital_SERVICES.filter((service) =>
    ['srv-01', 'srv-02', 'srv-03'].includes(service.id)
  );

  const canadaPlans = growdigital_SERVICES.filter((service) =>
    ['srv-04', 'srv-05', 'srv-06'].includes(service.id)
  );

  const australiaPlans = growdigital_SERVICES.filter((service) =>
    ['srv-07', 'srv-08', 'srv-09'].includes(service.id)
  );

  /* =========================================================
     PLAN NAME
  ========================================================= */

  const getPlanName = (title: string) => {
    return title.split(' — ')[0];
  };

  /* =========================================================
     PRICE
  ========================================================= */

  const getPrice = (title: string) => {
    return title.split(' — ')[1] || '';
  };

  /* =========================================================
     SUPPORT
  ========================================================= */

  const getSupport = (features: string[]) => {
    const support = features.find((feature) =>
      feature.toLowerCase().includes('support')
    );

    return support || 'Included';
  };

  /* =========================================================
     DELIVERY
  ========================================================= */

  const getDelivery = (features: string[]) => {
    const delivery = features.find((feature) =>
      feature.toLowerCase().includes('delivery')
    );

    return delivery || 'Custom';
  };

  /* =========================================================
     USA FLAG
  ========================================================= */

  const USAFlag = () => {
    return (
      <div
        className="
          group/flag
          relative
          flex
          h-16
          w-20
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          transition-all
          duration-500
          hover:border-sky-400/50
          hover:bg-white/10
          hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]
        "
      >
        <svg
          viewBox="0 0 60 40"
          xmlns="http://www.w3.org/2000/svg"
          className="
            h-10
            w-16
            origin-center
            transition-all
            duration-500
            ease-out
            group-hover/flag:-translate-y-1
            group-hover/flag:rotate-3
            group-hover/flag:scale-110
          "
        >
          <rect
            x="0"
            y="0"
            width="60"
            height="40"
            fill="#ffffff"
          />

          <rect x="0" y="0" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="6.15" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="12.30" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="18.45" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="24.60" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="30.75" width="60" height="3.08" fill="#B22234" />
          <rect x="0" y="36.90" width="60" height="3.10" fill="#B22234" />

          <rect
            x="0"
            y="0"
            width="25"
            height="21.5"
            fill="#3C3B6E"
          />

          <g fill="#ffffff">
            <circle cx="3" cy="3" r="0.65" />
            <circle cx="7" cy="3" r="0.65" />
            <circle cx="11" cy="3" r="0.65" />
            <circle cx="15" cy="3" r="0.65" />
            <circle cx="19" cy="3" r="0.65" />
            <circle cx="23" cy="3" r="0.65" />

            <circle cx="5" cy="6.5" r="0.65" />
            <circle cx="9" cy="6.5" r="0.65" />
            <circle cx="13" cy="6.5" r="0.65" />
            <circle cx="17" cy="6.5" r="0.65" />
            <circle cx="21" cy="6.5" r="0.65" />

            <circle cx="3" cy="10" r="0.65" />
            <circle cx="7" cy="10" r="0.65" />
            <circle cx="11" cy="10" r="0.65" />
            <circle cx="15" cy="10" r="0.65" />
            <circle cx="19" cy="10" r="0.65" />
            <circle cx="23" cy="10" r="0.65" />

            <circle cx="5" cy="13.5" r="0.65" />
            <circle cx="9" cy="13.5" r="0.65" />
            <circle cx="13" cy="13.5" r="0.65" />
            <circle cx="17" cy="13.5" r="0.65" />
            <circle cx="21" cy="13.5" r="0.65" />

            <circle cx="3" cy="17" r="0.65" />
            <circle cx="7" cy="17" r="0.65" />
            <circle cx="11" cy="17" r="0.65" />
            <circle cx="15" cy="17" r="0.65" />
            <circle cx="19" cy="17" r="0.65" />
            <circle cx="23" cy="17" r="0.65" />
          </g>
        </svg>

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            transition-transform
            duration-700
            group-hover/flag:translate-x-full
          "
        />
      </div>
    );
  };

  /* =========================================================
     CANADA FLAG
  ========================================================= */

  const CanadaFlag = () => {
    return (
      <div
        className="
          group/flag
          relative
          flex
          h-16
          w-20
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          transition-all
          duration-500
          hover:border-orange-400/50
          hover:bg-white/10
          hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]
        "
      >
        <svg
          viewBox="0 0 60 40"
          xmlns="http://www.w3.org/2000/svg"
          className="
            h-10
            w-16
            origin-center
            transition-all
            duration-500
            ease-out
            group-hover/flag:-translate-y-1
            group-hover/flag:-rotate-3
            group-hover/flag:scale-110
          "
        >
          <rect
            x="0"
            y="0"
            width="60"
            height="40"
            fill="#ffffff"
          />

          <rect
            x="0"
            y="0"
            width="15"
            height="40"
            fill="#D80621"
          />

          <rect
            x="45"
            y="0"
            width="15"
            height="40"
            fill="#D80621"
          />

          <path
            d="
              M30 4
              L27.8 10
              L23.5 8
              L25.1 13.2
              L20.2 13.8
              L24 17.4
              L21.3 20
              L26.8 19.7
              L25.2 26.8
              L30 23.7
              L34.8 26.8
              L33.2 19.7
              L38.7 20
              L36 17.4
              L39.8 13.8
              L34.9 13.2
              L36.5 8
              L32.2 10
              Z
            "
            fill="#D80621"
          />

          <rect
            x="28.5"
            y="23"
            width="3"
            height="7"
            fill="#D80621"
          />
        </svg>

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            transition-transform
            duration-700
            group-hover/flag:translate-x-full
          "
        />
      </div>
    );
  };

  /* =========================================================
     AUSTRALIA FLAG
  ========================================================= */

  const AustraliaFlag = () => {
    return (
      <div
        className="
          group/flag
          relative
          flex
          h-16
          w-20
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          transition-all
          duration-500
          hover:border-sky-400/50
          hover:bg-white/10
          hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]
        "
      >
        <svg
          viewBox="0 0 60 40"
          xmlns="http://www.w3.org/2000/svg"
          className="
            h-10
            w-16
            origin-center
            transition-all
            duration-500
            ease-out
            group-hover/flag:-translate-y-1
            group-hover/flag:rotate-2
            group-hover/flag:scale-110
          "
        >
          {/* Blue background */}
          <rect
            x="0"
            y="0"
            width="60"
            height="40"
            fill="#012169"
          />

          {/* Union Jack */}
          <path
            d="
              M0 0
              H30
              V20
              H0
              Z
            "
            fill="#012169"
          />

          {/* White diagonal lines */}
          <path
            d="
              M0 0 L30 20
              M30 0 L0 20
            "
            stroke="#ffffff"
            strokeWidth="5"
          />

          {/* Red diagonal lines */}
          <path
            d="
              M0 0 L30 20
              M30 0 L0 20
            "
            stroke="#C8102E"
            strokeWidth="2"
          />

          {/* White cross */}
          <rect
            x="12"
            y="0"
            width="6"
            height="20"
            fill="#ffffff"
          />

          <rect
            x="0"
            y="7"
            width="30"
            height="6"
            fill="#ffffff"
          />

          {/* Red cross */}
          <rect
            x="13.5"
            y="0"
            width="3"
            height="20"
            fill="#C8102E"
          />

          <rect
            x="0"
            y="8.5"
            width="30"
            height="3"
            fill="#C8102E"
          />

          {/* Commonwealth Star */}
          <path
            d="
              M15 27
              L16.5 30.5
              L20.3 30.7
              L17.3 33
              L18.3 36.7
              L15 34.7
              L11.7 36.7
              L12.7 33
              L9.7 30.7
              L13.5 30.5
              Z
            "
            fill="#ffffff"
          />

          {/* Southern Cross stars */}
          <circle cx="43" cy="10" r="1.5" fill="#ffffff" />
          <circle cx="50" cy="17" r="1.3" fill="#ffffff" />
          <circle cx="45" cy="25" r="1.5" fill="#ffffff" />
          <circle cx="36" cy="20" r="1.2" fill="#ffffff" />
          <circle cx="48" cy="30" r="1.2" fill="#ffffff" />
        </svg>

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            transition-transform
            duration-700
            group-hover/flag:translate-x-full
          "
        />
      </div>
    );
  };

  /* =========================================================
     COUNTRY FLAG WRAPPER
  ========================================================= */

  const renderFlag = (country: Country) => {
    if (country === 'USA') {
      return <USAFlag />;
    }

    if (country === 'Canada') {
      return <CanadaFlag />;
    }

    return <AustraliaFlag />;
  };

  /* =========================================================
     COUNTRY NAME
  ========================================================= */

  const getCountryName = (country: Country) => {
    switch (country) {
      case 'USA':
        return 'United States';

      case 'Canada':
        return 'Canada';

      case 'Australia':
        return 'Australia';

      default:
        return '';
    }
  };

  /* =========================================================
     PACKAGE CARD
  ========================================================= */

  const renderPlanCard = (
    service: (typeof growdigital_SERVICES)[number],
    country: Country
  ) => {
    const isBusiness =
      service.id === 'srv-02' ||
      service.id === 'srv-05' ||
      service.id === 'srv-08';

    const isPremium =
      service.id === 'srv-03' ||
      service.id === 'srv-06' ||
      service.id === 'srv-09';

    const planName = getPlanName(service.title);
    const price = getPrice(service.title);

    return (
      <div
        key={service.id}
        className={`
          group
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-3xl
          border
          bg-neutral-900/70
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl

          ${
            isBusiness
              ? 'border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.10)]'
              : 'border-white/10 hover:border-sky-400/30'
          }
        `}
      >
        {/* TOP ACCENT */}

        <div
          className={`
            h-1
            w-full

            ${
              isPremium
                ? 'bg-gradient-to-r from-sky-400 via-blue-400 to-orange-400'
                : isBusiness
                ? 'bg-gradient-to-r from-sky-400 to-orange-400'
                : 'bg-sky-400/60'
            }
          `}
        />

        {/* MOST POPULAR */}

        {isBusiness && (
          <div className="absolute right-5 top-5 z-20">
            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-orange-400/30
                bg-orange-500/10
                px-3
                py-1.5
                text-[10px]
                font-mono
                font-bold
                uppercase
                tracking-wider
                text-orange-400
              "
            >
              <Star className="h-3 w-3 fill-orange-400" />
              Most Popular
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-7 sm:p-8">

          {/* FLAG + COUNTRY */}

          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-4">

              {renderFlag(country)}

              <div>
                <span
                  className="
                    block
                    text-[10px]
                    font-mono
                    uppercase
                    tracking-[0.2em]
                    text-neutral-500
                  "
                >
                  {getCountryName(country)}
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-xs
                    font-mono
                    font-semibold
                    uppercase
                    tracking-widest
                    text-sky-400
                  "
                >
                  {service.number
                    .replace('🇺🇸 ', '')
                    .replace('🇨🇦 ', '')
                    .replace('🇦🇺 ', '')}
                </span>
              </div>
            </div>

            {/* SERVICE ICON */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              {getIcon(service.id)}
            </div>
          </div>

          {/* PLAN NAME */}

          <div className="mb-5">
            <h2
              className="
                font-display
                text-2xl
                font-bold
                text-white
                sm:text-3xl
              "
            >
              {planName}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">

              <span
                className="
                  font-display
                  text-4xl
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >
                {price.split(' ')[0]}
              </span>

              <span
                className="
                  font-mono
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-orange-400
                "
              >
                {price.split(' ')[1]}
              </span>

            </div>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              mb-7
              min-h-[70px]
              text-sm
              leading-relaxed
              text-neutral-300
            "
          >
            {service.description}
          </p>

          {/* FEATURES HEADER */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              border-b
              border-white/10
              pb-3
            "
          >
            <span
              className="
                text-[10px]
                font-mono
                font-semibold
                uppercase
                tracking-widest
                text-neutral-400
              "
            >
              Included Features
            </span>

            <span
              className="
                text-[10px]
                font-mono
                text-sky-400
              "
            >
              {service.features.length} Included
            </span>
          </div>

          {/* FEATURES */}

          <div
            className="
              mb-7
              rounded-2xl
              border
              border-white/10
              bg-neutral-950/70
              p-5
            "
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">

              {service.features.map((feature, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="flex items-start gap-2.5"
                >
                  <div
                    className="
                      mt-0.5
                      flex
                      h-4
                      w-4
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-sky-400/10
                    "
                  >
                    <Check className="h-3 w-3 text-sky-400" />
                  </div>

                  <span
                    className="
                      text-xs
                      leading-relaxed
                      text-slate-200
                    "
                  >
                    {feature}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* SUPPORT / DELIVERY */}

          <div className="mb-7 grid grid-cols-2 gap-3">

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              "
            >
              <span
                className="
                  mb-1
                  block
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-wider
                  text-sky-300
                "
              >
                Support
              </span>

              <span
                className="
                  block
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {getSupport(service.features)}
              </span>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              "
            >
              <span
                className="
                  mb-1
                  block
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-wider
                  text-orange-400
                "
              >
                Delivery
              </span>

              <span
                className="
                  block
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {getDelivery(service.features)}
              </span>
            </div>

          </div>

          {/* HIGHLIGHT */}

          <div
            className="
              mb-7
              rounded-xl
              border
              border-orange-500/20
              bg-orange-500/5
              px-4
              py-3
            "
          >
            <span
              className="
                text-[10px]
                font-mono
                font-semibold
                uppercase
                tracking-wider
                text-orange-400
              "
            >
              {service.highlight
                .replace('🇺🇸 ', '')
                .replace('🇨🇦 ', '')
                .replace('🇦🇺 ', '')}
            </span>
          </div>

          {/* CTA */}

          <button
            onClick={() => onSelectService(service.title)}
            className="
              mt-auto
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-orange-400/30
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              px-5
              py-3.5
              text-xs
              font-semibold
              text-white
              shadow-lg
              shadow-orange-500/20
              transition-all
              duration-300
              hover:from-orange-400
              hover:to-orange-500
              hover:shadow-orange-500/30
            "
          >
            <span>
              {isBusiness
                ? 'Choose Business Plan'
                : isPremium
                ? 'Choose Premium Plan'
                : 'Get Started'}
            </span>

            <ArrowUpRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>

        </div>
      </div>
    );
  };

  /* =========================================================
     COUNTRY SECTION HEADER
  ========================================================= */

  const renderCountryHeader = (
    country: Country,
    title: string,
    description: string
  ) => {
    return (
      <div
        className="
          mb-9
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
        "
      >
        {renderFlag(country)}

        <div>
          <span
            className={`
              block
              text-xs
              font-mono
              uppercase
              tracking-[0.2em]
              ${
                country === 'Canada'
                  ? 'text-orange-400'
                  : 'text-sky-400'
              }
            `}
          >
            {getCountryName(country)}
          </span>

          <h2
            className="
              mt-1
              font-display
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-neutral-400
            "
          >
            {description}
          </p>
        </div>

        <div
          className="
            hidden
            h-px
            flex-1
            bg-white/10
            sm:block
          "
        />
      </div>
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div
      className="
        w-full
        bg-neutral-950
        px-6
        pb-24
        pt-28
        sm:px-10
        lg:px-16
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <Breadcrumb
          items={[
            {
              label: 'Services',
            },
          ]}
        />

        {/* =================================================
            HERO
        ================================================= */}

        <div className="mb-20 max-w-4xl">

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-neutral-400
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-orange-500
                shadow-[0_0_8px_rgba(249,115,22,0.8)]
              "
            />

            <span className="font-semibold text-sky-400">
              Website Packages
            </span>

            <span className="text-neutral-600">
              ·
            </span>

            <span className="font-semibold text-orange-400">
              USA · Canada · Australia
            </span>
          </div>

          <h1
            className="
              font-display
              text-4xl
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-6xl
            "
          >
            Professional Websites
            <br />
            Built For{' '}

            <span
              className="
                bg-gradient-to-r
                from-sky-400
                via-blue-400
                to-orange-400
                bg-clip-text
                text-transparent
              "
            >
              Business Growth.
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              font-normal
              leading-relaxed
              text-neutral-300
              sm:text-lg
            "
          >
            Choose a professional website package designed for
            your business. From simple business websites to
            advanced digital experiences, GrowDigital builds
            fast, responsive and conversion-focused websites for
            businesses across the USA, Canada and Australia.
          </p>

        </div>

        {/* =================================================
            USA PACKAGES
        ================================================= */}

        <section className="mb-24">

          {renderCountryHeader(
            'USA',
            'USA Website Packages',
            'Professional website solutions for businesses in the USA.'
          )}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-3
            "
          >
            {usaPlans.map((service) =>
              renderPlanCard(service, 'USA')
            )}
          </div>

        </section>

        {/* =================================================
            CANADA PACKAGES
        ================================================= */}

        <section className="mb-24">

          {renderCountryHeader(
            'Canada',
            'Canada Website Packages',
            'Professional website solutions for businesses in Canada.'
          )}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-3
            "
          >
            {canadaPlans.map((service) =>
              renderPlanCard(service, 'Canada')
            )}
          </div>

        </section>

        {/* =================================================
            AUSTRALIA PACKAGES
        ================================================= */}

        <section className="mb-24">

          {renderCountryHeader(
            'Australia',
            'Australia Website Packages',
            'Professional website solutions for businesses in Australia.'
          )}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-3
            "
          >
            {australiaPlans.map((service) =>
              renderPlanCard(service, 'Australia')
            )}
          </div>

        </section>

        {/* =================================================
            growdigital STANDARD
        ================================================= */}

        <section
          className="
            mb-16
            rounded-3xl
            border
            border-white/10
            bg-neutral-900/40
            p-8
            sm:p-12
          "
        >

          <div
            className="
              mx-auto
              mb-10
              max-w-2xl
              text-center
            "
          >

            <span
              className="
                mb-2
                block
                text-xs
                font-mono
                font-semibold
                uppercase
                tracking-widest
                text-orange-400
              "
            >
              The growdigital Standard
            </span>

            <h3
              className="
                font-display
                text-2xl
                font-extrabold
                text-white
                sm:text-3xl
              "
            >
              Every Website Includes Our{' '}

              <span
                className="
                  bg-gradient-to-r
                  from-sky-400
                  via-sky-300
                  to-orange-400
                  bg-clip-text
                  text-transparent
                "
              >
                Digital Standard.
              </span>
            </h3>

            <p
              className="
                mt-2
                text-xs
                font-normal
                text-slate-300
                sm:text-sm
              "
            >
              Every website is designed to be fast, responsive,
              professional and ready to grow with your business.
            </p>

          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {/* Ownership */}

            <div
              className="
                space-y-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition-all
                hover:border-sky-500/30
              "
            >

              <ShieldCheck className="h-5 w-5 text-sky-400" />

              <h4
                className="
                  font-display
                  text-sm
                  font-semibold
                  text-white
                "
              >
                100% Client Ownership
              </h4>

              <p
                className="
                  text-xs
                  font-normal
                  leading-relaxed
                  text-slate-300
                "
              >
                You own your website, content, domain and digital
                assets without unnecessary lock-in.
              </p>

            </div>

            {/* Performance */}

            <div
              className="
                space-y-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition-all
                hover:border-orange-500/30
              "
            >

              <Zap className="h-5 w-5 text-orange-400" />

              <h4
                className="
                  font-display
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Fast Performance
              </h4>

              <p
                className="
                  text-xs
                  font-normal
                  leading-relaxed
                  text-slate-300
                "
              >
                Websites engineered for fast loading and smooth
                experiences across desktop and mobile devices.
              </p>

            </div>

            {/* SEO */}

            <div
              className="
                space-y-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition-all
                hover:border-sky-500/30
              "
            >

              <Globe className="h-5 w-5 text-sky-400" />

              <h4
                className="
                  font-display
                  text-sm
                  font-semibold
                  text-white
                "
              >
                SEO Ready
              </h4>

              <p
                className="
                  text-xs
                  font-normal
                  leading-relaxed
                  text-slate-300
                "
              >
                Clean structure, metadata and technical
                foundations designed to support search visibility.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section
          className="
            rounded-3xl
            border
            border-white/15
            bg-gradient-to-r
            from-neutral-900
            via-neutral-900/90
            to-neutral-950
            p-8
            shadow-2xl
            sm:p-12
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-7
              md:flex-row
            "
          >

            <div>

              <h3
                className="
                  font-display
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Need a custom website?
              </h3>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-xs
                  font-normal
                  leading-relaxed
                  text-slate-300
                  sm:text-sm
                "
              >
                Tell us about your business and we'll help you
                choose the right package or create a completely
                custom website solution.
              </p>

            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <button
                onClick={() => onNavigate('contact')}
                className="
                  rounded-xl
                  border
                  border-orange-400/30
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  px-6
                  py-3.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-orange-500/25
                  transition-all
                  hover:from-orange-400
                  hover:to-orange-500
                "
              >
                Get Free Consultation
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="
                  glass-panel
                  rounded-xl
                  border
                  border-sky-400/30
                  px-5
                  py-3.5
                  text-xs
                  font-medium
                  text-sky-200
                  transition-all
                  hover:border-sky-300
                  hover:bg-sky-500/10
                "
              >
                View Our Work
              </button>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};
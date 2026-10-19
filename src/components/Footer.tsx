import React from "react";
import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

interface FooterProps {
  onOpenCommission: () => void;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenCommission, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Our Work", page: "work" },
    { label: "Our Process", page: "process" },
    { label: "Contact", page: "contact" },
  ];

  const services = [
    "Website Design & Development",
    "E-commerce Development",
    "Search Engine Optimization",
    "UI/UX Design",
    "Digital Marketing",
    "Website Maintenance",
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950 text-white">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-10 lg:px-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              aria-label="Grow Digital home"
              className="mb-5 inline-flex items-center gap-3 text-left"
            >
              <img
                src="/images/grow_digital_logo_transparent.png"
                alt="Grow Digital"
                className="h-auto w-48 object-contain sm:w-56"
              />
            </button>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Building modern digital experiences that help businesses
              establish their online presence, connect with customers, and
              grow with confidence.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <Globe2 className="h-4 w-4 text-sky-400" />
              <span>Serving businesses worldwide</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(link.page)}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-sky-300"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Our Services
            </h3>

            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => handleNavigate("services")}
                    className="text-left text-sm text-slate-400 transition-colors hover:text-orange-400"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Get In Touch
            </h3>

            <p className="mb-6 text-sm leading-6 text-slate-400">
              Have a project in mind? Let&apos;s discuss how we can help your
              business grow.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:grow.digiii@gmail.com"
                className="group flex items-start gap-3 text-sm text-slate-400 transition-colors hover:text-sky-300"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span className="break-all">grow.digiii@gmail.com</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href="tel:+916283653246"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-sky-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-sky-400" />
                <span>6283653246</span>
              </a>

              <a
                href="tel:+916204010083"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-sky-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-sky-400" />
                <span>6204010083</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <span>India · Serving International Clients</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCommission}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 hover:from-sky-400 hover:to-sky-500"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {currentYear} Grow Digital. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => handleNavigate("contact")}
              className="transition-colors hover:text-white"
            >
              Contact Us
            </button>

            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

            <span>Designed for growth. Built for the future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
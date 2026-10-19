import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string; onClick?: () => void }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6 flex-wrap">
      <button
        onClick={() => {
          if (items[0]?.onClick) items[0].onClick();
          else window.location.hash = '#/';
        }}
        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-neutral-500" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            {isLast || !item.onClick ? (
              <span className="text-orange-400 font-semibold">{item.label}</span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-sky-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};


import React from 'react';

export interface GrowDigitalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses: Record<
  NonNullable<GrowDigitalLogoProps['size']>,
  string
> = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-20',
};

export const GrowDigitalLogo: React.FC<GrowDigitalLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  return (
    <img
      src="/images/grow_digital_logo_transparent.png"
      alt="GrowDigital - Helping Local Businesses Grow Online"
      className={`${sizeClasses[size]} w-auto max-w-full object-contain ${className}`}
    />
  );
};

export default GrowDigitalLogo;

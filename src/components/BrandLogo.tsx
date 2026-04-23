import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
}

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className={`flex flex-col leading-none ${compact ? 'gap-0.5' : 'gap-1'}`}>
      <span
        className={`font-headline font-black uppercase tracking-[-0.08em] text-red-600 drop-shadow-[0_2px_10px_rgba(255,0,0,0.18)] ${compact ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}
      >
        La Diablada Pillareña
      </span>
      <span
        className={`h-[2px] w-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-80 ${compact ? 'max-w-[150px]' : 'max-w-[220px]'}`}
      />
    </div>
  );
}
"use client"

import { useEffect } from 'react';
import { useBackground } from '../context/BackgroundContext';
import { usePathname } from 'next/navigation';

export default function GlobalBlur() {
  const { globalBlur, setGlobalBlur } = useBackground();
  const pathname = usePathname();

  // Reset blur when pathname changes
  useEffect(() => {
    // Use setTimeout to ensure this happens after the current render cycle
    const timer = setTimeout(() => {
      setGlobalBlur(0);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [pathname, setGlobalBlur]);

  return (
    <div 
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{ 
        filter: `blur(${globalBlur}px)`,
        transition: 'filter 0.3s ease-in-out',
        willChange: 'filter'
      }}
    />
  );
} 
"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useBackground } from '../context/BackgroundContext';

export default function LogoLink() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMargin, setMobileMargin] = useState('0px');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setGlobalBlur } = useBackground();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Reset blur when component mounts or pathname changes
  useEffect(() => {
    // Don't run effects on home page
    if (pathname === '/') return;

    // Reset local state
    setBlurAmount(0);
    setIsTransitioning(false);
    
    // Reset global blur state
    setGlobalBlur(0);
    
    // Reset global blur when component unmounts
    return () => {
      setGlobalBlur(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setGlobalBlur, pathname]);

  // Calculate the correct margin for mobile
  useEffect(() => {
    if (pathname === '/') return;

    const calculateMargin = () => {
      if (window.innerWidth < 768) {
        setMobileMargin('-75px');
      } else {
        setMobileMargin('0px');
      }
    };

    calculateMargin();
    window.addEventListener('resize', calculateMargin);

    return () => {
      window.removeEventListener('resize', calculateMargin);
    };
  }, [pathname]);

  // Fade in the logo after a short delay
  useEffect(() => {
    if (pathname === '/') return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/') return;
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    let currentBlur = 0;
    
    intervalRef.current = setInterval(() => {
      currentBlur += 5;
      setBlurAmount(currentBlur);
      
      setTimeout(() => {
        setGlobalBlur(currentBlur);
      }, 0);
      
      if (currentBlur >= 80) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        setTimeout(() => {
          router.push('/');
        }, 100);
      }
    }, 15);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Failed to load logo image');
    setImageError(true);
  };

  // Early return for home page only
  if (pathname === '/') return null;

  return (
    <div className="w-full h-0 relative">
      <div 
        ref={logoRef}
        className={`absolute ${pathname === '/' ? 'md:hidden top-8 left-1/2 -translate-x-1/2' : 'top-8 left-1/2 md:top-4 md:left-[calc(10px+2rem)] lg:left-[calc(40px+2rem)]'} z-[100] cursor-pointer transition-all duration-300`}
        style={{ 
          opacity: isVisible ? (isTransitioning ? 0.8 : 1) : 0,
          pointerEvents: 'auto',
          marginLeft: isMobile ? mobileMargin : '0px',
          transform: isTransitioning 
            ? isMobile 
              ? 'scale(1.5)' 
              : 'scale(1.15)'
            : isMobile 
              ? 'scale(1.5)' 
              : 'scale(1.15)'
        }}
      >
        <Link href="/" onClick={handleClick}>
          {!imageError ? (
            <Image 
              src="/images/sracing.png" 
              alt="Sperm Racing Logo" 
              width={188} 
              height={63} 
              priority
              loading="eager"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-[120px] h-[40px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              Logo
            </div>
          )}
        </Link>
      </div>
    </div>
  );
} 
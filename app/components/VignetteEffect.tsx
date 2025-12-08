"use client"

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useBackground } from '../context/BackgroundContext';

interface VignetteEffectProps {
  isWhiteBackground?: boolean;
}

export default function VignetteEffect({ isWhiteBackground = false }: VignetteEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isWhiteBackground: globalIsWhiteBackground } = useBackground();
  const shouldShowCircle = isHomePage && (isWhiteBackground || globalIsWhiteBackground);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawVignette = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;
      // Add iPad detection
      const isIPad = window.innerWidth >= 768 && window.innerWidth <= 1024;
      // Make the vignette 15% bigger on mobile, 80% of width on iPad
      const vignetteRadius = isMobile 
        ? .53 * canvas.height 
        : isIPad 
          ? 0.63 * (Math.max(canvas.width, canvas.height))
          : 0.515 * canvas.width + (1.6**(canvas.height/canvas.width) * 50);
      
      // Add vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, vignetteRadius
      );
      
      if (isWhiteBackground) {
        vignette.addColorStop(0, 'rgba(255, 255, 255, 0)');
        vignette.addColorStop(0.85, 'rgba(255, 255, 255, 0)');
        vignette.addColorStop(0.95, 'rgba(0, 0, 0, 0.5)');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 1)');
      } else {
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(0.85, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(0.95, 'rgba(0, 0, 0, 0.6)');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 1)');
      }
      
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw microscope lens circle only on the home page when white background is loaded
      if (shouldShowCircle) {
        // Make the lens 65% bigger on mobile (50% + 15% more)
        const lensRadius = Math.min(canvas.width, canvas.height) * (isMobile ? 0.76 : 0.44);
        const lensX = canvas.width / 2;
        const lensY = canvas.height / 2;
        
        // Draw the lens circle as an outline only
        ctx.beginPath();
        ctx.arc(lensX, lensY, lensRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      if (typeof window === 'undefined') return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawVignette();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resizeCanvas();
      }
    };

    // Initial setup
    resizeCanvas();

    // Add event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeCanvas);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [isWhiteBackground, shouldShowCircle, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
} 
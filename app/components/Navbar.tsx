'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import localFont from 'next/font/local';
import { Dialog, DialogContent, DialogTitle, VisuallyHidden } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import WaitlistSignupForm from '@/app/components/WaitlistSignupForm';
import { Tv } from 'lucide-react';

const monoFont = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
});

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navLinks = [
    { name: 'LIVESTREAM', href: '/races' },
    { name: 'MANIFESTO', href: '/manifesto' },
    { name: 'PROCESS', href: '/methodology' },
    // { name: 'ATHLETES', href: '/team' },
    // { name: 'TRACKS', href: '/tracks' },
    // { name: 'MERCH', href: '/merch' },
  ];

  const getNavClasses = () => {
    return 'absolute top-0 left-0 right-0 z-50 flex items-center justify-center px-4 md:px-8 py-6 bg-transparent';
  };

  const isManifestoPage = pathname === '/manifesto';
  
  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    const textColor = isManifestoPage 
      ? (isActive ? 'text-[#FF361D]' : 'text-black')
      : (isActive ? 'text-[#FF361D]' : 'text-white');
    return `text-xs md:text-sm tracking-wider transition-colors hover:text-gray-300 ${textColor}`;
  };
  
  const fontFamily = monoFont.style.fontFamily;

  return (
    <nav className={getNavClasses()}>
      {/* Mobile Logo - top-left, hides when menu is open */}
      <div className={`md:hidden absolute top-0 left-4 z-50 transition-opacity ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Link href="/" className="p-2 block">
          <div className="relative w-[40px] h-[40px]">
            <Image
              src={isManifestoPage ? "/images/logo/mainLogo.png" : "/LOGO-07.svg"}
              alt="Sperm Racing Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Desktop Logo - aligned with hero text on main page */}
      <div className="hidden md:block absolute left-16 md:left-20 top-1/2 -translate-y-1/2">
        <Link href="/">
          <div className="relative w-[220px] h-[40px]">
            <Image
              src={isManifestoPage ? "/LOGO-13-black.svg" : "/LOGO-13.svg"}
              alt="Sperm Racing Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation - Centered */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={getLinkClasses(link.href)}
            style={{ fontFamily }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button - Hide when menu is open */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden absolute right-4 z-50 ${isManifestoPage ? 'text-black' : 'text-white'} p-2 transition-opacity ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-4 py-6">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <div className="relative w-[180px] h-[90px]">
                <Image
                  src="/images/logo/white.png"
                  alt="SR Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          {/* Navigation Links - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-white hover:text-[#FF361D] transition-colors"
                style={{ fontFamily }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="px-4 pb-8 flex flex-col gap-3">
            <Button 
              type="button"
              variant="outline" 
              className="rounded-none border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 w-full uppercase tracking-wider text-xs"
              style={{ fontFamily }}
              onClick={() => {
                setIsDialogOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Get Notified
            </Button>

            <Link href="/races" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <Button 
                className="rounded-none bg-white text-black hover:bg-white/90 px-8 py-6 w-full uppercase tracking-wider font-bold text-xs flex items-center justify-center gap-2"
                style={{ fontFamily }}
              >
                <Tv className="w-3 h-3" />
                Watch Live
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Dialog Component - Rendered independently of the menu */}
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          // Reset viewport zoom when dialog closes
          if (!open) {
            setTimeout(() => {
              const viewport = document.querySelector('meta[name="viewport"]');
              if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
              }
            }, 100);
          }
        }}
      >
        <DialogContent 
            className="bg-black border-0 text-white p-6 md:p-12 relative overflow-hidden z-[100] w-[calc(100vw-2rem)] md:w-full max-w-[90vw] md:max-w-lg"
            onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <VisuallyHidden>
            <DialogTitle>Get Notified on Next Race</DialogTitle>
          </VisuallyHidden>
          {/* Subtle reddish-orange glow effects */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF361D] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF361D] rounded-full blur-[120px]"></div>
          </div>
          <div className="relative z-10">
            <WaitlistSignupForm variant="glass" />
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
'use client';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import { Button } from '@/components/ui/button';
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

const sharpGroteskBold = localFont({
  src: '../../public/fonts/Sharp_Grotesk/OTF-Mac/Bold16.otf',
  variable: '--font-sharp-grotesk-bold',
});

export default function Footer() {
  const fontFamily = monoFont.style.fontFamily;
  const titleFont = sharpGroteskBold.style.fontFamily;

  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://instagram.com/spermracing' },
    { name: 'X', href: 'https://twitter.com/spermracing' },
    { name: 'YOUTUBE', href: 'https://youtube.com/@spermracing' },
    // { name: 'KICK', href: 'https://kick.com/spermracing' },
    // { name: 'POLYMARKET', href: 'https://polymarket.com' }, 
  ];

  return (
    <footer className="w-full bg-[#FF361D] text-white py-16 px-8 md:px-16 lg:px-24 overflow-hidden relative min-h-[400px] flex items-center">
        {/* Footer Background Image */}
        <div className="absolute inset-0 z-0">
           <Image 
             src="/footer.png" 
             alt="Sperm Racing Footer Background" 
             fill
             className="object-cover object-center opacity-100"
             priority={false}
             quality={100}
           />
        </div>
        
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start">
        
        {/* Left Column - Title and Button (Spans 5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-12">
          <h2 
            className="text-4xl md:text-5xl font-bold leading-[0.9] tracking-wide uppercase"
            style={{ fontFamily: titleFont }}
          >
            The Sport Behind<br />Men's Health.
          </h2>
          <Link href="/races">
            <Button 
                className="bg-white text-[#FF361D] hover:bg-white/90 font-bold tracking-wider px-8 py-6 h-14 rounded-none uppercase min-w-[240px] w-full md:w-auto"
                style={{ fontFamily }}
            >
                <span className="mr-2"><Tv className="h-5 w-5" /></span>
                Watch Live
            </Button>
          </Link>

          {/* Mobile Divider */}
          <div className="w-full h-[1px] bg-white/20 md:hidden"></div>
        </div>

        {/* Right Column - Logo + Links (Spans 7 cols) */}
        <div className="md:col-span-7 flex flex-col md:flex-row justify-start md:justify-end gap-8 md:gap-16 pt-2">
            {/* Desktop Logo - Moved here to be closer to links */}
            <div className="hidden md:flex flex-col items-center justify-start mr-8">
                 <div className="relative w-[200px] h-[125px] mb-4">
                    <Image
                    src="/LOGO-07.svg"
                    alt="Sperm Racing Logo"
                    fill
                    className="object-contain"
                    />
                </div>
                <div className="text-[10px] opacity-80 text-center leading-relaxed tracking-wider uppercase" style={{ fontFamily }}>
                    <p>© 2025</p>
                    <p>CABAL TRADE, INC.</p>
                </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6 w-1/2 md:w-auto">
                <h3 className="font-bold tracking-widest text-xs uppercase" style={{ fontFamily }}>CONTACT</h3>
                <div className="flex flex-col gap-3">
                    <a href="mailto:contact@spermracing.com" className="text-xs tracking-wider hover:opacity-80 transition-opacity uppercase" style={{ fontFamily }}>EMAIL</a>
                    <a href="https://www.linkedin.com/company/sperm-racing/" target="_blank" rel="noopener noreferrer" className="text-xs tracking-wider hover:opacity-80 transition-opacity uppercase" style={{ fontFamily }}>LINKEDIN</a>
                </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-6 w-1/2 md:w-auto">
                <h3 className="font-bold tracking-widest text-xs uppercase" style={{ fontFamily }}>SOCIAL MEDIA</h3>
                <div className="flex flex-col gap-3">
                    {socialLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs tracking-wider hover:opacity-80 transition-opacity uppercase"
                            style={{ fontFamily }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Mobile Bottom Logo & Copyright Section */}
         <div className="md:hidden col-span-1 flex flex-row items-center justify-between gap-4 pt-8 border-t border-white/20 mt-4">
             <div className="relative w-[120px] h-[90px] flex-shrink-0 flex items-center justify-center">
                <Image
                src="/LOGO-07.svg"
                alt="Sperm Racing Logo"
                fill
                className="object-contain object-left"
                />
            </div>
            <div className="text-xs opacity-80 text-right leading-relaxed tracking-wider uppercase flex-shrink-0" style={{ fontFamily }}>
                <p>© 2025</p>
                <p>CABAL TRADE, INC.</p>
            </div>
        </div>

      </div>
    </footer>
  );
}

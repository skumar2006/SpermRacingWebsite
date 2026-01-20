'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Footer from '@/app/components/Footer';
import { Tv } from 'lucide-react';
import { League_Gothic } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import WaitlistSignupForm from "@/app/components/WaitlistSignupForm"

// Load Fonts
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

const leagueGothic = League_Gothic({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-league-gothic',
});

export default function HomePage() {
  const fontFamily = monoFont.style.fontFamily;
  const titleFont = leagueGothic.style.fontFamily;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video autoplay on mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Function to attempt playing the video
    const attemptPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        // Autoplay was prevented, try again on user interaction
        console.log('Autoplay prevented, waiting for user interaction');
      }
    };

    // Try to play immediately
    attemptPlay();

    // Also try on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    // Try on any user interaction as a fallback
    const handleInteraction = () => {
      attemptPlay();
      // Remove listeners after first successful interaction
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleInteraction, { passive: true });
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      {/* Hero Section - Fixed height 100vh */}
      <section className="relative w-full h-[100dvh] flex flex-col pt-24 pb-0 overflow-hidden border-b border-white/20">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
           <video
             ref={videoRef}
             autoPlay
             loop
             muted
             playsInline
             preload="auto"
             className="object-cover w-full h-full"

             webkit-playsinline="true"
             x5-playsinline="true"
             x5-video-player-type="h5"
             x5-video-player-fullscreen="true"
           >
             <source src="/landing-page-hero.webm" type="video/webm" />
           </video>
           <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Grid Lines */}
        {/* Top line - Desktop: 10vh, Mobile: 15vh */}
        <div className="absolute top-[15vh] md:top-[10vh] left-0 w-full h-[1px] bg-white/10 z-10"></div>
        {/* Bottom line */}
        <div className="absolute bottom-32 md:bottom-16 left-0 w-full h-[1px] bg-white/10 z-10"></div>
        {/* Vertical lines */}
        <div className="absolute top-0 bottom-0 left-4 md:left-16 w-[1px] bg-white/10 z-10"></div>
        <div className="absolute top-0 bottom-0 right-4 md:right-16 w-[1px] bg-white/10 z-10"></div>

        {/* SR Logo - Desktop (Top Right) */}
        <div className="hidden md:block absolute top-[12vh] right-8 md:right-20 z-20">
             <div className="relative w-[180px] h-[90px]">
                <Image
                  src="/LOGO-07.svg"
                  alt="SR Logo"
                  fill
                  className="object-contain"
                />
             </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-4 md:px-16 h-full pt-[15vh] md:pt-[10vh] pb-32 md:pb-16">
            
            {/* Top Section: Title */}
            {/* Removed top margin completely to hug the grid line */}
            <div className="mt-0 md:mt-0 ml-0 md:ml-4 max-w-4xl -translate-y-2 md:-translate-y-12">
                <h1 
                    className="text-6xl md:text-8xl lg:text-[100px] leading-[0.85] tracking-tight uppercase text-[#B0B0B0]"
                    style={{ fontFamily: titleFont }}
                >
                    The World's<br />
                    <span className="text-white">Smallest Sport.</span>
                </h1>
            </div>

            {/* Bottom Section: Content */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 md:gap-0 mb-4 md:mb-4">
                
                {/* Left: Description + Manifesto */}
                <div className="max-w-md ml-2 md:ml-4 w-full md:w-auto">
                     <div className="flex items-start gap-3 mb-6">
                        <div className="w-1.5 h-1.5 bg-white mt-1.5 flex-shrink-0" />
                        <div>
                            <p className="uppercase text-[10px] tracking-widest mb-2 font-bold" style={{ fontFamily }}>Sperm Racing</p>
                            <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed uppercase max-w-xs" style={{ fontFamily }}>
                                SPERM RACING ISN'T JUST ABOUT RACING SPERM (ALTHOUGH, LET'S BE HONEST, THAT'S HILARIOUS). IT'S ABOUT <span className="text-[#FF361D]">TURNING HEALTH INTO A COMPETITION.</span>
                            </p>
                        </div>
                    </div>
                    
                    <Link href="/manifesto" className="block w-full">
                        <Button variant="outline" className="rounded-none border-white text-white bg-transparent hover:bg-white hover:text-black px-0 md:px-12 py-6 w-full md:w-auto uppercase tracking-wider text-[10px]" style={{ fontFamily }}>
                            Read Our Manifesto
                        </Button>
                    </Link>
                </div>

                {/* Right: Buttons Stacked (Mobile: Below lines) */}
                <div className="hidden md:flex flex-col gap-3 w-full md:w-[200px] mr-0 md:mr-4">
                    {/* Desktop Buttons */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="rounded-none border-white text-white bg-black/40 backdrop-blur-sm hover:bg-white hover:text-black px-8 py-6 w-full uppercase tracking-wider text-[10px]" 
                                style={{ fontFamily }}
                            >
                                Get Notified
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#121212] border-0 text-white p-6 md:p-8 w-[calc(100vw-2rem)] md:w-full max-w-[90vw] md:max-w-md">
                             <WaitlistSignupForm />
                        </DialogContent>
                    </Dialog>

                    <Link href="/races" className="w-full">
                        <Button className="rounded-none bg-white text-black hover:bg-white/90 px-8 py-6 w-full uppercase tracking-wider font-bold text-[10px] flex items-center justify-center gap-2" style={{ fontFamily }}>
                            <span className="mb-0.5"><Tv className="w-3 h-3" /></span>
                            Watch Live
                        </Button>
                    </Link>
                </div>

            </div>

        </div>

        {/* Mobile Buttons - Absolute Bottom Stacking */}
        <div className="md:hidden absolute bottom-0 left-0 w-full p-4 pb-8 flex flex-col gap-3 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
             <Dialog>
                <DialogTrigger asChild>
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="rounded-none border-white text-white bg-black/80 backdrop-blur-sm hover:bg-white hover:text-black px-8 py-6 w-full uppercase tracking-wider text-[10px]" 
                        style={{ fontFamily }}
                    >
                        Get Notified
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121212] border-0 text-white p-6 md:p-8 w-[calc(100vw-2rem)] md:w-full max-w-[90vw] md:max-w-md rounded-sm">
                     <WaitlistSignupForm />
                </DialogContent>
            </Dialog>

            <Link href="/races" className="w-full">
                <Button className="rounded-none bg-white text-black hover:bg-white/90 px-8 py-6 w-full uppercase tracking-wider font-bold text-[10px] flex items-center justify-center gap-2" style={{ fontFamily }}>
                    <span className="mb-0.5"><Tv className="w-3 h-3" /></span>
                    Watch Live
                </Button>
            </Link>
        </div>

        {/* Stats Bar - Desktop Only */}
        <div className="hidden md:flex absolute bottom-0 left-0 w-full h-16 items-center px-8 md:px-16 border-t border-white/10 bg-black/20 backdrop-blur-sm z-20">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] tracking-widest uppercase text-gray-500" style={{ fontFamily }}>
                <div>
                    Last Race: <span className="text-white">USC VS UCLA 2025</span>
                </div>
                <div className="md:text-center">
                    Race Distance: <span className="text-white">3800μm</span>
                </div>
                <div className="md:text-center">
                    Number of Laps: <span className="text-white">1</span>
                </div>
                <div className="text-right">
                    Current Record: <span className="text-white">1M 03 SEC [USC - TRISTAN]</span>
                </div>
            </div>
        </div>

      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

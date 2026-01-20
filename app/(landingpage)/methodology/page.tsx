'use client';

import { useState, useRef } from 'react';
import { League_Gothic } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Footer from '@/app/components/Footer';

// Load Fonts
const monoFont = localFont({
  src: [
    {
      path: '../../../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/JetBrainsMono-Bold.woff2',
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

export default function MethodologyPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const duration = 100; // Hardcoded duration 1:40 (100 seconds)
  
  const fontFamily = monoFont.style.fontFamily;
  const titleFont = leagueGothic.style.fontFamily;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayToggle = () => {
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * duration;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <div className="flex-1 flex flex-col pt-24 pb-12 px-4 md:px-8 lg:px-12 w-full">
        {/* Mobile: Title Above Video */}
        <div className="md:hidden mb-6 flex flex-col items-center text-center">
          <button 
            onClick={handlePlayToggle}
            className="flex items-center gap-2 text-xs font-bold mb-4 text-white hover:text-[#FF361D] transition-colors tracking-widest uppercase"
            style={{ fontFamily }}
          >
            <span>Watch Now</span>
            <span>→</span>
          </button>
          <h1 
            className="text-7xl leading-[0.8] uppercase tracking-tighter"
            style={{ fontFamily: titleFont }}
          >
            <span className="text-gray-400">How It</span><br/>
            <span className="text-white">Works</span>
          </h1>
        </div>

        {/* Video Container / Interface */}
        <div className="relative w-full max-w-[1400px] aspect-video bg-[#050505] border border-white/10 rounded-lg overflow-hidden shadow-2xl group mx-auto">
                
                {/* Video Element */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10 pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}></div>
                    <video 
                        ref={videoRef}
                        className="w-full h-full object-cover opacity-80"
                        src="/process.mp4"
                        playsInline
                        onClick={handlePlayToggle}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    />
                </div>

                {/* Top Timeline Bar */}
                <div className={`absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-center z-20 text-[10px] md:text-xs text-gray-400 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} style={{ fontFamily }}>
                    <span>{formatTime(currentTime)}</span>
                    <div 
                        className="flex-1 mx-4 md:mx-6 h-[1px] bg-white/10 relative cursor-pointer group/timeline py-2"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2"></div>
                        <div 
                            className="absolute top-1/2 left-0 h-[1px] bg-white/40 origin-left -translate-y-1/2 transition-transform duration-100 ease-linear"
                            style={{ transform: `scaleX(${duration ? currentTime / duration : 0})` }}
                        ></div>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] opacity-0 group-hover/timeline:opacity-100 -translate-y-1/2">
                            <div className="absolute w-2 h-2 bg-white rounded-full -translate-y-[3px]" style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
                        </div>
                    </div>
                    <span>01:40</span>
                </div>

                {/* Center Play Button */}
                <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                    <button 
                        onClick={handlePlayToggle}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm hover:scale-110 transition-all duration-300 group-hover:bg-white/10"
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white ml-1">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop: Bottom Left Content - Title and Button */}
                <div className={`hidden md:block absolute bottom-12 left-12 z-20 transition-all duration-500 ${isPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <button 
                        onClick={handlePlayToggle}
                        className="flex items-center gap-2 text-xs font-bold mb-2 text-white hover:text-[#FF361D] transition-colors tracking-widest uppercase"
                        style={{ fontFamily }}
                    >
                        <span>Watch Now</span>
                        <span>→</span>
                    </button>
                    <h1 
                        className="text-[80px] md:text-[100px] lg:text-[120px] leading-[0.8] uppercase text-white tracking-tighter"
                        style={{ fontFamily: titleFont }}
                    >
                        How It<br/>Works
                    </h1>
                </div>
        </div>

        {/* Technology Partners Section */}
        <div className="w-full max-w-[1400px] mx-auto mt-16 md:mt-24 mb-8">
          <div className="flex flex-col items-center">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="w-1.5 h-1.5 bg-[#FF361D]" />
              <h2 
                className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 font-bold"
                style={{ fontFamily }}
              >
                Technology Partners
              </h2>
              <div className="w-1.5 h-1.5 bg-[#FF361D]" />
            </div>

            {/* Partner Logo */}
            <div className="flex items-center justify-center">
              <a 
                href="http://cygnusphoton.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-[280px] md:w-[400px] h-[160px] md:h-[225px] bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 flex items-center justify-center hover:border-white/20 transition-colors">
                  <Image
                    src="/logos/cygnus-photonics.png"
                    alt="Cygnus Photonics - Light Processing"
                    fill
                    className="object-contain p-4 md:p-6 invert"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

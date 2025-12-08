'use client';

import { League_Gothic } from 'next/font/google';
import localFont from 'next/font/local';
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

export default function Team() {
  const fontFamily = monoFont.style.fontFamily;
  const titleFont = leagueGothic.style.fontFamily;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-6xl md:text-8xl lg:text-[120px] font-bold uppercase tracking-tight mb-4"
            style={{ fontFamily: titleFont }}
          >
            Coming Soon!
          </h1>
        </div>
      </div>
      <Footer />
    </main>
  );
}

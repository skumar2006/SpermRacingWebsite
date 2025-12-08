"use client"

import { useState } from 'react'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

// Load the Sharp Grotesk fonts
const sharpGrotesk = localFont({
  src: '../../public/fonts/Sharp_Grotesk/OTF-Mac/Bold11.otf',
  variable: '--font-sharp-grotesk'
})

const sharpGroteskBold = localFont({
  src: '../../public/fonts/Sharp_Grotesk/OTF-Mac/Bold16.otf',
  variable: '--font-sharp-grotesk-bold'
})

// Load JetBrains Mono for the monospace text
const monoFont = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-mono"
})

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Eric Zhu",
      link: "https://x.com/ericzhu105"
    },
    {
      name: "Nick Small",
      link: "https://x.com/Nick_Smoll"
    },
    {
      name: "Shane Fan",
      link: "https://www.instagram.com/shanefanx/?hl=en"
    },
    {
      name: "Jibraan Kadri",
      link: "https://x.com/KadriJibraan"
    },
    {
      name: "Tejasv Bhatia",
      link: "https://x.com/bhatia_tejasv"
    },
    {
      name: "Sahana Mantha",
      link: "https://www.instagram.com/sahana.mantha/"
    },
    {
      name: "Luke Hawash",
      link: "https://www.instagram.com/lukehawash/"
    },
    {
      name: "Ryan Tang",
      link: "https://www.instagram.com/ryanhtang/"
    }
  ]

  return (
    <div className="h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-5" 
        style={{
          backgroundImage: "url('/images/sperm.jpeg')",
          backgroundSize: '75% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          width: '132vw',
          height: '100vh',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div className={`relative z-10 flex flex-col items-center py-6 md:py-10 px-4 md:px-6 ${monoFont.className} tracking-wider`}>
        {/* Hero Section */}
        <div className="w-full max-w-[1200px] relative mt-[12vh] mb-32 -ml-4 md:-ml-12 pl-8 md:pl-8">
          <h1 
            className="text-[65px] md:text-[120px] leading-[0.85] tracking-[0.08em]"
            style={{ fontFamily: sharpGrotesk.style.fontFamily }}
          >
            <span className="opacity-60">
              THE TEAM
            </span><br />
            <span className="opacity-80">
              BEHIND THE
            </span><br />
            <span>
              MICROSCOPIC RACE.
            </span>
          </h1>
        </div>

        {/* Team Members Grid */}
        <div className="max-w-[800px] w-full -mt-12 mb-16 md:mb-24 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <a 
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block text-white text-xl md:text-2xl font-normal hover:text-[#FF361D] transition-colors duration-300 flex items-center gap-4 tracking-tight"
                  style={{ fontFamily: monoFont.style.fontFamily }}
                >
                  {member.name}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#FF361D"
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform -rotate-45 transition-colors duration-300"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                {/* Animated underline */}
                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#FF361D] transition-all duration-300 group-hover:w-full z-0"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-full bg-[#FF361D]/5 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
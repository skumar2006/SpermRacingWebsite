'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import BouncingArrow from '../../../components/ui/BouncingArrow';
import CountdownTimer from '../../../components/ui/CountdownTimer';

// Define the target date for the countdown (April 25, 2025, 6:00 PM PDT)
// PDT is UTC-7. 6:00 PM is 18:00.
// So, the UTC time is April 25, 18:00 + 7 hours = April 26, 01:00 UTC
const eventTargetDate = new Date(Date.UTC(2025, 3, 26, 1, 0, 0)); // Month is 0-indexed (April = 3)

// TEST DATE: April 25, 2025, 3:33 PM PDT (UTC-7)
// 3:33 PM = 15:33. 15:33 + 7 hours = 22:33 UTC
// const eventTargetDate = new Date(Date.UTC(2025, 3, 25, 22, 33, 0)); // Month is 0-indexed (April = 3)

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Load the Sharp Grotesk fonts
const sharpGrotesk = localFont({
  src: '../../../public/fonts/Sharp_Grotesk/OTF-Mac/Bold11.otf',
  variable: '--font-sharp-grotesk',
});

const sharpGroteskBold = localFont({
  src: '../../../public/fonts/Sharp_Grotesk/OTF-Mac/Bold16.otf',
  variable: '--font-sharp-grotesk-bold',
});

// Polymarket Odds component
function PolymarketOdds() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentSlug, setCurrentSlug] = useState(
    'sperm-race-tristian-usc-vs-asher-ucla'
  );

  const eventDetails: {
    [key: string]: {
      fighters: [string, string];
      affiliations: [string, string];
      stats: [
        { height: string; weight: string; age: string },
        { height: string; weight: string; age: string }
      ];
      outcomeKeywords: [string, string];
      colors: [string, string];
      instagramUrls: [string, string];
      affiliationUrls: [string, string];
      rounds: number;
      images: [string, string];
      detailedStats: [
        {
          quirk: string;
          faveFood: string;
          hometown: string;
          benchPR: string;
          squatPR: string;
          pullups?: string; // Optional for Tristan/Asher
          theme?: string; // Optional for Asher
          deadlift?: string; // Optional for Jimmy
          mileTime?: string; // Optional for Noah
          biography: string;
          storyHighlights: { [key: string]: string };
          background: { [key: string]: string };
        },
        {
          quirk: string;
          faveFood: string;
          hometown: string;
          benchPR: string;
          squatPR: string;
          pullups?: string; // Optional for Tristan/Asher
          theme?: string; // Optional for Asher
          deadlift?: string; // Optional for Jimmy
          mileTime?: string; // Optional for Noah
          biography: string;
          storyHighlights: { [key: string]: string };
          background: { [key: string]: string };
        }
      ];
    };
  } = {
    'sperm-race-tristian-usc-vs-asher-ucla': {
      fighters: ['Tristan Milker', 'Asher Proeger'],
      affiliations: ['USC', 'UCLA'],
      stats: [
        { height: '5\'10"', weight: '175 lbs', age: '20' },
        { height: '5\'11"', weight: '182 lbs', age: '19' },
      ],
      outcomeKeywords: ['Tristan', 'Asher'],
      colors: ['#990000', '#2774AE'],
      instagramUrls: [
        'https://www.instagram.com/tristanmilker/',
        'https://www.instagram.com/asherproeger/',
      ],
      affiliationUrls: [
        'https://www.instagram.com/uscedu/',
        'https://www.instagram.com/ucla/',
      ],
      rounds: 3,
      images: [
        '/images/competitors/tristan.jpg',
        '/images/competitors/asher.jpg',
      ],
      detailedStats: [
        {
          quirk: 'Chalant',
          faveFood: 'Ribeye',
          hometown: 'Indiana',
          benchPR: '225 lbs',
          squatPR: '315 lbs',
          pullups: '20+',
          biography:
            'First-gen college student from Indiana with a deep voice and chalant attitude who turned fitness and creative hustle into a way of life.',
          storyHighlights: {
            'Origin Story':
              'Started his fitness journey in high school after being inspired by athletes who came from similar backgrounds. Turned his passion into content creation.',
            'Competitive Drive':
              'Known for his determined mindset and willingness to put everything on the line in competitive situations.',
          },
          background: {
            'College Life':
              'Currently studying business and entrepreneurship while building his personal brand and fitness journey.',
            'Fitness Goals':
              'Aims to reach a 275 lbs bench press and 405 lbs squat by the end of the year while maintaining lean muscle mass.',
          },
        },
        {
          quirk: 'Autistic',
          faveFood: 'Everything Beef',
          hometown: 'South Africa',
          benchPR: '225 lbs',
          squatPR: '315 lbs',
          pullups: '20+',
          theme: 'The Chalant Champion',
          biography:
            'UCLA Economics student who grew up in South Africa and developed a passion for health and fitness through a diverse sports background and entrepreneurial ventures.',
          storyHighlights: {
            'Entrepreneurial Spirit':
              'Started multiple businesses including lawn mowing, marketing, and reselling. Made money streaming Fortnite as a semi-professional player, ranking in the top 500 in America.',
            'Academic & Creative Pursuits':
              'Economics major at UCLA with a passion for philosophy and political debate. Former theater kid who knows all of Hamilton and did acting for 10 years, including kids TV shows and advertisements.',
            'Nerd Culture':
              'Major anime fan (watched around 200 series) with favorite being Code Geass. Loves gaming with favorites including Stardew Valley and Breath of the Wild. Can recite the entire FNAF lore and follows underground music artists like 2hollis.',
          },
          background: {
            'South African Roots':
              'Grew up in South Africa from ages 6-10, playing nine different sports weekly. School would end at 1pm, leaving afternoons for soccer, cricket, squash, tennis, baseball, gymnastics, swimming, and track.',
            'Fitness Philosophy':
              'Started serious gym training at 14. Focuses on increasing reps rather than PRs. Discovered that seed oils and linoleic acid cause inflammation and impact health more than traditional macro concerns.',
          },
        },
      ],
    },
    'sperm-race-noah-boat-vs-jimmy-zhang': {
      fighters: ['Noah Boat', 'Jimmy Zhang'],
      affiliations: ['loveliveserve', 'o3crew'],
      stats: [
        { height: '6\'1"', weight: '196 lbs', age: '27' },
        { height: '5\'11"', weight: '155 lbs', age: 'Unc' },
      ],
      outcomeKeywords: ['Noah', 'Jimmy'],
      colors: ['#FF361D', '#FFFFFF'],
      instagramUrls: [
        'https://www.instagram.com/noahboat/',
        'https://www.instagram.com/jimbaslice/',
      ],
      affiliationUrls: [
        'https://www.instagram.com/loveliveserve/',
        'https://www.instagram.com/o3crew/',
      ],
      rounds: 1,
      images: ['/images/competitors/noah.jpg', '/images/competitors/jimmy.jpg'],
      detailedStats: [
        {
          quirk: 'Strategic',
          faveFood: 'Hot Wings',
          hometown: 'San Francisco',
          benchPR: '255 lbs',
          squatPR: '335 lbs',
          mileTime: '6:10',
          biography:
            'Creative filmmaker and internet personality who brings his analytical mindset and competitive spirit to physical challenges.',
          storyHighlights: {
            'Approach to Challenges':
              'Brings a thoughtful, methodical approach to competitions, preferring strategy over raw power when facing challenges.',
            'Online Community':
              'Has cultivated a dedicated following who appreciate his authentic approach to content and willingness to try new things.',
          },
          background: {
            'Creative Background':
              'Started his career making short films before transitioning to social media content that often showcases his wit and creativity.',
            'Athletic Development':
              'Incorporates fitness as a cornerstone of his lifestyle, focusing on functional strength and overall wellness.',
          },
        },
        {
          quirk: 'Solid Pull Out Game',
          faveFood: 'Pineapple Pizza',
          hometown: 'Los Angeles',
          benchPR: '215 lbs',
          squatPR: '275 lbs',
          deadlift: '315 lbs',
          biography:
            'Popular content creator and fitness enthusiast known for pushing boundaries in both creative and physical challenges.',
          storyHighlights: {
            'Training Philosophy':
              'Believes in making fitness fun and accessible while pushing personal limits through varied training methods.',
            'Public Presence':
              'Known for his outgoing personality and willingness to take on unconventional challenges that entertain while inspiring others.',
          },
          background: {
            'Content Creation':
              'Built a large following through his unique approach to fitness and lifestyle content, often incorporating challenges and social experiments.',
            'Fitness Journey':
              'Transformed his physique through consistent training and nutrition, documenting the process for his audience.',
          },
        },
      ],
    },
  };

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/polymarket?slug=${currentSlug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.status}`);
      }

      const { data, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      setMarketData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(`Error fetching Polymarket data for ${currentSlug}:`, err);
      setError(
        err instanceof Error ? err.message : 'Failed to fetch market data'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [currentSlug]);

  const handleSwitchEvent = (slug: string) => {
    setCurrentSlug(slug);
  };

  if (loading) {
    return (
      <div className="w-full mx-auto animate-pulse">
        {/* Placeholder for Event Switch Buttons */}
        <div className="mb-6 mt-2 flex justify-center gap-4">
          <div className="h-8 w-24 bg-gray-700 rounded"></div>
          <div className="h-8 w-24 bg-gray-700 rounded"></div>
        </div>

        {/* Placeholder for Fighter Cards Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Placeholder Fighter 1 */}
          <div className="flex-1 flex flex-col items-center text-center p-6 border-2 border-white/10 rounded-lg bg-black/60 w-full">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-700"></div>{' '}
            {/* Color Bar */}
            <div className="w-48 h-48 rounded-full bg-gray-700 mb-4 border-4 border-gray-700"></div>{' '}
            {/* Image */}
            <div className="h-6 w-3/4 bg-gray-700 rounded mb-1"></div>{' '}
            {/* Name */}
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-3"></div>{' '}
            {/* Affiliation */}
            {/* Stats */}
            <div className="flex justify-between w-full mb-4 mt-2 px-2">
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
            <div className="h-10 w-3/5 bg-gray-700 rounded-full mt-auto"></div>{' '}
            {/* Win % Button */}
          </div>

          {/* Placeholder VS */}
          <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-20 w-full md:w-auto">
            <div className="h-10 w-16 bg-gray-700 rounded mb-6"></div>{' '}
            {/* VS */}
            <div className="h-3 w-12 bg-gray-700 rounded mb-1"></div>{' '}
            {/* Rounds Label */}
            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>{' '}
            {/* Rounds Number */}
          </div>

          {/* Placeholder Fighter 2 */}
          <div className="flex-1 flex flex-col items-center text-center p-6 border-2 border-white/10 rounded-lg bg-black/60 w-full">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-700"></div>{' '}
            {/* Color Bar */}
            <div className="w-48 h-48 rounded-full bg-gray-700 mb-4 border-4 border-gray-700"></div>{' '}
            {/* Image */}
            <div className="h-6 w-3/4 bg-gray-700 rounded mb-1"></div>{' '}
            {/* Name */}
            <div className="h-4 w-1/2 bg-gray-700 rounded mb-3"></div>{' '}
            {/* Affiliation */}
            {/* Stats */}
            <div className="flex justify-between w-full mb-4 mt-2 px-2">
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="w-1/3">
                <div className="h-3 w-1/2 bg-gray-700 rounded mx-auto mb-1"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
            <div className="h-10 w-3/5 bg-gray-700 rounded-full mt-auto"></div>{' '}
            {/* Win % Button */}
          </div>
        </div>

        {/* Placeholder for Odds Bar */}
        <div className="mt-8 w-full mx-auto">
          <div className="h-12 w-full bg-gray-700 rounded my-2"></div>
          <div className="flex justify-between mt-1 px-1">
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Placeholder for Betting Section */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-3 w-20 bg-gray-700 rounded mb-1"></div>
          <div className="h-5 w-24 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 w-48 bg-gray-700 rounded"></div>
        </div>

        {/* Placeholder for Last Updated */}
        <div className="mt-4 h-4 w-32 bg-gray-700 rounded mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 rounded-lg border border-red-800 bg-red-900/30">
        <p className="text-red-400 font-mono text-center">
          Error loading Polymarket odds: {error}
        </p>
      </div>
    );
  }

  // Check if marketData and the nested markets array exist
  if (
    loading ||
    !marketData ||
    !marketData.markets ||
    marketData.markets.length === 0
  ) {
    // Show loading state or no data message even if loading finished but data is invalid
    const message = loading
      ? 'Loading market data...'
      : 'No market data available for this event.';

    return (
      <div className="w-full mx-auto p-4 rounded-lg border border-white/10 bg-black/40 min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="w-full max-w-md mx-auto p-4 rounded-lg border border-white/10 bg-black/40 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4 mx-auto"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="w-1/3">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-700 rounded w-1/4"></div>
              </div>
              <div className="w-1/3 text-center">
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-1 mx-auto"></div>
                <div className="h-5 bg-gray-700 rounded w-1/3 mx-auto"></div>
              </div>
              <div className="w-1/3 text-right">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-1 ml-auto"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2 ml-auto"></div>
                <div className="h-5 bg-gray-700 rounded w-1/4 ml-auto"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-700 rounded w-full my-2"></div>
            <div className="flex justify-between mt-2">
              <div className="w-1/2 pr-2">
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="w-1/2 pl-2 text-right">
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1 ml-auto"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1 ml-auto"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4 ml-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center font-mono text-gray-400">{message}</p>
        )}
      </div>
    );
  }

  // Extract data for the current slug
  const details = eventDetails[currentSlug];
  const market = marketData.markets[0];
  const marketUrl = `https://polymarket.com/market/${market.slug}`;
  const outcomes = JSON.parse(market.outcomes || '[]');
  const outcomePrices = JSON.parse(market.outcomePrices || '[]');

  // Find prices dynamically
  const fighter1Index = outcomes.findIndex((o: string) =>
    o.includes(details.outcomeKeywords[0])
  );
  const fighter2Index = outcomes.findIndex((o: string) =>
    o.includes(details.outcomeKeywords[1])
  );

  const fighter1Price =
    fighter1Index !== -1 ? parseFloat(outcomePrices[fighter1Index] || '0') : 0;
  const fighter2Price =
    fighter2Index !== -1 ? parseFloat(outcomePrices[fighter2Index] || '0') : 0;

  // Convert to percentages
  const fighter1Pct = Math.round(fighter1Price * 100);
  const fighter2Pct = Math.round(fighter2Price * 100);

  // Extract and format volume
  const volume = market.volumeNum ? parseFloat(market.volumeNum) : 0;
  const formattedVolume = Math.round(volume).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="w-full mx-auto">
      {/* Event Switch Buttons */}
      <div className="mb-6 mt-2 flex justify-center gap-4">
        <button
          onClick={() =>
            handleSwitchEvent('sperm-race-tristian-usc-vs-asher-ucla')
          }
          disabled={
            currentSlug === 'sperm-race-tristian-usc-vs-asher-ucla' || loading
          }
          className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
            currentSlug === 'sperm-race-tristian-usc-vs-asher-ucla'
              ? 'bg-gray-600 text-white cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          MAIN EVENT
        </button>
        <button
          onClick={() =>
            handleSwitchEvent('sperm-race-noah-boat-vs-jimmy-zhang')
          }
          disabled={
            currentSlug === 'sperm-race-noah-boat-vs-jimmy-zhang' || loading
          }
          className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
            currentSlug === 'sperm-race-noah-boat-vs-jimmy-zhang'
              ? 'bg-gray-600 text-white cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          UNDERCARD
        </button>
      </div>

      {/* Fighter Profile Cards Layout */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Fighter 1 Profile Card */}
        <div className="flex-1 flex flex-col items-center text-center p-6 border-2 border-white/20 rounded-lg bg-gradient-to-b from-black/80 to-black w-full relative overflow-hidden">
          {/* Color Bar - Using fighter's color */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: details.colors[0] }}
          ></div>

          <div
            className="relative w-48 h-48 rounded-full overflow-hidden border-4 mb-4"
            style={{ borderColor: details.colors[0] }}
          >
            <Image
              src={details.images[0]}
              alt={details.fighters[0]}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-2xl font-bold text-white mb-1 tracking-tight">
            <a
              href={details.instagramUrls[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {details.fighters[0].toUpperCase()}
            </a>
          </div>
          {details.affiliations[0] && (
            <div
              className="text-base mb-3 tracking-wide font-semibold"
              style={{ color: details.colors[0] }}
            >
              <a
                href={details.affiliationUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {details.affiliations[0]}
              </a>
            </div>
          )}

          {/* Basic Stats - UFC style with horizontal layout */}
          <div className="flex justify-between w-full mb-4 mt-2 px-2">
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Height</div>
              <div className="text-white font-bold">
                {details.stats[0].height}
              </div>
            </div>
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Weight</div>
              <div className="text-white font-bold">
                {details.stats[0].weight}
              </div>
            </div>
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Age</div>
              <div className="text-white font-bold">{details.stats[0].age}</div>
            </div>
          </div>

          {/* Win Probability  */}
          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto font-bold text-2xl py-2 px-4 rounded-full uppercase tracking-wider inline-block"
            style={{ backgroundColor: details.colors[0], color: 'black' }}
          >
            {fighter1Pct}% Win Chance
          </a>
        </div>

        {/* Center Details (VS, Rounds) */}
        <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-20 w-full md:w-auto">
          <div className="text-5xl font-black text-[#FF361D] mb-6 tracking-tighter">
            VS
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Rounds
          </div>
          <div className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-lg">
            {details.rounds}
          </div>
        </div>

        {/* Fighter 2 Profile Card */}
        <div className="flex-1 flex flex-col items-center text-center p-6 border-2 border-white/20 rounded-lg bg-gradient-to-b from-black/80 to-black w-full relative overflow-hidden">
          {/* Color Bar - Using fighter's color */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: details.colors[1] }}
          ></div>

          <div
            className="relative w-48 h-48 rounded-full overflow-hidden border-4 mb-4"
            style={{ borderColor: details.colors[1] }}
          >
            <Image
              src={details.images[1]}
              alt={details.fighters[1]}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-2xl font-bold text-white mb-1 tracking-tight">
            <a
              href={details.instagramUrls[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {details.fighters[1].toUpperCase()}
            </a>
          </div>
          {details.affiliations[1] && (
            <div
              className="text-base mb-3 tracking-wide font-semibold"
              style={{ color: details.colors[1] }}
            >
              <a
                href={details.affiliationUrls[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {details.affiliations[1]}
              </a>
            </div>
          )}

          {/* Basic Stats - UFC style with horizontal layout */}
          <div className="flex justify-between w-full mb-4 mt-2 px-2">
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Height</div>
              <div className="text-white font-bold">
                {details.stats[1].height}
              </div>
            </div>
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Weight</div>
              <div className="text-white font-bold">
                {details.stats[1].weight}
              </div>
            </div>
            <div className="w-1/3 text-center">
              <div className="text-xs text-gray-400 uppercase">Age</div>
              <div className="text-white font-bold">{details.stats[1].age}</div>
            </div>
          </div>

          {/* Win Probability */}
          <a
            href={marketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto font-bold text-2xl py-2 px-4 rounded-full uppercase tracking-wider inline-block"
            style={{ backgroundColor: details.colors[1], color: 'black' }}
          >
            {fighter2Pct}% Win Chance
          </a>
        </div>
      </div>

      {/* Odds Bar Graph - Remove width restrictions */}
      <div className="mt-8 w-full mx-auto">
        {/* Horizontal Bar Graph */}
        <div className="flex h-12 w-full bg-gray-800 rounded overflow-hidden border border-white/10 my-2">
          <div
            className="h-full"
            style={{
              width: `${fighter1Pct}%`,
              backgroundColor: details.colors[0],
            }}
            title={`${details.fighters[0]}${
              details.affiliations[0] ? ` (${details.affiliations[0]})` : ''
            }: ${fighter1Pct}%`}
          ></div>
          <div
            className="h-full"
            style={{
              width: `${fighter2Pct}%`,
              backgroundColor: details.colors[1],
            }}
            title={`${details.fighters[1]}${
              details.affiliations[1] ? ` (${details.affiliations[1]})` : ''
            }: ${fighter2Pct}%`}
          ></div>
        </div>
        {/* Keep labels from the previous version - Increase font size */}
        <div className="flex justify-between text-sm mt-1 px-1 text-gray-400">
          <span style={{ color: details.colors[0] }}>
            {details.fighters[0]} Win %
          </span>
          <span style={{ color: details.colors[1] }}>
            {details.fighters[1]} Win %
          </span>
        </div>
      </div>

      {/* Betting Section (Below profiles and bar graph) */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            Market Volume
          </div>
          <div className="font-bold text-white text-lg mt-1">
            {formattedVolume}
          </div>
        </div>

        <a
          href={marketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-[#FF361D] text-white rounded font-bold hover:bg-[#e62d17] transition-colors text-sm"
        >
          VIEW NOW ON POLYMARKET →
        </a>
      </div>

      {lastUpdated && (
        <div className="mt-4 text-sm text-center text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

// Event Schedule component with timezone conversion
function EventSchedule() {
  const [localTimes, setLocalTimes] = useState<{ [key: string]: string }>({});
  const [userTimezone, setUserTimezone] = useState<string>('');

  // Event times in PT (Los Angeles)
  const scheduleItems = [
    { time: '06:00 PM', description: 'Doors Open' },
    { time: '07:00 PM', description: 'Opening Announcements' },
    { time: '07:05 PM', description: 'Undercard Walk-Ins' },
    { time: '07:20 PM', description: 'Undercard Press Conference' },
    { time: '07:35 PM', description: 'Undercard Weigh-Ins' },
    { time: '07:40 PM', description: 'Main Event Walk-Ins' },
    { time: '07:50 PM', description: 'Main Event Press Conference' },
    { time: '08:10 PM', description: 'Main Event Weigh-Ins' },
    { time: '08:15 PM', description: 'Undercard Races' },
    { time: '08:30 PM', description: 'Halftime Show' },
    { time: '08:50 PM', description: 'Special Guest: Bryan Johnson' },
    { time: '09:05 PM', description: 'Main Event Race' },
  ];

  // Helper to parse PT time string and return Date object
  const parsePtTimeToDate = (ptTimeString: string): Date | null => {
    const eventDateStr = '2025-04-25'; // Use ISO format for date part
    const timeZone = 'America/Los_Angeles';

    // Extract hours, minutes, and AM/PM
    const match = ptTimeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0; // Midnight case
    }

    // Construct a date string that includes the timezone identifier
    // Format: YYYY-MM-DDTHH:mm:ss
    const dateString = `${eventDateStr}T${String(hours).padStart(
      2,
      '0'
    )}:${String(minutes).padStart(2, '0')}:00`;

    // Use Intl.DateTimeFormat to correctly interpret the date string in the source timezone
    try {
      // Create a formatter for the source timezone
      const formatter = new Intl.DateTimeFormat('en-CA', {
        // Use a locale like en-CA for YYYY-MM-DD format
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format internally
      });

      // Create a temporary date object (might be interpreted incorrectly by JS Date)
      const tempDate = new Date(dateString);

      // Format the date *as if* it's in the target timezone to get parts
      const parts = formatter.formatToParts(tempDate).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {} as { [key: string]: string });

      // Reconstruct the date string in a reliable UTC-like format or directly use parts
      // We need the correct instant in time. Let's create the date object from the source time parts.
      // This seems overly complex. Let's rethink. The core issue is Date constructor reliability.

      // A potentially more reliable way: Create the date in UTC based on offset.
      // April 25, 2025 in LA is PDT (UTC-7)
      let utcHour = hours + 7; // Add offset for PDT
      let utcDay = 25;
      let utcMonth = 3; // April (0-indexed)
      let utcYear = 2025;

      if (utcHour >= 24) {
        utcHour -= 24;
        utcDay += 1;
        // Handle month/year rollover if needed, though unlikely for this date/offset
        if (utcDay > 30) {
          // Days in April
          utcDay = 1;
          utcMonth += 1;
        }
      }

      const date = new Date(
        Date.UTC(utcYear, utcMonth, utcDay, utcHour, minutes, 0)
      );
      return date;
    } catch (e) {
      console.error(`Error parsing date for time ${ptTimeString}:`, e);
      return null;
    }
  };

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);

    const convertedTimes: { [key: string]: string } = {};

    scheduleItems.forEach((item) => {
      const dateObject = parsePtTimeToDate(item.time);

      if (dateObject) {
        const localTime = dateObject.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short', // Optionally show timezone like PST/PDT
        });
        convertedTimes[item.time] = localTime;
      } else {
        convertedTimes[item.time] = 'Invalid Time'; // Fallback
      }
    });

    setLocalTimes(convertedTimes);
  }, []);

  return (
    <div className="w-full">
      <h2
        className="text-3xl text-center mb-6 mt-8"
        style={{ fontFamily: sharpGroteskBold.style.fontFamily }}
      >
        EVENT SCHEDULE
      </h2>

      {/* Responsive Column Layout (Vertical Flow) */}
      <div className="max-w-4xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-x-8">
        {scheduleItems.map((item, index) => (
          <div key={index} className="flex gap-3 mb-3 break-inside-avoid">
            <span
              className="font-bold text-right tabular-nums whitespace-nowrap"
              style={{
                color: '#FF361D',
              }}
            >
              {localTimes[item.time] || item.time}
            </span>
            <span className="text-gray-300">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-center text-gray-400">
        All times shown in your local timezone. Event on Friday, April 25, 2025
        in Los Angeles (PT).
      </div>
    </div>
  );
}

export default function LivestreamPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [embedDomain, setEmbedDomain] = useState<string | null>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  // State to control showing livestream vs countdown
  const [showLivestream, setShowLivestream] = useState(
    () => new Date().getTime() >= eventTargetDate.getTime()
  );

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      setEmbedDomain(window.location.hostname);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Hide after scrolling down 50px
        setShowScrollArrow(false);
        window.removeEventListener('scroll', handleScroll); // Remove listener after hiding
      }
    };

    if (showScrollArrow) {
      window.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener if the component unmounts before scroll
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollArrow]); // Add showScrollArrow to dependencies to handle initial state

  // Callback for CountdownTimer
  const handleCountdownComplete = () => {
    setShowLivestream(true);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center py-6 lg:py-10 px-4 lg:px-6 bg-black text-white  ${sharpGrotesk.variable} ${sharpGroteskBold.variable}`}
    >
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900/40 z-0"></div>

      {/* Bouncing Arrow - Conditionally rendered */}
      {showScrollArrow && <BouncingArrow />}

      {/* SR Logo - Mobile Only - Use lg breakpoint */}

      {/* LIVESTREAM Banner */}
      <div className="z-10 w-full max-w-[800px] pt-8 text-center mt-14 lg:mt-2 mb-8">
        <h1
          className="text-[60px] md:text-[80px] leading-none tracking-tight"
          style={{ fontFamily: sharpGrotesk.style.fontFamily }}
        >
          <span className="text-[#FF361D]">LIVE</span>STREAM
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="w-full z-10 tracking-tight pt-0 flex flex-col items-center">
        {/* Video Player and Chat Grid */}
        <div className="w-full px-0 sm:px-4 md:px-8 lg:px-36">
          {/* Video Player */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
            {/* Conditionally render Countdown or Livestream based on state */}
            {!showLivestream ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{ fontFamily: sharpGroteskBold.style.fontFamily }}
                  >
                    LIVESTREAM STARTS IN
                  </h2>
                  {/* Pass the onComplete handler */}
                  <CountdownTimer
                    targetDate={eventTargetDate}
                    onComplete={handleCountdownComplete}
                  />
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/WenceN4bcFw?si=Nt9octJxrW8LlOTg"
                height="100%"
                width="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            )}
          </div>

          {/* View on buttons and Show Chat Button Container */}
          <div className="mt-4 pt-4 lg:mt-0 w-full flex flex-wrap justify-between items-center gap-3">
            {/* View on buttons (Left aligned group) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm text-gray-400 mr-1 sm:mr-2">
                View on:
              </span>
              <a
                href="https://www.youtube.com/watch?v=AzZdNcvKg6o"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded font-bold text-xs hover:bg-red-700 transition-colors"
              >
                YOUTUBE
              </a>
              <a
                href="https://kick.com/spermracing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 bg-[#53FC18] text-black rounded font-bold text-xs hover:bg-[#48d215] transition-colors"
              >
                KICK.COM
              </a>
              <a
                href="https://polymarket.com/event/sperm-race-tristian-usc-vs-asher-ucla?"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 bg-[#1550EB] text-white rounded font-bold text-xs hover:bg-[#1550EB]/70 transition-colors"
              >
                POLYMARKET
              </a>
            </div>

            {/* Show/Hide Chat Button (Mobile Only - lg:hidden, Right aligned) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsChatVisible(!isChatVisible)}
                className="px-3 py-1 bg-[#FF361D] text-white rounded font-bold text-xs hover:bg-[#e62d17] transition-colors"
              >
                {isChatVisible ? 'HIDE CHAT' : 'SHOW CHAT'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Chat (Conditionally Rendered) */}
        {isChatVisible && (
          <div className="mt-4 lg:hidden w-full px-0 sm:px-4 h-[400px] rounded-lg overflow-hidden border border-white/10 shadow-lg">
            {embedDomain && (
              <iframe
                src={`https://www.youtube.com/live_chat?v=AzZdNcvKg6o&embed_domain=${embedDomain}`}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="my-8 border-t border-white/10 w-full"></div>
      </div>
    </div>
  );
}

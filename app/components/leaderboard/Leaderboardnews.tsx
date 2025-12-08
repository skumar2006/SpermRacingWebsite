'use client';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PlayButton = ({ isPlaying = false, duration = '0:58' }) => (
  <div className="flex items-center bg-gray-200 w-max p-1 rounded-[0.35rem] gap-2">
    <Play className={`w-[15px] h-[15px] text-red-500 fill-red-500 ml-0.5`} />
    <div className="flex items-center gap-3">
      <span className="text-[0.7rem]">
        {isPlaying ? 'NOW PLAYING' : 'PLAY'}
      </span>
      <span className="text-[0.7rem] text-gray-500">{duration}</span>
    </div>
  </div>
);

const SeparatorNew = ({ className }: { className?: string }) => (
  <Separator className={`h-px bg-gray-200 ${className}`} />
);
const LeaderboardNews = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // Always start with the same default value for both server and client
  const [availableHeight, setAvailableHeight] = useState(600);
  const [isLoaded, setIsLoaded] = useState(false);
  const newsRef = useRef<HTMLDivElement>(null);

  // Monitor available height - only runs on client after mount
  useEffect(() => {
    const updateHeight = () => {
      if (newsRef.current) {
        const rect = newsRef.current.getBoundingClientRect();
        setAvailableHeight(window.innerHeight - rect.top - 20); // 20px margin
        setIsLoaded(true);
      }
    };

    // Update immediately on mount
    updateHeight();

    // Also update on resize
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const cardStyle = 'bg-white px-3 py-4 rounded-2xl border border-gray-200';
  const tinyText = 'text-[0.7rem] text-gray-600 tracking-tight';
  const headerStyle = 'text-sm font-medium tracking-tight';

  // Define content priority levels based on available height
  const showVideo = availableHeight > 575;
  const showSecondaryContent = availableHeight > 690;
  const showUpdatesCard = availableHeight > 470;
  const showScoreCard = availableHeight > 300;
  const showExpandedFertility = true;

  return (
    <div
      ref={newsRef}
      className="w-[33%] min-[1144px]:w-[30%] min-[1340px]:w-[25%] h-full hidden min-[1043px]:flex flex-col justify-between rounded-xl overflow-hidden"
    >
      {/* Priority Content */}
      <div className="space-y-4 flex-shrink-0">
        {/* Men's Fertility Card - Always visible */}
        <div className={`${cardStyle} overflow-hidden`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-[1px] border-gray-800 flex items-center justify-center">
                <span className="text-tiny font-bold">i</span>
              </div>
              <span className={headerStyle}>MENS FERTILITY</span>
            </div>

            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </button>

          {showExpandedFertility && (
            <div className="flex flex-col gap-2 mt-1">
              <SeparatorNew />
              <p className={`text-gray-500 ${tinyText}`}>
                No one talks about male fertility so we made it into a viral
                sport, improve your...
                <button className="text-gray-900 hover:text-gray-700">
                  read more
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Sperm Racing Updates Card - Progressive hiding */}
        {showUpdatesCard && (
          <div className={`${cardStyle} space-y-3`}>
            <div>
              <h2 className={headerStyle}>SPERM RACING UPDATES</h2>
              <SeparatorNew className="mt-1" />
            </div>

            {/* Video/Image - Hide on smaller heights */}
            {showVideo && (
              <div className="w-full h-28 bg-gray-300 rounded-xl"></div>
            )}

            <p className={` ${tinyText}`}>
              Sperm racing isn't just a joke, it's not just some viral idea for
              the internet to laugh at.
            </p>

            <PlayButton isPlaying={true} />

            {/* Secondary content */}
            {showSecondaryContent && (
              <>
                <SeparatorNew />
                <div className={` ${tinyText}`}>
                  Like, a lot, it's happening quietly, steadily, and nobody's
                  really talking about it.
                </div>
                <PlayButton />
                <SeparatorNew />
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-transparent flex justify-center">
        <div
          className="flex items-baseline"
          style={{
            paddingTop: availableHeight > 500 ? '1rem' : '0.5rem',
            paddingBottom: availableHeight > 500 ? '1rem' : '0.5rem',
          }}
        >
          <span
            className="text-gray-300 font-light tracking-tighter"
            style={{ fontSize: availableHeight > 500 ? '1.5rem' : '1.25rem' }}
          >
            <span className="font-bold">SPERM</span>RACING
          </span>
          <span
            className="text-gray-300 ml-0.5"
            style={{
              fontSize: availableHeight > 500 ? '0.875rem' : '0.75rem',
            }}
          >
            ®
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex-shrink-0 space-y-4">
        {/* Sperm Score Scale Card */}
        {showScoreCard && (
          <div className={cardStyle}>
            <h2 className={headerStyle}>SPERM SCORE SCALE</h2>
            <SeparatorNew className="mt-1" />

            <div className="space-y-1 mt-1">
              <div className="flex justify-end">
                <div className="flex items-baseline gap-2">
                  <span className={tinyText}>HIGH</span>
                  <span className={'text-gray-400 text-sm font-light'}>
                    625
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full relative"
                    style={{ width: '83.33%' }}
                  >
                    <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-gray-500 text-[0.7rem]">
                <span>0</span>
                <span>750</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardNews;

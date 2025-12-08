'use client';
import { ChevronDown, Slash } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactCountryFlag from 'react-country-flag';
import LeaderboardSkeleton from './LeaderboardSkeleton';

const SHARED_CLASSES = {
  row: 'grid grid-cols-12 gap-4 px-4 pt-6 pb-2 items-center',
  rank: 'col-span-2 text-gray-500 tracking-tighter text-xs',
  nameSection: 'col-span-6 flex items-center font-thin gap-3 -ml-5',
  playerName:
    'font-medium text-sm truncate min-w-0 w-[125px] min-[400px]:w-[150px]',
  countrySection: 'flex items-center gap-2 ',
  flag: 'text-sm min-[400px]:text-xl',
  countryName: 'text-[0.8rem] min-[400px]:text-sm text-gray-600',
  scoreSection: 'col-span-4 text-sm',
};

type Player = {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  score: number;
};

type CurrentUser = Player & {
  trials: string;
};

interface LeaderboardResponse {
  players: Player[];
  currentUser: CurrentUser | null;
  hasNextPage: boolean;
  nextCursor?: number;
  totalCount: number;
}

// Shared PlayerRow component
const PlayerRow = ({
  player,
  isCurrentUser = false,
  className = '',
  children,
}: {
  player: Player;
  isCurrentUser?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`${SHARED_CLASSES.row} ${className} ${
        isCurrentUser && '!py-3'
      }`}
    >
      {/* Rank */}
      <div className={SHARED_CLASSES.rank}>{player.rank}.</div>

      {/* Name and Country */}
      <div className={SHARED_CLASSES.nameSection}>
        <div className="flex items-center relative gap-2">
          <span className={SHARED_CLASSES.playerName} title={player.name}>
            {player.name}
          </span>
          {isCurrentUser && (
            <span className="text-red-500 absolute left-9 text-2xl">◄</span>
          )}
        </div>
        <div className={SHARED_CLASSES.countrySection}>
          <ReactCountryFlag
            countryCode={player.countryCode}
            svg
            className={SHARED_CLASSES.flag}
            title={player.country}
          />
          <span className={SHARED_CLASSES.countryName}>{player.country}</span>
        </div>
      </div>

      {/* Score Section - flexible for current user extras */}
      <div
        className={`${SHARED_CLASSES.scoreSection} ${
          isCurrentUser ? 'flex items-center justify-between' : 'text-right'
        }`}
      >
        {children ? children : <div>{player.score}</div>}
      </div>
    </div>
  );
};

// Top 25 Divider Component
const Top25Divider = () => {
  return (
    <div className="relative h-0 w-full">
      {/* Main line that extends beyond container */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center">
        <div className="flex-1 h-[2px] bg-red-500"></div>

        {/* TOP 25 Tag */}
        <div className="relative">
          {/* Triangle pointer */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-red-500 border-b-[12px] border-b-transparent"></div>
          </div>

          {/* Tag background */}
          <div className="bg-red-500 text-white px-4 py-1 rounded-r-md font-bold text-xs tracking-tight whitespace-nowrap">
            TOP 25
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfiniteLeaderboardStatsProps {
  initialData: LeaderboardResponse;
}

const InfiniteLeaderboardStats: React.FC<InfiniteLeaderboardStatsProps> = ({
  initialData,
}) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>(initialData.players);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(
    initialData.currentUser
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage);
  const [nextCursor, setNextCursor] = useState(initialData.nextCursor);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPlayerElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMorePlayers();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasNextPage]
  );

  const loadMorePlayers = async () => {
    if (loading || !hasNextPage || nextCursor === undefined) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/leaderboard?limit=10&cursor=${nextCursor}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch more players');
      }

      const data: LeaderboardResponse = await response.json();

      setPlayers((prev) => [...prev, ...data.players]);
      setHasNextPage(data.hasNextPage);
      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-[1043px]:w-[60%] min-[1144px]:w-[55%] min-[1340px]:w-[50%] md:border h-full md:rounded-xl shadow-sm border-gray-200 flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="bg-gray-50 flex relative">
        <div className="bg-black  z-[1] w-[40%] text-white px-6 py-1 flex items-center justify-between flex-shrink-0 relative">
          <h2 className="-ml-2 min-[500px]:ml-0 text-sm font-bold italic flex flex-nowrap tracking-tight">
            <div className="flex  items-center">
              <Slash className="w-[13px] h-[13px] -ml-2" />
              <Slash className="w-[13px] h-[13px] -ml-2" />
              <Slash className="w-[13px] h-[13px] -ml-2" />
            </div>
            <span className="min-[500px]:ml-1 text-nowrap">PLAYERS STATS</span>
          </h2>
          <div className="absolute -right-[12px] top-0 w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[12px] border-l-black" />
        </div>

        <div className="bg-gray-100  right-0 z-[1] absolute border-b border-gray-200 px-3 py-1  text-sm font-medium">
          <div className="w-0 h-0 border-l-[0px] rotate-180 border-l-transparent border-r-[25px] border-r-transparent border-b-[35px] border-b-gray-200 absolute bottom-[-1px] left-[-29%]" />
          <div className="w-0 h-0 border-l-[0px] rotate-180 border-l-transparent border-r-[25px] border-r-transparent border-b-[36px] border-b-gray-100 absolute bottom-[-1px] left-[-28%]" />
          <div className="-ml-2">
            <span className="text-tiny italic">SPERMRACERS</span>
            <div className="text-lg flex items-center font-bold">
              <span className="text-tiny font-normal tracking-tighter">
                TOTAL:
              </span>
              <span className="text-sm">{initialData.totalCount}</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 w-full  h-[49%] bg-gray-100 "></div>
        <div className="absolute top-[49%] right-0 w-full  h-[50%] bg-white border-t-[1px] border-gray-200"></div>
      </div>

      {/* Country Filter */}
      <div className="px-4 py-3 mt-4 border-b border-gray-200 flex-shrink-0">
        <button
          onClick={() => setIsCountryOpen(!isCountryOpen)}
          className="flex items-center justify-between w-full text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="text-gray-400">☰</span>
            <span className="text-sm font-medium">COUNTRY</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isCountryOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 pt-3 pb-2 text-xs font-medium text-gray-500 border-b border-gray-200 flex-shrink-0">
        <div className="col-span-2">RANK</div>
        <div className="col-span-6">NAME</div>
        <div className="col-span-4 text-right">SPERM SCORE</div>
      </div>

      {/* Players List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        {players.map((player, index) => (
          <React.Fragment key={`${player.rank}-${index}`}>
            <div
              ref={
                index === players.length - 1 ? lastPlayerElementRef : undefined
              }
            >
              <PlayerRow
                player={player}
                className="hover:bg-gray-50 border-b border-gray-100"
              />
            </div>
            {player.rank === 25 && <Top25Divider />}
          </React.Fragment>
        ))}

        {/* Loading skeleton */}
        {loading && <LeaderboardSkeleton count={5} />}

        {/* Error state */}
        {error && (
          <div className="p-4 text-center text-red-500">
            <p>Error: {error}</p>
            <button
              onClick={loadMorePlayers}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* End of list indicator */}
        {!loading && !hasNextPage && players.length > 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">
            You've reached the end of the leaderboard
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="border-t-[1px] border-gray-200 flex-shrink-0"></div>

      {/* Current User Row - Fixed at bottom */}
      {currentUser && (
        <PlayerRow
          player={currentUser}
          isCurrentUser={true}
          className="bg-gray-50 relative flex-shrink-0 "
        >
          {/* Custom content for current user's score section */}
          <div className="flex items-center gap-2 -ml-8">
            <span className="text-tiny hidden min-[500px]:block text-gray-500 border bg-white border-gray-200 p-1">
              {currentUser?.trials}
            </span>
            <button className="hidden min-[500px]:block bg-red-500 text-white px-3 py-[0.15rem] rounded text-xs font-medium hover:bg-red-600 transition-colors">
              RE-TEST
            </button>
          </div>
          <div className="text-sm">{currentUser?.score}</div>
        </PlayerRow>
      )}
    </div>
  );
};

export default InfiniteLeaderboardStats;

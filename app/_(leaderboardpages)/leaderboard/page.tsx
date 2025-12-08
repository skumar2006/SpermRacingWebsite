import React from 'react';
import InfiniteLeaderboardStats from '@/app/components/leaderboard/InfiniteLeaderboardStats';
import LeaderboardNews from '@/app/components/leaderboard/Leaderboardnews';

// Simulated leaderboard data (copied from API route)
const players = [
  {
    rank: 18,
    name: 'MAYA KIM',
    country: 'JAPAN',
    countryCode: 'JP',
    score: 175,
  },
  {
    rank: 19,
    name: 'LUCAS CHOI',
    country: 'CANADA',
    countryCode: 'CA',
    score: 170,
  },
  {
    rank: 20,
    name: 'EMMA PARK',
    country: 'AUSTRALIA',
    countryCode: 'AU',
    score: 162,
  },
  { rank: 21, name: 'JUN HO', country: 'USA', countryCode: 'US', score: 160 },
  {
    rank: 22,
    name: 'SOPHIA LEE',
    country: 'GERMANY',
    countryCode: 'DE',
    score: 157,
  },
  {
    rank: 23,
    name: 'RYAN KIM',
    country: 'FRANCE',
    countryCode: 'FR',
    score: 153,
  },
  {
    rank: 24,
    name: 'NINA JUNG',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 150,
  },
  {
    rank: 25,
    name: 'ALEX CHUNG',
    country: 'ITALY',
    countryCode: 'IT',
    score: 144,
  },
  {
    rank: 26,
    name: 'NINA JUNG',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 150,
  },
  {
    rank: 27,
    name: 'ALEX CHUNasdjssssssssssG',
    country: 'ITALY',
    countryCode: 'IT',
    score: 144,
  },
  {
    rank: 28,
    name: 'TARA KIM',
    country: 'BRAZIL',
    countryCode: 'BR',
    score: 142,
  },
  {
    rank: 29,
    name: 'DANIEL PARK',
    country: 'MEXICO',
    countryCode: 'MX',
    score: 134,
  },
  {
    rank: 30,
    name: 'SARAH JONES',
    country: 'UK',
    countryCode: 'GB',
    score: 132,
  },
  {
    rank: 31,
    name: 'MIKE WILSON',
    country: 'USA',
    countryCode: 'US',
    score: 130,
  },
  {
    rank: 32,
    name: 'ANNA BROWN',
    country: 'SWEDEN',
    countryCode: 'SE',
    score: 128,
  },
  {
    rank: 33,
    name: 'JAMES TAYLOR',
    country: 'AUSTRALIA',
    countryCode: 'AU',
    score: 126,
  },
  {
    rank: 34,
    name: 'LISA GARCIA',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 124,
  },
  {
    rank: 35,
    name: 'DAVID MARTINEZ',
    country: 'MEXICO',
    countryCode: 'MX',
    score: 122,
  },
  {
    rank: 36,
    name: 'EMMA DAVIS',
    country: 'CANADA',
    countryCode: 'CA',
    score: 120,
  },
  {
    rank: 37,
    name: 'ROBERT MILLER',
    country: 'USA',
    countryCode: 'US',
    score: 118,
  },
  {
    rank: 38,
    name: 'SOPHIE ANDERSON',
    country: 'NORWAY',
    countryCode: 'NO',
    score: 116,
  },
  {
    rank: 39,
    name: 'CARLOS RODRIGUEZ',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 114,
  },
  {
    rank: 40,
    name: 'MARIA GONZALEZ',
    country: 'MEXICO',
    countryCode: 'MX',
    score: 112,
  },
  {
    rank: 41,
    name: 'SARAH JONES',
    country: 'UK',
    countryCode: 'GB',
    score: 132,
  },
  {
    rank: 42,
    name: 'MIKE WILSON',
    country: 'USA',
    countryCode: 'US',
    score: 130,
  },
  {
    rank: 43,
    name: 'ANNA BROWN',
    country: 'SWEDEN',
    countryCode: 'SE',
    score: 128,
  },
  {
    rank: 44,
    name: 'JAMES TAYLOR',
    country: 'AUSTRALIA',
    countryCode: 'AU',
    score: 126,
  },
  {
    rank: 45,
    name: 'LISA GARCIA',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 124,
  },
  {
    rank: 46,
    name: 'DAVID MARTINEZ',
    country: 'MEXICO',
    countryCode: 'MX',
    score: 122,
  },
  {
    rank: 47,
    name: 'EMMA DAVIS',
    country: 'CANADA',
    countryCode: 'CA',
    score: 120,
  },
  {
    rank: 48,
    name: 'ROBERT MILLER',
    country: 'USA',
    countryCode: 'US',
    score: 118,
  },
  {
    rank: 49,
    name: 'SOPHIE ANDERSON',
    country: 'NORWAY',
    countryCode: 'NO',
    score: 116,
  },
  {
    rank: 50,
    name: 'CARLOS RODRIGUEZ',
    country: 'SPAIN',
    countryCode: 'ES',
    score: 114,
  },
  {
    rank: 51,
    name: 'MARIA GONZALEZ',
    country: 'MEXICO',
    countryCode: 'MX',
    score: 112,
  },
];

const currentUser = {
  rank: 250,
  name: 'YOU',
  country: 'USA',
  countryCode: 'US',
  score: 62,
  trials: '3/3 TRIALS',
};

async function getLeaderboardData() {
  // Simulate the same logic as the API route without HTTP request
  const limit = 10;
  const cursor = 0;

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Calculate pagination
  const startIndex = cursor;
  const endIndex = startIndex + limit;
  const paginatedPlayers = players.slice(startIndex, endIndex);
  const hasNextPage = endIndex < players.length;
  const nextCursor = hasNextPage ? endIndex : undefined;

  return {
    players: paginatedPlayers,
    currentUser: cursor === 0 ? currentUser : null,
    hasNextPage,
    nextCursor,
    totalCount: players.length,
  };
}

const LeaderboardPage = async (): Promise<React.JSX.Element> => {
  const initialData = await getLeaderboardData();

  return (
    <div className="flex-1 w-full flex  justify-center gap-4 overflow-hidden">
      <InfiniteLeaderboardStats initialData={initialData} />
      <LeaderboardNews />
    </div>
  );
};

export default LeaderboardPage;

import { NextResponse } from "next/server";

// Define cache structure and duration
interface CacheEntry {
  data: any;
  timestamp: number;
}
const marketCache: { [slug: string]: CacheEntry } = {};
const CACHE_DURATION_MS = 5000; // Cache data for 5 seconds

interface PolymarketResponse {
  data?: any;
  error?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Slug parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://strapi-matic.poly.market/markets?slug=${slug}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`Polymarket API returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching Polymarket data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Polymarket data" },
      { status: 500 }
    );
  }
}

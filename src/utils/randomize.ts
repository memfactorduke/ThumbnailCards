import type { EngagementStats } from "../types/generator";

export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000;
    return val % 1 === 0 ? `${val}M` : `${parseFloat(val.toFixed(1))}M`;
  }
  if (n >= 1_000) {
    const val = n / 1_000;
    return val % 1 === 0 ? `${val}K` : `${parseFloat(val.toFixed(1))}K`;
  }
  return String(n);
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizeEngagement(): EngagementStats {
  return {
    replies: formatCount(randBetween(100, 5000)),
    retweets: formatCount(randBetween(500, 20000)),
    likes: formatCount(randBetween(1000, 100000)),
    views: formatCount(randBetween(100000, 10000000)),
  };
}

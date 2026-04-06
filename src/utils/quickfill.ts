import type { GeneratorConfig } from "../types/generator";
import { randomizeEngagement } from "./randomize";

const DEMO_PROFILES = [
  { displayName: "Breaking News", handle: "@BreakingNews", badge: "blue" as const },
  { displayName: "Tech Insider", handle: "@TechInsider", badge: "gold" as const },
  { displayName: "Sports Center", handle: "@SportsCenter", badge: "blue" as const },
  { displayName: "NASA", handle: "@NASA", badge: "gov" as const },
  { displayName: "World News", handle: "@WorldNews", badge: "blue" as const },
];

const DEMO_TWEETS = [
  "BREAKING: Major announcement expected within the hour. Stay tuned for live coverage.",
  "This changes everything. Here's what you need to know \u{1F9F5}",
  "Just in: Markets react to the latest development. Full analysis coming soon.",
  "We can confirm reports are accurate. Official statement expected shortly.",
  "JUST IN: New record set today, surpassing all previous expectations.",
];

export function getQuickFillData(): Partial<GeneratorConfig> {
  const profile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
  const tweet = DEMO_TWEETS[Math.floor(Math.random() * DEMO_TWEETS.length)];
  const engagement = randomizeEngagement();

  return {
    displayName: profile.displayName,
    handle: profile.handle,
    badge: profile.badge,
    tweetText: tweet,
    engagement,
    showEngagement: true,
  };
}

import type { GeneratorConfig, Preset, EngagementField, BadgeOption, ThemeOption } from "../types/generator";
import { randomizeEngagement } from "../utils/randomize";

const BASE_CONFIG: GeneratorConfig = {
  displayName: "",
  handle: "",
  tweetText: "",
  avatarUrl: null,
  theme: "light",
  badge: "none",
  showEngagement: true,
  engagement: { replies: "", retweets: "", likes: "", views: "" },
  tweetFontSize: 15,
  tweetFontWeight: 400,
  tweetLineHeight: 1.4,
  tweetColor: "",
  nameFontSize: 15,
  nameFontWeight: 700,
  handleFontSize: 15,
  handleColor: "",
  engagementFontSize: 13,
  cardWidth: 500,
  cardPaddingX: 16,
  cardPaddingY: 12,
  avatarSize: 42,
  avatarGap: 10,
  cardBorderRadius: 0,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#e4e6e8",
  cardBorderWidth: 1,
};

export const BLUESKY_PRESETS: Preset[] = [
  {
    name: "Thumbnail",
    description: "Oversized text for YouTube thumbnails",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 24,
      tweetFontWeight: 700,
      tweetLineHeight: 1.3,
      nameFontSize: 20,
      nameFontWeight: 800,
      avatarSize: 56,
      cardWidth: 550,
      cardPaddingX: 20,
      cardPaddingY: 16,
      cardBorderRadius: 16,
    },
  },
  {
    name: "Standard",
    description: "Matches real Bluesky post styling",
    config: { ...BASE_CONFIG },
  },
  {
    name: "Minimal",
    description: "No engagement, clean look",
    config: {
      ...BASE_CONFIG,
      showEngagement: false,
      cardPaddingX: 12,
      cardPaddingY: 10,
    },
  },
];

export const BLUESKY_THEMES: ThemeOption[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-surface-300", ring: "ring-primary-500" },
  { value: "dark", label: "Dark", swatch: "bg-[#161920]", ring: "ring-primary-500" },
  { value: "dim", label: "Dim", swatch: "bg-[#1c2733]", ring: "ring-primary-500" },
];

export const BLUESKY_BADGES: BadgeOption[] = [
  {
    value: "none",
    label: "None",
    icon: (
      <svg className="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    value: "blue",
    label: "Blue",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0085ff">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5L6 12.2l1.4-1.4 2.9 2.9 6.3-6.3 1.4 1.4-7.7 7.7z" />
      </svg>
    ),
  },
];

export const BLUESKY_ENGAGEMENT_FIELDS: EngagementField[] = [
  { key: "replies", label: "Replies" },
  { key: "retweets", label: "Reposts" },
  { key: "likes", label: "Likes" },
];

const DEMO_PROFILES = [
  { displayName: "Bluesky", handle: "@bsky.app", badge: "blue" as const },
  { displayName: "Jay Graber", handle: "@jay.bsky.team", badge: "blue" as const },
  { displayName: "Tech News", handle: "@technews.bsky.social", badge: "none" as const },
  { displayName: "Open Source", handle: "@opensource.bsky.social", badge: "blue" as const },
  { displayName: "Science Daily", handle: "@sciencedaily.bsky.social", badge: "none" as const },
];

const DEMO_POSTS = [
  "The open social web is here. Come build with us.",
  "Just shipped a major update. Federation is getting better every day.",
  "Hot take: decentralized social media is the future. Here's why.",
  "This is what happens when you give users control of their own data.",
  "New milestone reached today. The community keeps growing!",
];

export function BLUESKY_QUICKFILL(): Partial<GeneratorConfig> {
  const profile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
  const post = DEMO_POSTS[Math.floor(Math.random() * DEMO_POSTS.length)];
  const engagement = randomizeEngagement();

  return {
    displayName: profile.displayName,
    handle: profile.handle,
    badge: profile.badge,
    tweetText: post,
    engagement,
    showEngagement: true,
  };
}

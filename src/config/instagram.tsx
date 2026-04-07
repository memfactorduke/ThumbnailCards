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
  tweetFontSize: 14,
  tweetFontWeight: 400,
  tweetLineHeight: 1.4,
  tweetColor: "",
  nameFontSize: 14,
  nameFontWeight: 600,
  handleFontSize: 14,
  handleColor: "",
  engagementFontSize: 14,
  cardWidth: 400,
  cardPaddingX: 16,
  cardPaddingY: 12,
  avatarSize: 32,
  avatarGap: 12,
  cardBorderRadius: 0,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#dbdbdb",
  cardBorderWidth: 1,
};

export const INSTAGRAM_PRESETS: Preset[] = [
  {
    name: "Thumbnail",
    description: "Oversized text for YouTube thumbnails",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 24,
      tweetFontWeight: 400,
      tweetLineHeight: 1.3,
      nameFontSize: 20,
      nameFontWeight: 700,
      avatarSize: 48,
      cardWidth: 400,
      cardPaddingX: 20,
      cardPaddingY: 16,
      cardBorderRadius: 0,
    },
  },
  {
    name: "Standard",
    description: "Matches real Instagram post styling",
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

export const INSTAGRAM_THEMES: ThemeOption[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-surface-300", ring: "ring-primary-500" },
  { value: "dark", label: "Dark", swatch: "bg-black", ring: "ring-primary-500" },
];

export const INSTAGRAM_BADGES: BadgeOption[] = [
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
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0095f6">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5L6 12.2l1.4-1.4 2.9 2.9 6.3-6.3 1.4 1.4-7.7 7.7z" />
      </svg>
    ),
  },
];

export const INSTAGRAM_ENGAGEMENT_FIELDS: EngagementField[] = [
  { key: "likes", label: "Likes" },
  { key: "retweets", label: "Comments" },
];

const DEMO_PROFILES = [
  { displayName: "Travel Daily", handle: "@traveldaily", badge: "blue" as const },
  { displayName: "Food Network", handle: "@foodnetwork", badge: "blue" as const },
  { displayName: "Fitness Pro", handle: "@fitnesspro", badge: "none" as const },
  { displayName: "National Geographic", handle: "@natgeo", badge: "blue" as const },
  { displayName: "Style Magazine", handle: "@stylemagazine", badge: "blue" as const },
];

const DEMO_CAPTIONS = [
  "Nothing beats this view. Tag someone who needs to see this.",
  "Recipe of the day! Save this for later. Link in bio for full recipe.",
  "Monday motivation. What are you working towards this week?",
  "Captured this incredible moment. Nature never disappoints.",
  "New drop just landed. Limited edition. Don't miss out.",
];

export function INSTAGRAM_QUICKFILL(): Partial<GeneratorConfig> {
  const profile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
  const caption = DEMO_CAPTIONS[Math.floor(Math.random() * DEMO_CAPTIONS.length)];
  const engagement = randomizeEngagement();

  return {
    displayName: profile.displayName,
    handle: profile.handle,
    badge: profile.badge,
    tweetText: caption,
    engagement,
    showEngagement: true,
  };
}

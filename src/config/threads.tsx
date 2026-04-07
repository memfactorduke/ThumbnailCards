import type {
  GeneratorConfig,
  Preset,
  BadgeOption,
  ThemeOption,
  EngagementField,
} from "../types/generator";
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
  avatarSize: 48,
  avatarGap: 12,
  cardBorderRadius: 16,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#e0e0e0",
  cardBorderWidth: 1,
};

export const THREADS_PRESETS: Preset[] = [
  {
    name: "Thumbnail",
    description: "Oversized text for YouTube thumbnails",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 24,
      tweetFontWeight: 700,
      tweetLineHeight: 1.3,
      nameFontSize: 18,
      nameFontWeight: 800,
      avatarSize: 56,
      cardWidth: 500,
      cardPaddingX: 20,
      cardPaddingY: 16,
      cardBorderRadius: 16,
    },
  },
  {
    name: "Standard",
    description: "Matches real Threads post styling",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 15,
      cardWidth: 500,
    },
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

export const THREADS_THEMES: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    swatch: "bg-white border border-surface-300",
    ring: "ring-primary-500",
  },
  {
    value: "dark",
    label: "Dark",
    swatch: "bg-[#101010]",
    ring: "ring-primary-500",
  },
];

function NoBadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block" }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function BlueBadgeIcon() {
  return (
    <svg
      viewBox="0 0 22 22"
      width="16"
      height="16"
      style={{ display: "inline-block" }}
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.733-1.057.87-1.682.138-.625.077-1.276-.165-1.876.584-.274 1.082-.703 1.437-1.24.355-.538.553-1.166.573-1.809zm-12.075 2.209L6.124 11l1.196-1.21 2.38 2.254L15.27 7.5l1.197 1.21-6.348 6.13-1.796-1.631z"
        fill="#0095f6"
      />
    </svg>
  );
}

export const THREADS_BADGES: BadgeOption[] = [
  { value: "none", label: "None", icon: <NoBadgeIcon /> },
  { value: "blue", label: "Verified", icon: <BlueBadgeIcon /> },
];

export const THREADS_ENGAGEMENT_FIELDS: EngagementField[] = [
  { key: "replies", label: "Replies" },
  { key: "retweets", label: "Reposts" },
  { key: "likes", label: "Likes" },
];

const DEMO_PROFILES = [
  { displayName: "Mark Zuckerberg", handle: "@zuck", badge: "blue" as const },
  { displayName: "Instagram", handle: "@instagram", badge: "blue" as const },
  { displayName: "Adam Mosseri", handle: "@mosseri", badge: "blue" as const },
  { displayName: "Tech Daily", handle: "@techdaily", badge: "none" as const },
  { displayName: "Creative Studio", handle: "@creativestudio", badge: "blue" as const },
];

const DEMO_THREADS = [
  "Just shipped something we've been working on for months. Can't wait for you all to try it.",
  "Hot take: the best feature is the one you actually use every day.",
  "Building in public is scary but the feedback loop is unmatched.",
  "Threads is where conversations happen. Excited about what's next.",
  "New update just dropped. Let me know what you think in the replies.",
];

export function THREADS_QUICKFILL(): Partial<GeneratorConfig> {
  const profile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
  const thread = DEMO_THREADS[Math.floor(Math.random() * DEMO_THREADS.length)];
  const engagement = randomizeEngagement();

  return {
    displayName: profile.displayName,
    handle: profile.handle,
    badge: profile.badge,
    tweetText: thread,
    engagement,
    showEngagement: true,
  };
}

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
  handleFontSize: 14,
  handleColor: "",
  engagementFontSize: 14,
  cardWidth: 500,
  cardPaddingX: 16,
  cardPaddingY: 12,
  avatarSize: 46,
  avatarGap: 12,
  cardBorderRadius: 0,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#e5e7eb",
  cardBorderWidth: 1,
};

export const TRUTHSOCIAL_PRESETS: Preset[] = [
  {
    name: "Thumbnail",
    description: "Oversized text for YouTube thumbnails",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 26,
      tweetFontWeight: 400,
      tweetLineHeight: 1.3,
      nameFontSize: 22,
      nameFontWeight: 700,
      avatarSize: 52,
      cardWidth: 550,
      cardPaddingX: 20,
      cardPaddingY: 16,
      cardBorderRadius: 16,
    },
  },
  {
    name: "Standard",
    description: "Matches real Truth Social post styling",
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

export const TRUTHSOCIAL_THEMES: ThemeOption[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-surface-300", ring: "ring-primary-500" },
  { value: "dark", label: "Dark", swatch: "bg-[#1a1a2e]", ring: "ring-primary-500" },
];

export const TRUTHSOCIAL_BADGES: BadgeOption[] = [
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
      <svg className="w-4 h-4" viewBox="0 0 22 22" fill="#4c6ef5">
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.636-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.899.13.635.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
      </svg>
    ),
  },
  {
    value: "gold",
    label: "Gold",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 22 22" fill="#f59e0b">
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.636-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.899.13.635.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
      </svg>
    ),
  },
];

export const TRUTHSOCIAL_ENGAGEMENT_FIELDS: EngagementField[] = [
  { key: "replies", label: "Replies" },
  { key: "retweets", label: "ReTruths" },
  { key: "likes", label: "Likes" },
];

const DEMO_PROFILES = [
  { displayName: "Donald J. Trump", handle: "@realDonaldTrump", badge: "blue" as const },
  { displayName: "Kash Patel", handle: "@KashPatel", badge: "blue" as const },
  { displayName: "Dan Scavino", handle: "@DanScavino", badge: "blue" as const },
  { displayName: "Devin Nunes", handle: "@DevinNunes", badge: "gold" as const },
  { displayName: "Jim Jordan", handle: "@Jim_Jordan", badge: "none" as const },
];

const DEMO_TRUTHS = [
  "This is a great day for America. We are winning like never before!",
  "The Fake News Media doesn't want you to know the TRUTH. Share this post!",
  "Thank you to all the incredible patriots out there. We will never stop fighting!",
  "Big announcement coming soon. Stay tuned!",
  "Our country is coming back stronger than ever. Nothing can stop us!",
];

export function TRUTHSOCIAL_QUICKFILL(): Partial<GeneratorConfig> {
  const profile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
  const truth = DEMO_TRUTHS[Math.floor(Math.random() * DEMO_TRUTHS.length)];
  const engagement = randomizeEngagement();

  return {
    displayName: profile.displayName,
    handle: profile.handle,
    badge: profile.badge,
    tweetText: truth,
    engagement,
    showEngagement: true,
  };
}

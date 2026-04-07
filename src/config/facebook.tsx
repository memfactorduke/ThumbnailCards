import React from "react";
import type { Preset, GeneratorConfig, EngagementField } from "../types/generator";

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
  handleFontSize: 13,
  handleColor: "",
  engagementFontSize: 13,
  cardWidth: 500,
  cardPaddingX: 16,
  cardPaddingY: 12,
  avatarSize: 40,
  avatarGap: 12,
  cardBorderRadius: 8,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#e4e6eb",
  cardBorderWidth: 1,
};

export const FACEBOOK_PRESETS: Preset[] = [
  {
    name: "Thumbnail",
    description: "Oversized text for YouTube thumbnails",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 26,
      tweetFontWeight: 700,
      tweetLineHeight: 1.3,
      nameFontSize: 20,
      nameFontWeight: 800,
      avatarSize: 56,
      cardWidth: 600,
      cardPaddingX: 20,
      cardPaddingY: 16,
      cardBorderRadius: 12,
    },
  },
  {
    name: "Standard",
    description: "Matches real Facebook post styling",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 15,
      cardWidth: 500,
      cardPaddingX: 16,
      cardPaddingY: 12,
    },
  },
  {
    name: "Minimal",
    description: "No engagement bar, clean look",
    config: {
      ...BASE_CONFIG,
      showEngagement: false,
      cardPaddingX: 12,
      cardPaddingY: 10,
    },
  },
];

export const FACEBOOK_THEMES = [
  { value: "light" as const, label: "Light", swatch: "bg-white border border-surface-300", ring: "ring-primary-500" },
  { value: "dark" as const, label: "Dark", swatch: "bg-[#242526]", ring: "ring-primary-500" },
];

export const FACEBOOK_BADGES = [
  {
    value: "none" as const,
    label: "None",
    icon: React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: 18,
      height: 18,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      style: { display: "inline-block" },
    },
      React.createElement("circle", { cx: 12, cy: 12, r: 10 }),
      React.createElement("line", { x1: 15, y1: 9, x2: 9, y2: 15 }),
      React.createElement("line", { x1: 9, y1: 9, x2: 15, y2: 15 }),
    ),
  },
  {
    value: "blue" as const,
    label: "Verified",
    icon: React.createElement("svg", {
      viewBox: "0 0 22 22",
      width: 18,
      height: 18,
      style: { display: "inline-block", flexShrink: 0, verticalAlign: "middle" },
    },
      React.createElement("path", {
        d: "M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.733-1.057.87-1.682.138-.625.077-1.276-.165-1.876.584-.274 1.082-.703 1.437-1.24.355-.538.553-1.166.573-1.809zm-12.075 2.209L6.124 11l1.196-1.21 2.38 2.254L15.27 7.5l1.197 1.21-6.348 6.13-1.796-1.631z",
        fill: "#1877f2",
      }),
    ),
  },
];

export const FACEBOOK_ENGAGEMENT_FIELDS: EngagementField[] = [
  { key: "likes", label: "Reactions" },
  { key: "retweets", label: "Comments" },
  { key: "views", label: "Shares" },
];

const DEMO_PAGES = [
  { displayName: "CNN", handle: "CNN", badge: "blue" as const },
  { displayName: "NASA", handle: "NASA", badge: "blue" as const },
  { displayName: "TechCrunch", handle: "TechCrunch", badge: "blue" as const },
  { displayName: "ESPN", handle: "ESPN", badge: "blue" as const },
  { displayName: "The New York Times", handle: "The New York Times", badge: "blue" as const },
];

const DEMO_POSTS = [
  "BREAKING: Major development just reported. We'll have full coverage shortly.",
  "This is incredible. Everyone needs to see this right now.",
  "We asked experts to weigh in on the latest news. Their responses were surprising.",
  "JUST IN: Historic announcement shakes up the industry. Details below.",
  "New study reveals shocking findings. Here's what it means for you.",
];

export function FACEBOOK_QUICKFILL(): Partial<GeneratorConfig> {
  const page = DEMO_PAGES[Math.floor(Math.random() * DEMO_PAGES.length)];
  const post = DEMO_POSTS[Math.floor(Math.random() * DEMO_POSTS.length)];

  const likes = `${Math.floor(Math.random() * 50 + 1)}.${Math.floor(Math.random() * 9)}K`;
  const comments = `${Math.floor(Math.random() * 999 + 100)}`;
  const shares = `${Math.floor(Math.random() * 500 + 50)}`;

  return {
    displayName: page.displayName,
    handle: page.handle,
    badge: page.badge,
    tweetText: post,
    engagement: {
      replies: "",
      retweets: comments,
      likes,
      views: shares,
    },
    showEngagement: true,
  };
}

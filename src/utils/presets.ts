import type { Preset, GeneratorConfig } from "../types/generator";

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
  cardBorderRadius: 0,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#cfd9de",
  cardBorderWidth: 1,
};

export const PRESETS: Preset[] = [
  {
    name: "Standard",
    description: "Matches real X post styling",
    config: { ...BASE_CONFIG },
  },
  {
    name: "Thumbnail Bold",
    description: "Oversized text, heavy weight, larger avatar",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 28,
      tweetFontWeight: 700,
      tweetLineHeight: 1.3,
      nameFontSize: 20,
      nameFontWeight: 800,
      avatarSize: 64,
      cardWidth: 550,
      cardPaddingX: 20,
      cardPaddingY: 16,
    },
  },
  {
    name: "Minimal",
    description: "No engagement bar, clean look, tighter padding",
    config: {
      ...BASE_CONFIG,
      showEngagement: false,
      cardPaddingX: 12,
      cardPaddingY: 10,
    },
  },
];

export function getPreset(name: string): Preset | undefined {
  return PRESETS.find((p) => p.name === name);
}

export { BASE_CONFIG };

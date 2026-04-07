export type ThemeType = "light" | "dark" | "dim";

export type BadgeType = "none" | "blue" | "gold" | "gov";

export interface EngagementStats {
  replies: string;
  retweets: string;
  likes: string;
  views: string;
}

export interface GeneratorConfig {
  // Content
  displayName: string;
  handle: string;
  tweetText: string;
  avatarUrl: string | null;

  // Theme & badge
  theme: ThemeType;
  badge: BadgeType;

  // Engagement
  showEngagement: boolean;
  engagement: EngagementStats;

  // Text controls (Manual mode)
  tweetFontSize: number;
  tweetFontWeight: number;
  tweetLineHeight: number;
  tweetColor: string;
  nameFontSize: number;
  nameFontWeight: number;
  handleFontSize: number;
  handleColor: string;
  engagementFontSize: number;

  // Layout controls (Manual mode)
  cardWidth: number;
  cardPaddingX: number;
  cardPaddingY: number;
  avatarSize: number;
  avatarGap: number;
  cardBorderRadius: number;

  // Style controls (Manual mode)
  cardBgColor: string;
  cardBorderEnabled: boolean;
  cardBorderColor: string;
  cardBorderWidth: number;
}

export interface Preset {
  name: string;
  description: string;
  config: GeneratorConfig;
}

export type GeneratorMode = "default" | "manual";

export interface EngagementField {
  key: keyof EngagementStats;
  label: string;
}

export interface BadgeOption {
  value: BadgeType;
  label: string;
  icon: React.ReactNode;
}

export interface ThemeOption {
  value: ThemeType;
  label: string;
  swatch: string;
  ring: string;
}

export interface PlatformConfig {
  postLabel: string;
  charLimit: number | null;
  handleLabel: string;
  handlePlaceholder: string;
  postPlaceholder: string;
  badges: BadgeOption[];
  themes: ThemeOption[];
  engagementFields: EngagementField[];
  presets: Preset[];
  CardComponent: React.ComponentType<{ config: GeneratorConfig }>;
  quickFillData?: () => Partial<GeneratorConfig>;
}

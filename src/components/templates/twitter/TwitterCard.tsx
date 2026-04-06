import type { GeneratorConfig } from "../../../types/generator";

interface TwitterCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#0f1419", secondary: "#536471", border: "#eff3f4" },
  dark: { bg: "#000000", text: "#e7e9ea", secondary: "#71767b", border: "#2f3336" },
  dim: { bg: "#15202b", text: "#f7f9f9", secondary: "#8b98a5", border: "#38444d" },
};

export function TwitterCard({ config }: TwitterCardProps) {
  const theme = THEME_COLORS[config.theme];
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const handleColor = config.handleColor || theme.secondary;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: `${config.cardWidth}px`,
        padding: `${config.cardPaddingY}px ${config.cardPaddingX}px`,
        borderRadius: `${config.cardBorderRadius}px`,
        border: config.cardBorderEnabled
          ? `${config.cardBorderWidth}px solid ${config.cardBorderColor}`
          : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        boxSizing: "border-box",
      }}
    >
      {/* Header: avatar + name/handle */}
      <div
        style={{
          display: "flex",
          gap: `${config.avatarGap}px`,
          marginBottom: "8px",
          alignItems: "flex-start",
        }}
      >
        {config.avatarUrl ? (
          <img
            src={config.avatarUrl}
            alt="Avatar"
            style={{
              width: `${config.avatarSize}px`,
              height: `${config.avatarSize}px`,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            data-testid="avatar-placeholder"
            style={{
              width: `${config.avatarSize}px`,
              height: `${config.avatarSize}px`,
              borderRadius: "50%",
              backgroundColor: theme.border,
              flexShrink: 0,
            }}
          />
        )}

        <div style={{ minWidth: 0 }}>
          <span
            style={{
              fontSize: `${config.nameFontSize}px`,
              fontWeight: config.nameFontWeight,
              color: textColor,
              marginRight: "4px",
            }}
          >
            {config.displayName || "Display Name"}
          </span>
          <span
            style={{
              fontSize: `${config.handleFontSize}px`,
              color: handleColor,
            }}
          >
            {config.handle || "@handle"}
          </span>
        </div>
      </div>

      {/* Tweet text */}
      <div
        style={{
          fontSize: `${config.tweetFontSize}px`,
          fontWeight: config.tweetFontWeight,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          marginBottom: config.showEngagement ? "12px" : "0",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {config.tweetText || "Your tweet text here..."}
      </div>

      {/* Engagement bar */}
      {config.showEngagement && (
        <div
          style={{
            display: "flex",
            gap: "24px",
            borderTop: `1px solid ${theme.border}`,
            paddingTop: "10px",
            fontSize: `${config.engagementFontSize}px`,
            color: theme.secondary,
          }}
        >
          <span>{config.engagement.replies || "0"}</span>
          <span>{config.engagement.retweets || "0"}</span>
          <span>{config.engagement.likes || "0"}</span>
          <span>{config.engagement.views || "0"}</span>
        </div>
      )}
    </div>
  );
}

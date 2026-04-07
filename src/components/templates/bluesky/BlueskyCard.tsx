import type { GeneratorConfig } from "../../../types/generator";

interface BlueskyCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#1b1b1b", secondary: "#687076", border: "#e4e6e8" },
  dark: { bg: "#161920", text: "#e8e8e8", secondary: "#828a93", border: "#2e3238" },
  dim: { bg: "#1c2733", text: "#e0e4ea", secondary: "#7f8a95", border: "#3a4450" },
};

function ReplyIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm4.5 11.5h-2V13H9v2.5L5.5 12 9 8.5V11h5.5V8.5l3.5 3.5-1.5 1.5z"
        fill={color}
      />
    </svg>
  );
}

function RepostIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
        fill={color}
      />
    </svg>
  );
}

function LikeIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
        fill={color}
      />
    </svg>
  );
}

function MoreIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
        fill={color}
      />
    </svg>
  );
}

function BlueBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5L6 12.2l1.4-1.4 2.9 2.9 6.3-6.3 1.4 1.4-7.7 7.7z"
        fill="#0085ff"
      />
    </svg>
  );
}

export function BlueskyCard({ config }: BlueskyCardProps) {
  const theme = THEME_COLORS[config.theme];
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const handleColor = config.handleColor || theme.secondary;
  const secondaryColor = theme.secondary;

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
        position: "relative",
      }}
    >
      {/* Header row: avatar + name/handle */}
      <div
        style={{
          display: "flex",
          gap: `${config.avatarGap}px`,
          alignItems: "center",
        }}
      >
        {/* Avatar */}
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

        {/* Name and handle on same line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: `${config.nameFontSize}px`,
              fontWeight: config.nameFontWeight,
              color: textColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
            }}
          >
            {config.displayName || "Display Name"}
          </span>
          {config.badge === "blue" && (
            <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
              <BlueBadge />
            </span>
          )}
          <span
            style={{
              fontSize: `${config.handleFontSize}px`,
              color: handleColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
            }}
          >
            {config.handle || "@handle"}
          </span>
        </div>
      </div>

      {/* Post text */}
      <div
        style={{
          fontSize: `${config.tweetFontSize}px`,
          fontWeight: config.tweetFontWeight,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          marginTop: "8px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {config.tweetText || "Your post text here..."}
      </div>

      {/* Action icons row */}
      {config.showEngagement && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
            fontSize: `${config.engagementFontSize}px`,
            color: secondaryColor,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ReplyIcon color={secondaryColor} />
            <span>{config.engagement.replies || "0"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <RepostIcon color={secondaryColor} />
            <span>{config.engagement.retweets || "0"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LikeIcon color={secondaryColor} />
            <span>{config.engagement.likes || "0"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MoreIcon color={secondaryColor} />
          </div>
        </div>
      )}
    </div>
  );
}

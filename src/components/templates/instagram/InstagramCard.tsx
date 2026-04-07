import type { GeneratorConfig } from "../../../types/generator";

interface InstagramCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#262626", secondary: "#8e8e8e", border: "#dbdbdb" },
  dark: { bg: "#000000", text: "#f5f5f5", secondary: "#a8a8a8", border: "#363636" },
  dim: { bg: "#000000", text: "#f5f5f5", secondary: "#a8a8a8", border: "#363636" },
};

function HeartIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.834-1.542-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <line
        x1="22"
        y1="3"
        x2="9.218"
        y2="10.083"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="22,3 15,22 11,13 2,9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function BookmarkIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M20 21l-8-5.71L4 21V3a2 2 0 012-2h12a2 2 0 012 2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThreeDotsIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill={color}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  );
}

function BlueBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="#0095f6"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5L6 12.2l1.4-1.4 2.9 2.9 6.3-6.3 1.4 1.4-7.7 7.7z" />
    </svg>
  );
}

function stripAt(handle: string): string {
  return handle.startsWith("@") ? handle.slice(1) : handle;
}

export function InstagramCard({ config }: InstagramCardProps) {
  const theme = THEME_COLORS[config.theme];
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const secondaryColor = theme.secondary;
  const username = stripAt(config.handle) || "username";

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: `${config.cardWidth}px`,
        paddingTop: `${config.cardPaddingY}px`,
        paddingBottom: `${config.cardPaddingY}px`,
        borderRadius: `${config.cardBorderRadius}px`,
        border: config.cardBorderEnabled
          ? `${config.cardBorderWidth}px solid ${config.cardBorderColor}`
          : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        boxSizing: "border-box",
      }}
    >
      {/* Header: avatar + username + badge + three dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: `0 ${config.cardPaddingX}px`,
          marginBottom: "12px",
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
        <span
          style={{
            fontSize: `${config.nameFontSize}px`,
            fontWeight: config.nameFontWeight,
            color: textColor,
            marginLeft: "10px",
            lineHeight: 1.2,
          }}
        >
          {username}
        </span>
        {config.badge === "blue" && (
          <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "4px", flexShrink: 0 }}>
            <BlueBadge />
          </span>
        )}
        <div style={{ flex: 1 }} />
        <ThreeDotsIcon color={textColor} />
      </div>

      {/* Image placeholder area — square aspect ratio */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: theme.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="1"
          opacity="0.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      </div>

      {/* Action icons row */}
      {config.showEngagement && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: `12px ${config.cardPaddingX}px 0`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <HeartIcon color={textColor} />
            <CommentIcon color={textColor} />
            <ShareIcon color={textColor} />
          </div>
          <div style={{ flex: 1 }} />
          <BookmarkIcon color={textColor} />
        </div>
      )}

      {/* Likes count */}
      {config.showEngagement && (config.engagement.likes || "0") !== "" && (
        <div
          style={{
            padding: `8px ${config.cardPaddingX}px 0`,
            fontSize: `${config.engagementFontSize}px`,
            fontWeight: 600,
            color: textColor,
          }}
        >
          {config.engagement.likes || "0"} likes
        </div>
      )}

      {/* Username + caption */}
      <div
        style={{
          padding: `4px ${config.cardPaddingX}px 0`,
          fontSize: `${config.tweetFontSize}px`,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          wordBreak: "break-word",
        }}
      >
        <span style={{ fontWeight: 600 }}>{username}</span>
        {" "}
        <span style={{ fontWeight: config.tweetFontWeight }}>
          {config.tweetText || "Write a caption..."}
        </span>
      </div>

      {/* Comments count */}
      {config.showEngagement && config.engagement.retweets && (
        <div
          style={{
            padding: `4px ${config.cardPaddingX}px 0`,
            fontSize: `${config.engagementFontSize}px`,
            color: secondaryColor,
          }}
        >
          View all {config.engagement.retweets} comments
        </div>
      )}

      {/* Timestamp */}
      <div
        style={{
          padding: `8px ${config.cardPaddingX}px 0`,
          fontSize: "10px",
          color: secondaryColor,
          textTransform: "uppercase",
          letterSpacing: "0.2px",
        }}
      >
        2 hours ago
      </div>
    </div>
  );
}

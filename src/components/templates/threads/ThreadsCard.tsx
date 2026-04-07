import type { GeneratorConfig } from "../../../types/generator";

interface ThreadsCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#000000", secondary: "#999999", border: "#e0e0e0" },
  dark: { bg: "#101010", text: "#f3f5f7", secondary: "#777777", border: "#333333" },
  dim: { bg: "#101010", text: "#f3f5f7", secondary: "#777777", border: "#333333" },
};

function HeartIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function RepostIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function ShareIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BlueBadge() {
  return (
    <svg
      viewBox="0 0 22 22"
      width="16"
      height="16"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.733-1.057.87-1.682.138-.625.077-1.276-.165-1.876.584-.274 1.082-.703 1.437-1.24.355-.538.553-1.166.573-1.809zm-12.075 2.209L6.124 11l1.196-1.21 2.38 2.254L15.27 7.5l1.197 1.21-6.348 6.13-1.796-1.631z"
        fill="#0095f6"
      />
    </svg>
  );
}

export function ThreadsCard({ config }: ThreadsCardProps) {
  const theme = THEME_COLORS[config.theme];
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const handleColor = config.handleColor || theme.secondary;
  const secondaryColor = theme.secondary;

  const username = (config.handle || "@username").replace(/^@/, "");

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
      {/* Main layout: avatar column + content column */}
      <div
        style={{
          display: "flex",
          gap: `${config.avatarGap}px`,
          alignItems: "stretch",
        }}
      >
        {/* Left column: avatar + thread line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
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

          {/* Thread line */}
          <div
            style={{
              width: "2px",
              flex: 1,
              backgroundColor: theme.border,
              marginTop: "8px",
              borderRadius: "1px",
              minHeight: "20px",
            }}
          />
        </div>

        {/* Right column: content */}
        <div style={{ minWidth: 0, flex: 1 }}>
          {/* Name row: username, badge, dot, timestamp */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexWrap: "nowrap",
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
              {username}
            </span>
            {config.badge === "blue" && (
              <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
                <BlueBadge />
              </span>
            )}
            <span
              style={{
                fontSize: `${config.handleFontSize}px`,
                color: secondaryColor,
                whiteSpace: "nowrap",
                lineHeight: 1.2,
                flexShrink: 0,
              }}
            >
              &middot;
            </span>
            <span
              style={{
                fontSize: `${config.handleFontSize}px`,
                color: handleColor,
                whiteSpace: "nowrap",
                lineHeight: 1.2,
                flexShrink: 0,
              }}
            >
              2h
            </span>
          </div>

          {/* Thread text */}
          <div
            style={{
              fontSize: `${config.tweetFontSize}px`,
              fontWeight: config.tweetFontWeight,
              lineHeight: config.tweetLineHeight,
              color: textColor,
              marginTop: "4px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {config.tweetText || "Start a thread..."}
          </div>

          {/* Action icons row */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "12px",
              alignItems: "center",
            }}
          >
            <HeartIcon color={secondaryColor} />
            <CommentIcon color={secondaryColor} />
            <RepostIcon color={secondaryColor} />
            <ShareIcon color={secondaryColor} />
          </div>

          {/* Engagement summary */}
          {config.showEngagement && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                fontSize: `${config.engagementFontSize}px`,
                color: secondaryColor,
              }}
            >
              {config.engagement.replies && (
                <span>{config.engagement.replies} replies</span>
              )}
              {config.engagement.replies && config.engagement.likes && (
                <span>&middot;</span>
              )}
              {config.engagement.likes && (
                <span>{config.engagement.likes} likes</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

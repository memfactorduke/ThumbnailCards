import type { GeneratorConfig } from "../../../types/generator";

interface FacebookCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#050505", secondary: "#65676b", border: "#e4e6eb" },
  dark: { bg: "#242526", text: "#e4e6eb", secondary: "#b0b3b8", border: "#3e4042" },
};

function getTheme(theme: string) {
  if (theme === "light") return THEME_COLORS.light;
  return THEME_COLORS.dark;
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill={color}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.07A6.97 6.97 0 0 0 1.05 7H4.1c.1-1.62.4-3.1.88-4.26.2-.48.43-.9.7-1.24A7.02 7.02 0 0 0 7.5 1.07zM8 1.5c-.2.17-.44.46-.67.93-.42.85-.72 2.12-.82 3.57h2.98c-.1-1.45-.4-2.72-.82-3.57C8.44 1.96 8.2 1.67 8 1.5zM8.5 1.07c.27.34.5.76.7 1.24.48 1.16.78 2.64.88 4.26h3.05A6.97 6.97 0 0 0 8.5 1.07zM1.05 8a6.97 6.97 0 0 0 6.45 5.93c-.27-.34-.5-.76-.7-1.24-.48-1.16-.78-2.64-.88-4.26H1.05zm4.44 0c.1 1.45.4 2.72.82 3.57.23.47.47.76.67.93.2-.17.44-.46.67-.93.42-.85.72-2.12.82-3.57H5.49zm4.59 0c-.1 1.62-.4 3.1-.88 4.26-.2.48-.43.9-.7 1.24A6.97 6.97 0 0 0 14.95 8h-3.05z" />
    </svg>
  );
}

function ThreeDotsIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill={color}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <circle cx="10" cy="4" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="10" cy="16" r="2" />
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
        fill="#1877f2"
      />
    </svg>
  );
}

function LikeActionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color} style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M15.653 4.106c-1.222-.06-2.679.51-3.89 2.16l-.763 1.04-.764-1.04C9.025 4.616 7.568 4.046 6.347 4.106c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
    </svg>
  );
}

function CommentActionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color} style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M12 2C6.477 2 2 5.805 2 10.5c0 2.68 1.41 5.07 3.6 6.63V22l4.05-2.22c.78.22 1.53.22 2.35.22 5.523 0 10-3.805 10-8.5S17.523 2 12 2z" />
    </svg>
  );
}

function ShareActionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={color} style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
    </svg>
  );
}

export function FacebookCard({ config }: FacebookCardProps) {
  const theme = getTheme(config.theme);
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const handleColor = config.handleColor || theme.secondary;
  const secondaryColor = theme.secondary;
  const borderColor = theme.border;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: `${config.cardWidth}px`,
        borderRadius: `${config.cardBorderRadius}px`,
        border: config.cardBorderEnabled
          ? `${config.cardBorderWidth}px solid ${config.cardBorderColor}`
          : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header: avatar + name/timestamp + three dots */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: `${config.cardPaddingY}px ${config.cardPaddingX}px`,
          paddingBottom: "0",
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
              backgroundColor: borderColor,
              flexShrink: 0,
            }}
          />
        )}

        {/* Name and timestamp */}
        <div style={{ flex: 1, minWidth: 0, marginLeft: `${config.avatarGap}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "2px",
            }}
          >
            <span
              style={{
                fontSize: `${config.handleFontSize}px`,
                color: handleColor,
                lineHeight: 1.2,
              }}
            >
              2h
            </span>
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <GlobeIcon color={secondaryColor} />
            </span>
          </div>
        </div>

        {/* Three dots menu */}
        <div style={{ flexShrink: 0, marginLeft: "8px" }}>
          <ThreeDotsIcon color={secondaryColor} />
        </div>
      </div>

      {/* Post text — full width */}
      <div
        style={{
          fontSize: `${config.tweetFontSize}px`,
          fontWeight: config.tweetFontWeight,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          padding: `12px ${config.cardPaddingX}px`,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {config.tweetText || "What's on your mind?"}
      </div>

      {/* Engagement section */}
      {config.showEngagement && (
        <>
          {/* Reactions summary row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: `0 ${config.cardPaddingX}px`,
              paddingBottom: "10px",
              fontSize: `${config.engagementFontSize}px`,
              color: secondaryColor,
            }}
          >
            {/* Left: emoji reactions + count */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#1877f2",
                    fontSize: "12px",
                    border: `2px solid ${bgColor}`,
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="#fff">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.457 4.02c-.178 0-.268.063-.325.142-.057.08-.114.209-.114.384V6H4.413c-.09 0-.233.02-.333.1a.47.47 0 0 0-.18.367c0 .17.058.284.113.362.056.079.147.14.326.14H6.02v1.47c0 .175.057.304.114.383.057.08.147.142.325.142s.268-.063.325-.142c.057-.08.114-.208.114-.383V6.97h1.604c.09 0 .233-.02.333-.1a.47.47 0 0 0 .18-.368.47.47 0 0 0-.113-.361c-.056-.079-.147-.14-.326-.14H6.9V4.546c0-.175-.057-.304-.114-.384-.057-.079-.147-.142-.325-.142z" />
                  </svg>
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#f33e58",
                    fontSize: "12px",
                    border: `2px solid ${bgColor}`,
                    marginLeft: "-4px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="#fff">
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H0c-.5-2.5.5-5.5 3.786-5.5C5.293 1.5 6.626 2.354 8 4c1.374-1.646 2.707-2.5 4.214-2.5C15.5 1.5 16.5 4.5 16 7h-1.508c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01L8 2.748zM2.212 8.5l3.769 4.11.018.019c.577.611.83.87 1.082 1.007.281.153.611.222.919.222s.638-.07.919-.222c.252-.137.505-.396 1.082-1.007l.018-.019 3.77-4.11H2.211z" />
                  </svg>
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#f7b928",
                    fontSize: "12px",
                    border: `2px solid ${bgColor}`,
                    marginLeft: "-4px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span style={{ fontSize: "11px", lineHeight: 1 }}>😂</span>
                </span>
              </div>
              <span>{config.engagement.likes || "0"}</span>
            </div>

            {/* Right: comments and shares */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {config.engagement.retweets && (
                <span>{config.engagement.retweets} comments</span>
              )}
              {config.engagement.views && (
                <span>{config.engagement.views} shares</span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: borderColor,
              margin: `0 ${config.cardPaddingX}px`,
            }}
          />

          {/* Action buttons row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: `8px ${config.cardPaddingX}px`,
              fontSize: `${config.engagementFontSize}px`,
              fontWeight: 600,
              color: secondaryColor,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <LikeActionIcon color={secondaryColor} />
              <span>Like</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <CommentActionIcon color={secondaryColor} />
              <span>Comment</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <ShareActionIcon color={secondaryColor} />
              <span>Share</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

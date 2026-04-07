import type { GeneratorConfig } from "../../../types/generator";

interface TruthSocialCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#1f2937", secondary: "#6b7280", border: "#e5e7eb" },
  dark: { bg: "#1a1a2e", text: "#e5e7eb", secondary: "#9ca3af", border: "#374151" },
  dim: { bg: "#1a1a2e", text: "#e5e7eb", secondary: "#9ca3af", border: "#374151" },
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
        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
        fill={color}
      />
    </svg>
  );
}

function ReTruthIcon({ color }: { color: string }) {
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

function ShareIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <path
        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
        fill={color}
      />
    </svg>
  );
}

function BlueBadge() {
  return (
    <svg
      viewBox="0 0 22 22"
      width="18"
      height="18"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.636-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.899.13.635.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="#4c6ef5"
      />
    </svg>
  );
}

function GoldBadge() {
  return (
    <svg
      viewBox="0 0 22 22"
      width="18"
      height="18"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    >
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.636-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.899.13.635.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="#f59e0b"
      />
    </svg>
  );
}

function VerifiedBadge({ badge }: { badge: GeneratorConfig["badge"] }) {
  if (badge === "blue") return <BlueBadge />;
  if (badge === "gold") return <GoldBadge />;
  return null;
}

export function TruthSocialCard({ config }: TruthSocialCardProps) {
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
      }}
    >
      {/* Header: Avatar + Name/Handle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: `${config.avatarGap}px`,
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

        {/* Name + Handle stacked */}
        <div style={{ minWidth: 0, flex: 1 }}>
          {/* Line 1: Display name + badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
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
            {config.badge !== "none" && (
              <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
                <VerifiedBadge badge={config.badge} />
              </span>
            )}
          </div>

          {/* Line 2: @handle */}
          <div
            style={{
              fontSize: `${config.handleFontSize}px`,
              color: handleColor,
              lineHeight: 1.2,
              marginTop: "2px",
            }}
          >
            {config.handle || "@username"}
          </div>
        </div>
      </div>

      {/* Truth text */}
      <div
        style={{
          fontSize: `${config.tweetFontSize}px`,
          fontWeight: config.tweetFontWeight,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          marginTop: "12px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {config.tweetText || "What's happening?"}
      </div>

      {/* Action icons row */}
      {config.showEngagement && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
            <ReTruthIcon color={secondaryColor} />
            <span>{config.engagement.retweets || "0"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LikeIcon color={secondaryColor} />
            <span>{config.engagement.likes || "0"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ShareIcon color={secondaryColor} />
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div
        style={{
          fontSize: "13px",
          color: secondaryColor,
          marginTop: "10px",
        }}
      >
        2:30 PM &middot; Apr 6, 2026
      </div>
    </div>
  );
}

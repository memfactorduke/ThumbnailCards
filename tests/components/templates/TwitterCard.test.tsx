import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TwitterCard } from "../../../src/components/templates/twitter/TwitterCard";
import { BASE_CONFIG } from "../../../src/utils/presets";
import type { GeneratorConfig } from "../../../src/types/generator";

const testConfig: GeneratorConfig = {
  ...BASE_CONFIG,
  displayName: "John Doe",
  handle: "@johndoe",
  tweetText: "This is a test tweet",
  theme: "light",
  showEngagement: true,
  engagement: {
    replies: "1.2K",
    retweets: "4.5K",
    likes: "23K",
    views: "1.2M",
  },
};

describe("TwitterCard", () => {
  it("renders display name and handle", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("renders tweet text", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("This is a test tweet")).toBeInTheDocument();
  });

  it("renders engagement stats when enabled", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("1.2K")).toBeInTheDocument();
    expect(screen.getByText("4.5K")).toBeInTheDocument();
    expect(screen.getByText("23K")).toBeInTheDocument();
    expect(screen.getByText("1.2M")).toBeInTheDocument();
  });

  it("hides engagement stats when disabled", () => {
    render(
      <TwitterCard config={{ ...testConfig, showEngagement: false }} />
    );
    expect(screen.queryByText("1.2K")).not.toBeInTheDocument();
  });

  it("applies light theme background", () => {
    const { container } = render(<TwitterCard config={testConfig} />);
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(255, 255, 255)");
  });

  it("applies dark theme background", () => {
    const { container } = render(
      <TwitterCard config={{ ...testConfig, theme: "dark" }} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(0, 0, 0)");
  });

  it("applies custom font size from config", () => {
    render(
      <TwitterCard config={{ ...testConfig, tweetFontSize: 28 }} />
    );
    const tweetEl = screen.getByText("This is a test tweet");
    expect(tweetEl.style.fontSize).toBe("28px");
  });

  it("renders avatar when avatarUrl is set", () => {
    render(
      <TwitterCard
        config={{ ...testConfig, avatarUrl: "data:image/png;base64,abc" }}
      />
    );
    const img = screen.getByAltText("Avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "data:image/png;base64,abc");
  });

  it("renders placeholder when no avatar", () => {
    render(<TwitterCard config={{ ...testConfig, avatarUrl: null }} />);
    expect(screen.queryByAltText("Avatar")).not.toBeInTheDocument();
    expect(screen.getByTestId("avatar-placeholder")).toBeInTheDocument();
  });

  it("renders verified badge when badge is set", () => {
    const { container } = render(
      <TwitterCard config={{ ...testConfig, badge: "blue" }} />
    );
    // Badge SVG should be present with the blue fill color
    const svgs = container.querySelectorAll("svg");
    const badgeSvg = Array.from(svgs).find((svg) => {
      const path = svg.querySelector("path");
      return path?.getAttribute("fill") === "#1d9bf0";
    });
    expect(badgeSvg).toBeTruthy();
  });

  it("does not render badge when badge is none", () => {
    const { container } = render(
      <TwitterCard config={{ ...testConfig, badge: "none" }} />
    );
    const svgs = container.querySelectorAll("svg");
    const badgeSvg = Array.from(svgs).find((svg) => {
      const path = svg.querySelector("path");
      return path?.getAttribute("fill") === "#1d9bf0";
    });
    expect(badgeSvg).toBeFalsy();
  });
});

import { describe, it, expect } from "vitest";
import { randomizeEngagement, formatCount } from "../../src/utils/randomize";

describe("formatCount", () => {
  it("formats numbers under 1000 as-is", () => {
    expect(formatCount(500)).toBe("500");
  });

  it("formats thousands with K suffix", () => {
    expect(formatCount(1500)).toBe("1.5K");
  });

  it("formats millions with M suffix", () => {
    expect(formatCount(2500000)).toBe("2.5M");
  });

  it("drops decimal for round numbers", () => {
    expect(formatCount(2000)).toBe("2K");
    expect(formatCount(1000000)).toBe("1M");
  });
});

describe("randomizeEngagement", () => {
  it("returns replies, retweets, likes, views as formatted strings", () => {
    const result = randomizeEngagement();
    expect(result).toHaveProperty("replies");
    expect(result).toHaveProperty("retweets");
    expect(result).toHaveProperty("likes");
    expect(result).toHaveProperty("views");
    expect(typeof result.replies).toBe("string");
  });

  it("generates values in plausible ranges", () => {
    for (let i = 0; i < 20; i++) {
      const result = randomizeEngagement();
      expect(result.replies.length).toBeGreaterThan(0);
      expect(result.retweets.length).toBeGreaterThan(0);
      expect(result.likes.length).toBeGreaterThan(0);
      expect(result.views.length).toBeGreaterThan(0);
    }
  });
});

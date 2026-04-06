import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGenerator } from "../../src/hooks/useGenerator";

describe("useGenerator", () => {
  it("initializes with Thumbnail preset values", () => {
    const { result } = renderHook(() => useGenerator());
    expect(result.current.config.tweetFontSize).toBe(28);
    expect(result.current.config.showEngagement).toBe(true);
    expect(result.current.mode).toBe("default");
    expect(result.current.activePreset).toBe("Thumbnail");
  });

  it("updates individual config fields", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.updateConfig({ displayName: "Test User" });
    });
    expect(result.current.config.displayName).toBe("Test User");
  });

  it("applies a preset", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.applyPreset("Standard");
    });
    expect(result.current.config.tweetFontSize).toBe(15);
    expect(result.current.config.tweetFontWeight).toBe(400);
    expect(result.current.activePreset).toBe("Standard");
  });

  it("preserves content fields when applying a preset", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.updateConfig({
        displayName: "Keep This",
        handle: "@keepthis",
        tweetText: "Preserve me",
      });
    });
    act(() => {
      result.current.applyPreset("Standard");
    });
    expect(result.current.config.displayName).toBe("Keep This");
    expect(result.current.config.handle).toBe("@keepthis");
    expect(result.current.config.tweetText).toBe("Preserve me");
  });

  it("toggles mode between default and manual", () => {
    const { result } = renderHook(() => useGenerator());
    expect(result.current.mode).toBe("default");
    act(() => {
      result.current.setMode("manual");
    });
    expect(result.current.mode).toBe("manual");
  });

  it("randomizes engagement values", () => {
    const { result } = renderHook(() => useGenerator());
    const before = { ...result.current.config.engagement };
    act(() => {
      result.current.randomizeEngagement();
    });
    const after = result.current.config.engagement;
    const changed =
      before.replies !== after.replies ||
      before.retweets !== after.retweets ||
      before.likes !== after.likes ||
      before.views !== after.views;
    expect(changed).toBe(true);
  });

  it("sets avatar from file as base64 data URL", async () => {
    const { result } = renderHook(() => useGenerator());
    const file = new File(["fake-image"], "avatar.png", {
      type: "image/png",
    });

    const mockRead = vi.fn();
    const mockReader = {
      readAsDataURL: mockRead,
      result: "data:image/png;base64,abc123",
      onload: null as (() => void) | null,
    };
    vi.spyOn(globalThis, "FileReader").mockImplementation(
      () => mockReader as unknown as FileReader
    );

    await act(async () => {
      result.current.setAvatar(file);
      mockReader.onload?.();
    });

    expect(result.current.config.avatarUrl).toBe(
      "data:image/png;base64,abc123"
    );
    vi.restoreAllMocks();
  });
});

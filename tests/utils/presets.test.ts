import { describe, it, expect } from "vitest";
import { PRESETS, getPreset } from "../../src/utils/presets";
import type { GeneratorConfig } from "../../src/types/generator";

describe("presets", () => {
  it("exports three built-in presets", () => {
    expect(PRESETS).toHaveLength(3);
    expect(PRESETS.map((p) => p.name)).toEqual([
      "Standard",
      "Thumbnail Bold",
      "Minimal",
    ]);
  });

  it("getPreset returns a preset by name", () => {
    const preset = getPreset("Standard");
    expect(preset).toBeDefined();
    expect(preset!.name).toBe("Standard");
  });

  it("getPreset returns undefined for unknown preset", () => {
    expect(getPreset("Nonexistent")).toBeUndefined();
  });

  it("Standard preset has default X post sizing", () => {
    const preset = getPreset("Standard")!;
    expect(preset.config.tweetFontSize).toBe(15);
    expect(preset.config.showEngagement).toBe(true);
  });

  it("Thumbnail Bold preset has oversized text", () => {
    const preset = getPreset("Thumbnail Bold")!;
    expect(preset.config.tweetFontSize).toBeGreaterThan(20);
    expect(preset.config.tweetFontWeight).toBeGreaterThanOrEqual(700);
  });

  it("Minimal preset hides engagement bar", () => {
    const preset = getPreset("Minimal")!;
    expect(preset.config.showEngagement).toBe(false);
  });
});

import { describe, it, expect, vi } from "vitest";
import { buildExportOptions, triggerDownload } from "../../src/utils/export";

describe("buildExportOptions", () => {
  it("returns options with white background by default", () => {
    const opts = buildExportOptions({ transparent: false });
    expect(opts.backgroundColor).toBe("#ffffff");
  });

  it("returns transparent background when requested", () => {
    const opts = buildExportOptions({ transparent: true });
    expect(opts.backgroundColor).toBeUndefined();
  });

  it("sets pixel ratio to 2 for sharpness", () => {
    const opts = buildExportOptions({ transparent: false });
    expect(opts.pixelRatio).toBe(2);
  });
});

describe("triggerDownload", () => {
  it("creates a link element and clicks it", () => {
    const createSpy = vi.spyOn(document, "createElement");
    const appendSpy = vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    const removeSpy = vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    triggerDownload("data:image/png;base64,abc", "test.png");

    expect(createSpy).toHaveBeenCalledWith("a");
    appendSpy.mockRestore();
    removeSpy.mockRestore();
    createSpy.mockRestore();
  });
});

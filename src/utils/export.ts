import { toPng } from "html-to-image";

interface ExportOptions {
  backgroundColor?: string;
  pixelRatio: number;
}

export function buildExportOptions(opts: {
  transparent: boolean;
}): ExportOptions {
  return {
    backgroundColor: opts.transparent ? undefined : "#ffffff",
    pixelRatio: 2,
  };
}

export function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCard(
  element: HTMLElement,
  opts: { transparent: boolean; filename?: string }
): Promise<void> {
  const exportOpts = buildExportOptions(opts);
  const dataUrl = await toPng(element, {
    backgroundColor: exportOpts.backgroundColor,
    pixelRatio: exportOpts.pixelRatio,
    cacheBust: true,
  });
  triggerDownload(dataUrl, opts.filename ?? "thumbnailcard.png");
}

export async function copyCardToClipboard(element: HTMLElement): Promise<void> {
  const dataUrl = await toPng(element, { pixelRatio: 2, cacheBust: true });
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": blob }),
  ]);
}

import { useState, useEffect, useCallback } from "react";
import { exportCard, copyCardToClipboard } from "../../utils/export";

interface ExportControlsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportControls({ cardRef }: ExportControlsProps) {
  const [transparent, setTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = useCallback(async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      await exportCard(cardRef.current, {
        transparent,
        filename: "thumbnailcard.png",
      });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [cardRef, exporting, transparent]);

  const handleCopy = useCallback(async () => {
    if (!cardRef.current || copying) return;
    setCopying(true);
    try {
      await copyCardToClipboard(cardRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
      setCopying(false);
    }
  }, [cardRef, copying]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        handleCopy();
      } else if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleExport();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleCopy, handleExport]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {exporting ? "Exporting..." : "Download PNG"}
        </button>

        <button
          onClick={handleCopy}
          disabled={copying}
          className="flex items-center justify-center gap-2 rounded-lg bg-surface-100 px-4 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-200 active:bg-surface-300 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copying ? "Copying..." : "Copy"}
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-surface-600">Transparent Background</label>
        <button
          onClick={() => setTransparent(!transparent)}
          className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
            transparent ? "bg-primary-500" : "bg-surface-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              transparent ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>

      <p className="text-xs text-surface-400 text-center">
        {"\u2318"}S to download {"\u00B7"} {"\u2318"}{"\u21E7"}C to copy
      </p>
    </div>
  );
}

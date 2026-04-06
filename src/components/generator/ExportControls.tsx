import { useState } from "react";
import { exportCard } from "../../utils/export";

interface ExportControlsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportControls({ cardRef }: ExportControlsProps) {
  const [transparent, setTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
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
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleExport}
        disabled={exporting}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {exporting ? "Exporting..." : "Download PNG"}
      </button>

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
    </div>
  );
}

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
        className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {exporting ? "Exporting..." : "Download PNG"}
      </button>

      <div className="flex items-center justify-between">
        <label className="text-sm">Transparent Background</label>
        <button
          onClick={() => setTransparent(!transparent)}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            transparent ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              transparent ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

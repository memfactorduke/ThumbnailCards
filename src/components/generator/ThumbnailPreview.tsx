import { useState } from "react";
import type { GeneratorConfig } from "../../types/generator";
import { TwitterCard } from "../templates/twitter/TwitterCard";

interface ThumbnailPreviewProps {
  config: GeneratorConfig;
}

const BACKGROUNDS = [
  { name: "Dark Gradient", bg: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)" },
  { name: "Red Alert", bg: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #7f1d1d 100%)" },
  { name: "Blue News", bg: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)" },
  { name: "Green Money", bg: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #064e3b 100%)" },
  { name: "Purple Drama", bg: "linear-gradient(135deg, #3b0764 0%, #7c3aed 50%, #3b0764 100%)" },
  { name: "Clean White", bg: "#f8fafc" },
];

export function ThumbnailPreview({ config }: ThumbnailPreviewProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-left text-xs font-semibold text-surface-400 uppercase tracking-wider hover:text-primary-500 transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Thumbnail Preview
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(false)}
        className="text-xs font-semibold text-primary-500 uppercase tracking-wider hover:text-primary-600 transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Thumbnail Preview ▾
      </button>

      {/* Miniature thumbnail at ~half scale */}
      <div
        className="rounded-lg overflow-hidden border border-surface-200 shadow-sm"
        style={{ aspectRatio: "16/9" }}
      >
        <div
          style={{
            background: BACKGROUNDS[bgIndex].bg,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8%",
          }}
        >
          <div style={{ transform: "scale(0.55)", transformOrigin: "center" }}>
            <TwitterCard config={config} />
          </div>
        </div>
      </div>

      {/* Background selector */}
      <div className="flex gap-1.5 flex-wrap" role="radiogroup" aria-label="Thumbnail background">
        {BACKGROUNDS.map((bg, i) => (
          <button
            key={bg.name}
            onClick={() => setBgIndex(i)}
            title={bg.name}
            role="radio"
            aria-checked={bgIndex === i}
            aria-label={`${bg.name} background`}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              bgIndex === i ? "border-primary-500 scale-110" : "border-surface-200 hover:border-surface-400"
            }`}
            style={{ background: bg.bg }}
          />
        ))}
      </div>
    </div>
  );
}

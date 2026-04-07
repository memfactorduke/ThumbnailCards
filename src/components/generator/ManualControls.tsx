import { useState } from "react";
import type { GeneratorConfig } from "../../types/generator";
import { SliderControl } from "./SliderControl";

interface ManualControlsProps {
  config: GeneratorConfig;
  onChange: (partial: Partial<GeneratorConfig>) => void;
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-surface-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-surface-700 bg-surface-50 hover:bg-surface-100 transition-colors"
      >
        {title}
        <svg
          className={`w-4 h-4 text-surface-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="p-3 space-y-3 border-t border-surface-100">{children}</div>}
    </div>
  );
}

export function ManualControls({ config, onChange }: ManualControlsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        <span className="text-xs font-semibold text-surface-600 uppercase tracking-wider">Fine-Tune</span>
        <span className="text-xs text-surface-400">Sizes, spacing, colors</span>
      </div>

      {/* Text Controls */}
      <CollapsibleSection title="Text" defaultOpen>
        <SliderControl label="Tweet Font Size" value={config.tweetFontSize} min={10} max={48} onChange={(v) => onChange({ tweetFontSize: v })} />
        <SliderControl label="Tweet Font Weight" value={config.tweetFontWeight} min={100} max={900} step={100} onChange={(v) => onChange({ tweetFontWeight: v })} />
        <SliderControl label="Tweet Line Height" value={config.tweetLineHeight} min={1} max={2.5} step={0.1} onChange={(v) => onChange({ tweetLineHeight: v })} />
        <SliderControl label="Name Font Size" value={config.nameFontSize} min={10} max={36} onChange={(v) => onChange({ nameFontSize: v })} />
        <SliderControl label="Name Font Weight" value={config.nameFontWeight} min={100} max={900} step={100} onChange={(v) => onChange({ nameFontWeight: v })} />
        <SliderControl label="Handle Font Size" value={config.handleFontSize} min={10} max={28} onChange={(v) => onChange({ handleFontSize: v })} />
        <SliderControl label="Engagement Font Size" value={config.engagementFontSize} min={8} max={24} onChange={(v) => onChange({ engagementFontSize: v })} />
      </CollapsibleSection>

      {/* Layout Controls */}
      <CollapsibleSection title="Layout">
        <SliderControl label="Card Width" value={config.cardWidth} min={300} max={800} onChange={(v) => onChange({ cardWidth: v })} />
        <SliderControl label="Padding X" value={config.cardPaddingX} min={0} max={48} onChange={(v) => onChange({ cardPaddingX: v })} />
        <SliderControl label="Padding Y" value={config.cardPaddingY} min={0} max={48} onChange={(v) => onChange({ cardPaddingY: v })} />
        <SliderControl label="Avatar Size" value={config.avatarSize} min={24} max={96} onChange={(v) => onChange({ avatarSize: v })} />
        <SliderControl label="Avatar Gap" value={config.avatarGap} min={4} max={24} onChange={(v) => onChange({ avatarGap: v })} />
        <SliderControl label="Border Radius" value={config.cardBorderRadius} min={0} max={32} onChange={(v) => onChange({ cardBorderRadius: v })} />
      </CollapsibleSection>

      {/* Style Controls */}
      <CollapsibleSection title="Style">
        <div>
          <label className="block text-sm text-surface-600 mb-1">Background Color</label>
          <input type="color" value={config.cardBgColor || "#ffffff"} onChange={(e) => onChange({ cardBgColor: e.target.value })} className="w-full h-8 rounded-lg border border-surface-200 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-surface-600">Border</label>
          <button
            onClick={() => onChange({ cardBorderEnabled: !config.cardBorderEnabled })}
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
              config.cardBorderEnabled ? "bg-primary-500" : "bg-surface-300"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                config.cardBorderEnabled ? "left-5" : "left-1"
              }`}
            />
          </button>
        </div>

        {config.cardBorderEnabled && (
          <>
            <div>
              <label className="block text-sm text-surface-600 mb-1">Border Color</label>
              <input type="color" value={config.cardBorderColor} onChange={(e) => onChange({ cardBorderColor: e.target.value })} className="w-full h-8 rounded-lg border border-surface-200 cursor-pointer" />
            </div>
            <SliderControl label="Border Width" value={config.cardBorderWidth} min={1} max={8} onChange={(v) => onChange({ cardBorderWidth: v })} />
          </>
        )}

        <div>
          <label className="block text-sm text-surface-600 mb-1">Tweet Text Color</label>
          <input type="color" value={config.tweetColor || "#000000"} onChange={(e) => onChange({ tweetColor: e.target.value })} className="w-full h-8 rounded-lg border border-surface-200 cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm text-surface-600 mb-1">Handle Color</label>
          <input type="color" value={config.handleColor || "#536471"} onChange={(e) => onChange({ handleColor: e.target.value })} className="w-full h-8 rounded-lg border border-surface-200 cursor-pointer" />
        </div>
      </CollapsibleSection>
    </div>
  );
}

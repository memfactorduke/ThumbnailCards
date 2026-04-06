import type { GeneratorConfig } from "../../types/generator";
import { SliderControl } from "./SliderControl";

interface ManualControlsProps {
  config: GeneratorConfig;
  onChange: (partial: Partial<GeneratorConfig>) => void;
}

export function ManualControls({ config, onChange }: ManualControlsProps) {
  return (
    <div className="space-y-6">
      {/* Text Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Text</h3>
        <div className="space-y-3">
          <SliderControl label="Tweet Font Size" value={config.tweetFontSize} min={10} max={48} onChange={(v) => onChange({ tweetFontSize: v })} />
          <SliderControl label="Tweet Font Weight" value={config.tweetFontWeight} min={100} max={900} step={100} onChange={(v) => onChange({ tweetFontWeight: v })} />
          <SliderControl label="Tweet Line Height" value={config.tweetLineHeight} min={1} max={2.5} step={0.1} onChange={(v) => onChange({ tweetLineHeight: v })} />
          <SliderControl label="Name Font Size" value={config.nameFontSize} min={10} max={36} onChange={(v) => onChange({ nameFontSize: v })} />
          <SliderControl label="Name Font Weight" value={config.nameFontWeight} min={100} max={900} step={100} onChange={(v) => onChange({ nameFontWeight: v })} />
          <SliderControl label="Handle Font Size" value={config.handleFontSize} min={10} max={28} onChange={(v) => onChange({ handleFontSize: v })} />
          <SliderControl label="Engagement Font Size" value={config.engagementFontSize} min={8} max={24} onChange={(v) => onChange({ engagementFontSize: v })} />
        </div>
      </div>

      {/* Layout Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Layout</h3>
        <div className="space-y-3">
          <SliderControl label="Card Width" value={config.cardWidth} min={300} max={800} onChange={(v) => onChange({ cardWidth: v })} />
          <SliderControl label="Padding X" value={config.cardPaddingX} min={0} max={48} onChange={(v) => onChange({ cardPaddingX: v })} />
          <SliderControl label="Padding Y" value={config.cardPaddingY} min={0} max={48} onChange={(v) => onChange({ cardPaddingY: v })} />
          <SliderControl label="Avatar Size" value={config.avatarSize} min={24} max={96} onChange={(v) => onChange({ avatarSize: v })} />
          <SliderControl label="Avatar Gap" value={config.avatarGap} min={4} max={24} onChange={(v) => onChange({ avatarGap: v })} />
          <SliderControl label="Border Radius" value={config.cardBorderRadius} min={0} max={32} onChange={(v) => onChange({ cardBorderRadius: v })} />
        </div>
      </div>

      {/* Style Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Style</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Background Color</label>
            <input type="color" value={config.cardBgColor || "#ffffff"} onChange={(e) => onChange({ cardBgColor: e.target.value })} className="w-full h-8 rounded border border-gray-300 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Border</label>
            <button onClick={() => onChange({ cardBorderEnabled: !config.cardBorderEnabled })} className={`relative w-10 h-6 rounded-full transition-colors ${config.cardBorderEnabled ? "bg-blue-500" : "bg-gray-300"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${config.cardBorderEnabled ? "left-5" : "left-1"}`} />
            </button>
          </div>

          {config.cardBorderEnabled && (
            <>
              <div>
                <label className="block text-sm mb-1">Border Color</label>
                <input type="color" value={config.cardBorderColor} onChange={(e) => onChange({ cardBorderColor: e.target.value })} className="w-full h-8 rounded border border-gray-300 cursor-pointer" />
              </div>
              <SliderControl label="Border Width" value={config.cardBorderWidth} min={1} max={8} onChange={(v) => onChange({ cardBorderWidth: v })} />
            </>
          )}

          <div>
            <label className="block text-sm mb-1">Tweet Text Color</label>
            <input type="color" value={config.tweetColor || "#000000"} onChange={(e) => onChange({ tweetColor: e.target.value })} className="w-full h-8 rounded border border-gray-300 cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm mb-1">Handle Color</label>
            <input type="color" value={config.handleColor || "#536471"} onChange={(e) => onChange({ handleColor: e.target.value })} className="w-full h-8 rounded border border-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

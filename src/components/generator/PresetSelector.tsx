import type { Preset } from "../../types/generator";
import { PRESETS as DEFAULT_PRESETS } from "../../utils/presets";

interface PresetSelectorProps {
  activePreset: string;
  onSelect: (name: string) => void;
  presets?: Preset[];
}

export function PresetSelector({ activePreset, onSelect, presets }: PresetSelectorProps) {
  const items = presets ?? DEFAULT_PRESETS;
  return (
    <div>
      <label className="block text-xs font-semibold text-surface-600 uppercase tracking-wider mb-2">
        Preset
      </label>
      <div className="flex gap-2">
        {items.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.name)}
            title={p.description}
            className={`rounded-lg px-3 py-2 text-sm font-medium border transition-all duration-200 ${
              activePreset === p.name
                ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                : "border-surface-200 text-surface-600 hover:border-surface-300 hover:bg-surface-50"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}

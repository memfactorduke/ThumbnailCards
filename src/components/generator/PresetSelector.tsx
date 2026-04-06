import { PRESETS } from "../../utils/presets";

interface PresetSelectorProps {
  activePreset: string;
  onSelect: (name: string) => void;
}

export function PresetSelector({ activePreset, onSelect }: PresetSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Preset</label>
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.name)}
            title={p.description}
            className={`rounded-lg px-3 py-2 text-sm border transition-colors ${
              activePreset === p.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}

import type { GeneratorMode } from "../../types/generator";

interface ModeToggleProps {
  mode: GeneratorMode;
  onChange: (mode: GeneratorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      <button
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "default"
            ? "bg-white shadow-sm text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onChange("default")}
      >
        Default
      </button>
      <button
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "manual"
            ? "bg-white shadow-sm text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onChange("manual")}
      >
        Manual
      </button>
    </div>
  );
}

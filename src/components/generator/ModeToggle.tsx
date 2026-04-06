import type { GeneratorMode } from "../../types/generator";

interface ModeToggleProps {
  mode: GeneratorMode;
  onChange: (mode: GeneratorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div role="tablist" aria-label="Generator mode" className="flex gap-1 rounded-lg bg-surface-100 p-1">
      <button
        role="tab"
        aria-selected={mode === "default"}
        className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
          mode === "default"
            ? "bg-white shadow-sm text-surface-900 ring-1 ring-surface-200/50"
            : "text-surface-500 hover:text-surface-700"
        }`}
        onClick={() => onChange("default")}
      >
        Default
      </button>
      <button
        role="tab"
        aria-selected={mode === "manual"}
        className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
          mode === "manual"
            ? "bg-white shadow-sm text-surface-900 ring-1 ring-surface-200/50"
            : "text-surface-500 hover:text-surface-700"
        }`}
        onClick={() => onChange("manual")}
      >
        Manual
      </button>
    </div>
  );
}

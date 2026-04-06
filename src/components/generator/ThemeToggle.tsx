import type { ThemeType } from "../../types/generator";

interface ThemeToggleProps {
  theme: ThemeType;
  onChange: (theme: ThemeType) => void;
}

const THEMES: { value: ThemeType; label: string; swatch: string; ring: string }[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-surface-300", ring: "ring-primary-500" },
  { value: "dim", label: "Dim", swatch: "bg-[#15202b]", ring: "ring-primary-500" },
  { value: "dark", label: "Dark", swatch: "bg-black", ring: "ring-primary-500" },
];

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">
        Theme
      </label>
      <div className="flex gap-2" role="radiogroup" aria-label="Theme">
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            role="radio"
            aria-checked={theme === t.value}
            aria-label={`${t.label} theme`}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border transition-all duration-200 ${
              theme === t.value
                ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                : "border-surface-200 text-surface-600 hover:border-surface-300 hover:bg-surface-50"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full ${t.swatch} ${
                theme === t.value ? `ring-2 ${t.ring} ring-offset-1` : ""
              }`}
            />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

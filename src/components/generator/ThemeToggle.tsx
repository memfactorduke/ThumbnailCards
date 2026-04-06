import type { ThemeType } from "../../types/generator";

interface ThemeToggleProps {
  theme: ThemeType;
  onChange: (theme: ThemeType) => void;
}

const THEMES: { value: ThemeType; label: string; swatch: string }[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-gray-300" },
  { value: "dim", label: "Dim", swatch: "bg-[#15202b]" },
  { value: "dark", label: "Dark", swatch: "bg-black" },
];

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Theme</label>
      <div className="flex gap-2">
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border transition-colors ${
              theme === t.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`w-5 h-5 rounded-full ${t.swatch}`} />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import type { BadgeType } from "../../types/generator";

interface BadgeSelectorProps {
  badge: BadgeType;
  onChange: (badge: BadgeType) => void;
}

const BADGES: { value: BadgeType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "blue", label: "Blue" },
  { value: "gold", label: "Gold" },
  { value: "gov", label: "Gov" },
];

export function BadgeSelector({ badge, onChange }: BadgeSelectorProps) {
  const isPro = false; // Will be wired to auth later

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Verified Badge {!isPro && <span className="text-gray-400 text-xs ml-1">Pro</span>}
      </label>
      <div className="flex gap-2">
        {BADGES.map((b) => (
          <button
            key={b.value}
            onClick={() => isPro || b.value === "none" ? onChange(b.value) : undefined}
            disabled={!isPro && b.value !== "none"}
            className={`rounded-lg px-3 py-2 text-sm border transition-colors ${
              badge === b.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            } ${!isPro && b.value !== "none" ? "opacity-50 cursor-not-allowed" : "hover:border-gray-300"}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

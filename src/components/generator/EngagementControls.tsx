import type { EngagementStats, EngagementField } from "../../types/generator";

const DEFAULT_FIELDS: EngagementField[] = [
  { key: "replies", label: "Replies" },
  { key: "retweets", label: "Retweets" },
  { key: "likes", label: "Likes" },
  { key: "views", label: "Views" },
];

interface EngagementControlsProps {
  show: boolean;
  engagement: EngagementStats;
  onToggle: (show: boolean) => void;
  onChange: (engagement: EngagementStats) => void;
  onRandomize: () => void;
  fields?: EngagementField[];
}

export function EngagementControls({
  show,
  engagement,
  onToggle,
  onChange,
  onRandomize,
  fields,
}: EngagementControlsProps) {
  const items = fields ?? DEFAULT_FIELDS;

  const updateField = (field: keyof EngagementStats, value: string) => {
    onChange({ ...engagement, [field]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-surface-600 uppercase tracking-wider">
          Engagement Bar
        </label>
        <button
          onClick={() => onToggle(!show)}
          aria-label="Show engagement stats"
          className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
            show ? "bg-primary-500" : "bg-surface-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              show ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>

      {show && (
        <div className="flex gap-2 items-end">
          {items.map((field) => (
            <div key={field.key} className="flex-1">
              <label className="block text-xs text-surface-400 mb-1">{field.label}</label>
              <input
                type="text"
                value={engagement[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder="0"
                aria-label={`${field.label} count`}
              />
            </div>
          ))}
          <button
            onClick={onRandomize}
            title="Randomize"
            aria-label="Randomize engagement"
            className="rounded-lg border border-surface-200 px-2.5 py-2 text-sm hover:bg-surface-50 hover:border-surface-300 transition-all duration-200 text-surface-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

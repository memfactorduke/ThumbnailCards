import type { EngagementStats } from "../../types/generator";

interface EngagementControlsProps {
  show: boolean;
  engagement: EngagementStats;
  onToggle: (show: boolean) => void;
  onChange: (engagement: EngagementStats) => void;
  onRandomize: () => void;
}

export function EngagementControls({
  show,
  engagement,
  onToggle,
  onChange,
  onRandomize,
}: EngagementControlsProps) {
  const updateField = (field: keyof EngagementStats, value: string) => {
    onChange({ ...engagement, [field]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
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
          <div className="flex-1">
            <label className="block text-xs text-surface-400 mb-1">Replies</label>
            <input
              type="text"
              value={engagement.replies}
              onChange={(e) => updateField("replies", e.target.value)}
              placeholder="0"
              aria-label="Replies count"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-surface-400 mb-1">Retweets</label>
            <input
              type="text"
              value={engagement.retweets}
              onChange={(e) => updateField("retweets", e.target.value)}
              placeholder="0"
              aria-label="Retweets count"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-surface-400 mb-1">Likes</label>
            <input
              type="text"
              value={engagement.likes}
              onChange={(e) => updateField("likes", e.target.value)}
              placeholder="0"
              aria-label="Likes count"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-surface-400 mb-1">Views</label>
            <input
              type="text"
              value={engagement.views}
              onChange={(e) => updateField("views", e.target.value)}
              placeholder="0"
              aria-label="Views count"
            />
          </div>
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

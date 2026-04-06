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
        <label className="text-sm font-medium">Engagement Bar</label>
        <button
          onClick={() => onToggle(!show)}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            show ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              show ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>

      {show && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Replies</label>
            <input
              type="text"
              value={engagement.replies}
              onChange={(e) => updateField("replies", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Retweets</label>
            <input
              type="text"
              value={engagement.retweets}
              onChange={(e) => updateField("retweets", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Likes</label>
            <input
              type="text"
              value={engagement.likes}
              onChange={(e) => updateField("likes", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Views</label>
            <input
              type="text"
              value={engagement.views}
              onChange={(e) => updateField("views", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            onClick={onRandomize}
            title="Randomize"
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-50"
          >
            🎲
          </button>
        </div>
      )}
    </div>
  );
}

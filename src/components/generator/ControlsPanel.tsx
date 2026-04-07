import type { GeneratorConfig, GeneratorMode, BadgeOption, ThemeOption, EngagementField, Preset } from "../../types/generator";
import { ThemeToggle } from "./ThemeToggle";
import { BadgeSelector } from "./BadgeSelector";
import { PresetSelector } from "./PresetSelector";
import { AvatarUpload } from "./AvatarUpload";
import { EngagementControls } from "./EngagementControls";
import { ManualControls } from "./ManualControls";

interface ControlsPanelProps {
  config: GeneratorConfig;
  mode: GeneratorMode;
  activePreset: string;
  isPro: boolean;
  onUpdateConfig: (partial: Partial<GeneratorConfig>) => void;
  onSetMode: (mode: GeneratorMode) => void;
  onApplyPreset: (name: string) => void;
  onRandomizeEngagement: () => void;
  onSetAvatar: (file: File) => void;
  onQuickFill: () => void;
  postLabel?: string;
  charLimit?: number | null;
  handleLabel?: string;
  handlePlaceholder?: string;
  postPlaceholder?: string;
  badges?: BadgeOption[];
  themes?: ThemeOption[];
  engagementFields?: EngagementField[];
  presets?: Preset[];
}

export function ControlsPanel({
  config,
  activePreset,
  isPro,
  onUpdateConfig,
  onApplyPreset,
  onRandomizeEngagement,
  onSetAvatar,
  onQuickFill,
  postLabel,
  charLimit,
  handleLabel,
  handlePlaceholder,
  postPlaceholder,
  badges,
  themes,
  engagementFields,
  presets,
}: ControlsPanelProps) {
  const effectiveCharLimit = charLimit === undefined ? 280 : charLimit;
  const charCount = config.tweetText.length;
  const charCountColor =
    effectiveCharLimit !== null && charCount > effectiveCharLimit
      ? "text-red-500"
      : effectiveCharLimit !== null && charCount >= effectiveCharLimit - 20
        ? "text-amber-500"
        : "text-surface-400";
  return (
    <div className="space-y-3">
      <PresetSelector activePreset={activePreset} onSelect={onApplyPreset} presets={presets} />

      <button
        onClick={onQuickFill}
        className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-surface-50 border border-surface-200 px-3 py-2 text-xs font-semibold text-surface-600 hover:bg-surface-100 active:bg-surface-200 transition-all duration-200"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
        Quick Fill
      </button>

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Content inputs */}
      <div className="space-y-3">
        <div>
          <label htmlFor="display-name" className="block text-xs font-semibold text-surface-600 uppercase tracking-wider mb-1.5">
            Display Name
          </label>
          <input id="display-name" type="text" value={config.displayName} onChange={(e) => onUpdateConfig({ displayName: e.target.value })} placeholder="Elon Musk" />
        </div>

        <div>
          <label htmlFor="handle" className="block text-xs font-semibold text-surface-600 uppercase tracking-wider mb-1.5">
            {handleLabel ?? "Handle"}
          </label>
          <input id="handle" type="text" value={config.handle} onChange={(e) => onUpdateConfig({ handle: e.target.value })} placeholder={handlePlaceholder ?? "@elonmusk"} />
        </div>

        <div>
          <label htmlFor="tweet-text" className="block text-xs font-semibold text-surface-600 uppercase tracking-wider mb-1.5">
            {postLabel ?? "Tweet Text"}
          </label>
          <textarea id="tweet-text" value={config.tweetText} onChange={(e) => onUpdateConfig({ tweetText: e.target.value })} placeholder={postPlaceholder ?? "Type your tweet here..."} rows={3} className="resize-y" />
          {effectiveCharLimit !== null && (
            <div className={`text-xs mt-1 text-right ${charCountColor}`}>
              {charCount}/{effectiveCharLimit}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Appearance */}
      <AvatarUpload avatarUrl={config.avatarUrl} onUpload={onSetAvatar} onClear={() => onUpdateConfig({ avatarUrl: null })} />
      <ThemeToggle theme={config.theme} onChange={(theme) => onUpdateConfig({ theme })} themes={themes} />
      <BadgeSelector badge={config.badge} onChange={(badge) => onUpdateConfig({ badge })} isPro={isPro} badges={badges} />

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Engagement */}
      <EngagementControls show={config.showEngagement} engagement={config.engagement} onToggle={(show) => onUpdateConfig({ showEngagement: show })} onChange={(engagement) => onUpdateConfig({ engagement })} onRandomize={onRandomizeEngagement} fields={engagementFields} />

      {/* Fine-tune sliders — always available */}
      <div className="border-t border-surface-100" />
      <ManualControls config={config} onChange={onUpdateConfig} />
    </div>
  );
}

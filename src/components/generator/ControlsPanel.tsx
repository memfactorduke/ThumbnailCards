import type { GeneratorConfig, GeneratorMode } from "../../types/generator";
import { ModeToggle } from "./ModeToggle";
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
}

export function ControlsPanel({
  config,
  mode,
  activePreset,
  isPro,
  onUpdateConfig,
  onSetMode,
  onApplyPreset,
  onRandomizeEngagement,
  onSetAvatar,
}: ControlsPanelProps) {
  return (
    <div className="space-y-3">
      <ModeToggle mode={mode} onChange={onSetMode} />
      <PresetSelector activePreset={activePreset} onSelect={onApplyPreset} />

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Content inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
            Display Name
          </label>
          <input type="text" value={config.displayName} onChange={(e) => onUpdateConfig({ displayName: e.target.value })} placeholder="Elon Musk" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
            Handle
          </label>
          <input type="text" value={config.handle} onChange={(e) => onUpdateConfig({ handle: e.target.value })} placeholder="@elonmusk" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
            Tweet Text
          </label>
          <textarea value={config.tweetText} onChange={(e) => onUpdateConfig({ tweetText: e.target.value })} placeholder="Type your tweet here..." rows={3} className="resize-y" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Appearance */}
      <AvatarUpload avatarUrl={config.avatarUrl} onUpload={onSetAvatar} onClear={() => onUpdateConfig({ avatarUrl: null })} />
      <ThemeToggle theme={config.theme} onChange={(theme) => onUpdateConfig({ theme })} />
      <BadgeSelector badge={config.badge} onChange={(badge) => onUpdateConfig({ badge })} isPro={isPro} />

      {/* Divider */}
      <div className="border-t border-surface-100" />

      {/* Engagement */}
      <EngagementControls show={config.showEngagement} engagement={config.engagement} onToggle={(show) => onUpdateConfig({ showEngagement: show })} onChange={(engagement) => onUpdateConfig({ engagement })} onRandomize={onRandomizeEngagement} />

      {mode === "manual" && (
        <>
          <div className="border-t border-surface-100" />
          <ManualControls config={config} onChange={onUpdateConfig} />
        </>
      )}
    </div>
  );
}

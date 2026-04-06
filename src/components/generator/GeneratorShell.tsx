import type { GeneratorConfig, GeneratorMode } from "../../types/generator";
import { ControlsPanel } from "./ControlsPanel";
import { PreviewPanel } from "./PreviewPanel";

interface GeneratorShellProps {
  config: GeneratorConfig;
  mode: GeneratorMode;
  activePreset: string;
  onUpdateConfig: (partial: Partial<GeneratorConfig>) => void;
  onSetMode: (mode: GeneratorMode) => void;
  onApplyPreset: (name: string) => void;
  onRandomizeEngagement: () => void;
  onSetAvatar: (file: File) => void;
}

export function GeneratorShell(props: GeneratorShellProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="lg:sticky lg:top-4 space-y-6 rounded-lg border border-gray-200 p-6">
          <ControlsPanel {...props} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="lg:sticky lg:top-4">
          <PreviewPanel config={props.config} />
        </div>
      </div>
    </div>
  );
}

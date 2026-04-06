import type { GeneratorConfig, GeneratorMode } from "../../types/generator";
import { ControlsPanel } from "./ControlsPanel";
import { PreviewPanel } from "./PreviewPanel";

interface GeneratorShellProps {
  config: GeneratorConfig;
  mode: GeneratorMode;
  activePreset: string;
  isPro: boolean;
  onUpdateConfig: (partial: Partial<GeneratorConfig>) => void;
  onSetMode: (mode: GeneratorMode) => void;
  onApplyPreset: (name: string) => void;
  onRandomizeEngagement: () => void;
  onSetAvatar: (file: File) => void;
  onSetIsPro: (value: boolean) => void;
}

export function GeneratorShell(props: GeneratorShellProps) {
  const { isPro, onSetIsPro, ...controlsProps } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="rounded-lg border border-gray-200 p-4">
          <ControlsPanel {...controlsProps} isPro={isPro} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="lg:sticky lg:top-4">
          <div className="flex justify-end mb-3">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
              <span>Pro Mode</span>
              <button
                role="switch"
                aria-checked={isPro}
                onClick={() => onSetIsPro(!isPro)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                  isPro ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    isPro ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </div>
          <PreviewPanel config={props.config} isPro={isPro} />
        </div>
      </div>
    </div>
  );
}

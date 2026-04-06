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
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
      {/* Controls column — scrollable */}
      <div className="w-full lg:w-[380px] shrink-0">
        <div
          className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-y-auto controls-scroll"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="p-4">
            <ControlsPanel {...controlsProps} isPro={isPro} />
          </div>
        </div>
      </div>

      {/* Preview column — sticky */}
      <div className="flex-1 min-w-0">
        <div className="lg:sticky lg:top-20">
          <div className="flex justify-end mb-3">
            <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer select-none group">
              <span className="text-surface-600 group-hover:text-surface-800 transition-colors">
                Pro Mode
              </span>
              <button
                role="switch"
                aria-checked={isPro}
                onClick={() => onSetIsPro(!isPro)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  isPro ? "bg-primary-500" : "bg-surface-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    isPro ? "translate-x-6" : "translate-x-1"
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

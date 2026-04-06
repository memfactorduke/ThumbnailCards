import { useRef } from "react";
import type { GeneratorConfig } from "../../types/generator";
import { TwitterCard } from "../templates/twitter/TwitterCard";
import { ExportControls } from "./ExportControls";

interface PreviewPanelProps {
  config: GeneratorConfig;
  isPro: boolean;
}

export function PreviewPanel({ config, isPro }: PreviewPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
        Live Preview
      </h3>

      <div className="flex justify-center">
        <div>
          <div className="bg-checkered rounded-lg p-4">
            <div ref={cardRef}>
              <TwitterCard config={config} />
            </div>
          </div>
          {!isPro && (
            <div className="bg-surface-100 text-surface-400 text-xs text-center py-1.5 px-3 rounded-b-lg">
              thumbnailcards.com — Upgrade to Pro to remove
            </div>
          )}
        </div>
      </div>

      <ExportControls cardRef={cardRef} />
    </div>
  );
}

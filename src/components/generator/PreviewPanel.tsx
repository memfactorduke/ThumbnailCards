import { useRef } from "react";
import type { GeneratorConfig } from "../../types/generator";
import { TwitterCard } from "../templates/twitter/TwitterCard";
import { ExportControls } from "./ExportControls";

interface PreviewPanelProps {
  config: GeneratorConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500">Live Preview</h3>

      <div className="flex justify-center">
        <div>
          <div ref={cardRef}>
            <TwitterCard config={config} />
          </div>
          <div className="bg-gray-100 text-gray-400 text-xs text-center py-1 px-3">
            thumbnailcards.com — Upgrade to Pro to remove
          </div>
        </div>
      </div>

      <ExportControls cardRef={cardRef} />
    </div>
  );
}

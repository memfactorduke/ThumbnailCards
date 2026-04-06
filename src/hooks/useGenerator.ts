import { useState, useCallback } from "react";
import type { GeneratorConfig, GeneratorMode } from "../types/generator";
import { BASE_CONFIG, getPreset } from "../utils/presets";
import { randomizeEngagement as randomize } from "../utils/randomize";

export function useGenerator() {
  const [config, setConfig] = useState<GeneratorConfig>({ ...BASE_CONFIG });
  const [mode, setMode] = useState<GeneratorMode>("default");
  const [activePreset, setActivePreset] = useState<string>("Standard");

  const updateConfig = useCallback(
    (partial: Partial<GeneratorConfig>) => {
      setConfig((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const applyPreset = useCallback((name: string) => {
    const preset = getPreset(name);
    if (!preset) return;
    setConfig((prev) => ({
      ...preset.config,
      displayName: prev.displayName,
      handle: prev.handle,
      tweetText: prev.tweetText,
      avatarUrl: prev.avatarUrl,
    }));
    setActivePreset(name);
  }, []);

  const randomizeEngagement = useCallback(() => {
    const stats = randomize();
    setConfig((prev) => ({
      ...prev,
      engagement: stats,
    }));
  }, []);

  const setAvatar = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setConfig((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  return {
    config,
    mode,
    activePreset,
    updateConfig,
    applyPreset,
    setMode,
    randomizeEngagement,
    setAvatar,
  };
}

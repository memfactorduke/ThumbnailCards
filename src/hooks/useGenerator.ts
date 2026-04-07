import { useState, useCallback, useEffect } from "react";
import type { GeneratorConfig, GeneratorMode, Preset } from "../types/generator";
import { getPreset, PRESETS } from "../utils/presets";
import { randomizeEngagement as randomize } from "../utils/randomize";
import { getQuickFillData } from "../utils/quickfill";

export interface UseGeneratorOptions {
  initialConfig?: GeneratorConfig;
  presets?: Preset[];
  quickFillFn?: () => Partial<GeneratorConfig>;
}

export function useGenerator(options?: UseGeneratorOptions) {
  const presets = options?.presets ?? PRESETS;
  const initialConfig = options?.initialConfig ?? getPreset("Thumbnail")!.config;
  const quickFillFn = options?.quickFillFn ?? getQuickFillData;

  const [config, setConfig] = useState<GeneratorConfig>({ ...initialConfig });
  const [mode, setMode] = useState<GeneratorMode>("default");
  const [activePreset, setActivePreset] = useState<string>(presets[0]?.name ?? "Thumbnail");
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("thumbnailcards-pro");
      return stored !== null ? stored === "true" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("thumbnailcards-pro", String(isPro));
    } catch {
      // localStorage may be unavailable
    }
  }, [isPro]);

  const updateConfig = useCallback(
    (partial: Partial<GeneratorConfig>) => {
      setConfig((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const applyPreset = useCallback((name: string) => {
    const preset = presets.find((p) => p.name === name);
    if (!preset) return;
    setConfig((prev) => ({
      ...preset.config,
      // Preserve content fields
      displayName: prev.displayName,
      handle: prev.handle,
      tweetText: prev.tweetText,
      avatarUrl: prev.avatarUrl,
      // Preserve engagement and badge (content, not styling)
      badge: prev.badge,
      engagement: prev.engagement,
      showEngagement: prev.showEngagement,
      theme: prev.theme,
    }));
    setActivePreset(name);
  }, [presets]);

  const randomizeEngagement = useCallback(() => {
    const stats = randomize();
    setConfig((prev) => ({
      ...prev,
      engagement: stats,
    }));
  }, []);

  const quickFill = useCallback(() => {
    const data = quickFillFn();
    setConfig((prev) => ({ ...prev, ...data }));
  }, [quickFillFn]);

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
    isPro,
    setIsPro,
    updateConfig,
    applyPreset,
    setMode,
    randomizeEngagement,
    quickFill,
    setAvatar,
  };
}

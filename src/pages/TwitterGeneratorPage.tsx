import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";

export default function TwitterGeneratorPage() {
  const generator = useGenerator();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SEOHead
        title="Fake Tweet Generator — Create Twitter/X Post Screenshots | ThumbnailCards"
        description="Generate realistic fake tweet screenshots for YouTube thumbnails. Custom text, profile pics, engagement stats, dark mode. Free PNG export, no signup."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ThumbnailCards Twitter Post Generator",
          "description":
            "Generate realistic fake tweet screenshots for YouTube thumbnails",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
          },
        }}
      />
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Twitter/X Post Generator</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create realistic tweet screenshots for YouTube thumbnails
        </p>
      </div>

      <GeneratorShell
        config={generator.config}
        mode={generator.mode}
        activePreset={generator.activePreset}
        isPro={generator.isPro}
        onUpdateConfig={generator.updateConfig}
        onSetMode={generator.setMode}
        onApplyPreset={generator.applyPreset}
        onRandomizeEngagement={generator.randomizeEngagement}
        onSetAvatar={generator.setAvatar}
        onSetIsPro={generator.setIsPro}
        onQuickFill={generator.quickFill}
      />
    </div>
  );
}

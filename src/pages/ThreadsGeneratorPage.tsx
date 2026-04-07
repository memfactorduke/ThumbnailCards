import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";
import { SITE_URL } from "../config/site";
import { ThreadsCard } from "../components/templates/threads/ThreadsCard";
import {
  THREADS_PRESETS,
  THREADS_THEMES,
  THREADS_BADGES,
  THREADS_ENGAGEMENT_FIELDS,
  THREADS_QUICKFILL,
} from "../config/threads";

export default function ThreadsGeneratorPage() {
  const generator = useGenerator({
    presets: THREADS_PRESETS,
    quickFillFn: THREADS_QUICKFILL,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="Fake Threads Post Generator — Create Threads Screenshots | ThumbnailCards"
        description="Generate realistic fake Threads post screenshots for YouTube thumbnails. Custom text, profile pics, engagement stats, dark mode. Free PNG export, no signup."
        canonicalUrl={`${SITE_URL}/threads`}
        ogUrl={`${SITE_URL}/threads`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "ThumbnailCards Threads Post Generator",
              "description":
                "Generate realistic fake Threads post screenshots for YouTube thumbnails",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Threads Generator", "item": `${SITE_URL}/threads` },
              ],
            },
          ],
        }}
      />
      <div className="mb-4">
        <h1 className="text-xl font-bold text-surface-900">Threads Post Generator</h1>
        <p className="text-surface-600 text-sm">
          Create realistic Threads post screenshots for YouTube thumbnails
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
        CardComponent={ThreadsCard}
        postLabel="Thread Text"
        charLimit={500}
        handleLabel="Username"
        handlePlaceholder="@username"
        postPlaceholder="Start a thread..."
        badges={THREADS_BADGES}
        themes={THREADS_THEMES}
        engagementFields={THREADS_ENGAGEMENT_FIELDS}
        presets={THREADS_PRESETS}
      />
    </div>
  );
}

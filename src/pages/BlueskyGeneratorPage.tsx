import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";
import { SITE_URL } from "../config/site";
import { BlueskyCard } from "../components/templates/bluesky/BlueskyCard";
import {
  BLUESKY_PRESETS,
  BLUESKY_THEMES,
  BLUESKY_BADGES,
  BLUESKY_ENGAGEMENT_FIELDS,
  BLUESKY_QUICKFILL,
} from "../config/bluesky";

export default function BlueskyGeneratorPage() {
  const generator = useGenerator({
    presets: BLUESKY_PRESETS,
    quickFillFn: BLUESKY_QUICKFILL,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="Fake Bluesky Post Generator — Create Bluesky Screenshots | ThumbnailCards"
        description="Generate realistic fake Bluesky post screenshots for YouTube thumbnails. Custom text, profile pics, engagement stats, dark mode. Free PNG export, no signup."
        canonicalUrl={`${SITE_URL}/bluesky`}
        ogUrl={`${SITE_URL}/bluesky`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "ThumbnailCards Bluesky Post Generator",
              "description":
                "Generate realistic fake Bluesky post screenshots for YouTube thumbnails",
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
                { "@type": "ListItem", "position": 2, "name": "Bluesky Generator", "item": `${SITE_URL}/bluesky` },
              ],
            },
          ],
        }}
      />
      <div className="mb-4">
        <h1 className="text-xl font-bold text-surface-900">Bluesky Post Generator</h1>
        <p className="text-surface-600 text-sm">
          Create realistic Bluesky post screenshots for YouTube thumbnails
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
        CardComponent={BlueskyCard}
        postLabel="Post Text"
        charLimit={300}
        handleLabel="Handle"
        handlePlaceholder="@user.bsky.social"
        postPlaceholder="What's up?"
        badges={BLUESKY_BADGES}
        themes={BLUESKY_THEMES}
        engagementFields={BLUESKY_ENGAGEMENT_FIELDS}
        presets={BLUESKY_PRESETS}
      />
    </div>
  );
}

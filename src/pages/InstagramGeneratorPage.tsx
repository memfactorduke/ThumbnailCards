import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";
import { SITE_URL } from "../config/site";
import { InstagramCard } from "../components/templates/instagram/InstagramCard";
import {
  INSTAGRAM_PRESETS,
  INSTAGRAM_THEMES,
  INSTAGRAM_BADGES,
  INSTAGRAM_ENGAGEMENT_FIELDS,
  INSTAGRAM_QUICKFILL,
} from "../config/instagram";

export default function InstagramGeneratorPage() {
  const generator = useGenerator({
    presets: INSTAGRAM_PRESETS,
    quickFillFn: INSTAGRAM_QUICKFILL,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="Fake Instagram Post Generator — Create Instagram Screenshots | ThumbnailCards"
        description="Generate realistic fake Instagram post screenshots for YouTube thumbnails. Custom captions, profile pics, engagement stats, dark mode. Free PNG export, no signup."
        canonicalUrl={`${SITE_URL}/instagram`}
        ogUrl={`${SITE_URL}/instagram`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "ThumbnailCards Instagram Post Generator",
              description:
                "Generate realistic fake Instagram post screenshots for YouTube thumbnails",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Instagram Generator", item: `${SITE_URL}/instagram` },
              ],
            },
          ],
        }}
      />
      <div className="mb-4">
        <h1 className="text-xl font-bold text-surface-900">Instagram Post Generator</h1>
        <p className="text-surface-600 text-sm">
          Create realistic Instagram post screenshots for YouTube thumbnails
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
        CardComponent={InstagramCard}
        postLabel="Caption"
        charLimit={2200}
        handleLabel="Username"
        handlePlaceholder="@username"
        postPlaceholder="Write a caption..."
        badges={INSTAGRAM_BADGES}
        themes={INSTAGRAM_THEMES}
        engagementFields={INSTAGRAM_ENGAGEMENT_FIELDS}
        presets={INSTAGRAM_PRESETS}
      />
    </div>
  );
}

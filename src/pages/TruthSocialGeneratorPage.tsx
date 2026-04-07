import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";
import { SITE_URL } from "../config/site";
import { TruthSocialCard } from "../components/templates/truthsocial/TruthSocialCard";
import {
  TRUTHSOCIAL_PRESETS,
  TRUTHSOCIAL_THEMES,
  TRUTHSOCIAL_BADGES,
  TRUTHSOCIAL_ENGAGEMENT_FIELDS,
  TRUTHSOCIAL_QUICKFILL,
} from "../config/truthsocial";

export default function TruthSocialGeneratorPage() {
  const generator = useGenerator({
    presets: TRUTHSOCIAL_PRESETS,
    quickFillFn: TRUTHSOCIAL_QUICKFILL,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="Fake Truth Social Post Generator — Create Truth Social Screenshots | ThumbnailCards"
        description="Generate realistic fake Truth Social post screenshots for YouTube thumbnails. Custom text, profile pics, engagement stats, dark mode. Free PNG export, no signup."
        canonicalUrl={`${SITE_URL}/truth-social`}
        ogUrl={`${SITE_URL}/truth-social`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "ThumbnailCards Truth Social Post Generator",
              "description":
                "Generate realistic fake Truth Social post screenshots for YouTube thumbnails",
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
                { "@type": "ListItem", "position": 2, "name": "Truth Social Generator", "item": `${SITE_URL}/truth-social` },
              ],
            },
          ],
        }}
      />
      <div className="mb-4">
        <h1 className="text-xl font-bold text-surface-900">Truth Social Post Generator</h1>
        <p className="text-surface-600 text-sm">
          Create realistic Truth Social post screenshots for YouTube thumbnails
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
        CardComponent={TruthSocialCard}
        postLabel="Truth"
        charLimit={500}
        handleLabel="Username"
        handlePlaceholder="@username"
        postPlaceholder="What's happening?"
        badges={TRUTHSOCIAL_BADGES}
        themes={TRUTHSOCIAL_THEMES}
        engagementFields={TRUTHSOCIAL_ENGAGEMENT_FIELDS}
        presets={TRUTHSOCIAL_PRESETS}
      />
    </div>
  );
}

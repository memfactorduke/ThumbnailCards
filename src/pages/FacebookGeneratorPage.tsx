import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";
import { SEOHead } from "../components/SEOHead";
import { SITE_URL } from "../config/site";
import { FacebookCard } from "../components/templates/facebook/FacebookCard";
import {
  FACEBOOK_PRESETS,
  FACEBOOK_THEMES,
  FACEBOOK_BADGES,
  FACEBOOK_ENGAGEMENT_FIELDS,
  FACEBOOK_QUICKFILL,
} from "../config/facebook";

export default function FacebookGeneratorPage() {
  const generator = useGenerator({
    initialConfig: FACEBOOK_PRESETS[0].config,
    presets: FACEBOOK_PRESETS,
    quickFillFn: FACEBOOK_QUICKFILL,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <SEOHead
        title="Fake Facebook Post Generator — Create Facebook Screenshots | ThumbnailCards"
        description="Generate realistic fake Facebook post screenshots for YouTube thumbnails. Custom text, profile pics, reactions, dark mode. Free PNG export, no signup."
        canonicalUrl={`${SITE_URL}/facebook`}
        ogUrl={`${SITE_URL}/facebook`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "ThumbnailCards Facebook Post Generator",
              "description":
                "Generate realistic fake Facebook post screenshots for YouTube thumbnails",
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
                { "@type": "ListItem", "position": 2, "name": "Facebook Generator", "item": `${SITE_URL}/facebook` },
              ],
            },
          ],
        }}
      />
      <div className="mb-4">
        <h1 className="text-xl font-bold text-surface-900">Facebook Post Generator</h1>
        <p className="text-surface-600 text-sm">
          Create realistic Facebook post screenshots for YouTube thumbnails
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
        CardComponent={FacebookCard}
        postLabel="Post Text"
        charLimit={null}
        handleLabel="Page Name"
        handlePlaceholder="Your Page Name"
        postPlaceholder="What's on your mind?"
        badges={FACEBOOK_BADGES}
        themes={FACEBOOK_THEMES}
        engagementFields={FACEBOOK_ENGAGEMENT_FIELDS}
        presets={FACEBOOK_PRESETS}
      />
    </div>
  );
}

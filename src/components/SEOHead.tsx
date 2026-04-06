import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({ title, description, jsonLd }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
  }, [title, description]);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-seo-jsonld="true"]',
    );
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector(
        'script[data-seo-jsonld="true"]',
      );
      if (script) script.remove();
    };
  }, [jsonLd]);

  return null;
}

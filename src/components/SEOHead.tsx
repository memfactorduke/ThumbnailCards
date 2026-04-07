import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({
  title,
  description,
  ogImage,
  ogUrl,
  canonicalUrl,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const setNameMeta = (name: string, content: string) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let tag = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.href = href;
    };

    setNameMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", ogImage ?? "https://thumbnailcards.com/og-image.png");
    if (ogUrl) {
      setMeta("og:url", ogUrl);
    }
    if (canonicalUrl) {
      setLink("canonical", canonicalUrl);
    }
  }, [title, description, ogImage, ogUrl, canonicalUrl]);

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

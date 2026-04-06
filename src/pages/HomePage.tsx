import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";

const FAQ_ITEMS = [
  {
    question: "Is ThumbnailCards free to use?",
    answer:
      "Yes! The core generator is completely free with no signup required. You can create unlimited tweet-style thumbnail cards, customize them, and export high-resolution PNGs at no cost.",
  },
  {
    question: "What is Pro mode?",
    answer:
      "Pro mode unlocks verified badges, removes watermarks, and gives you access to premium templates and additional social media platforms like Truth Social, Threads, and Instagram.",
  },
  {
    question: "What image format does it export?",
    answer:
      "PNG at 2x resolution for crystal-clear quality on any screen. You can also export with a transparent background for seamless compositing in your thumbnail editor.",
  },
  {
    question: "Can I use these for YouTube thumbnails?",
    answer:
      "Absolutely! That's exactly what ThumbnailCards is built for. The oversized text, bold fonts, and 1280\u00d7720 optimization ensure your tweet cards look perfect at thumbnail scale.",
  },
  {
    question: "Will you add other social media platforms?",
    answer:
      "Yes! Facebook, Instagram, Threads, and Bluesky generators are on our roadmap. Some will be free, and others will be available as Pro features.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. The generator works instantly in your browser. No signup, no email, no friction \u2014 just open the page and start creating.",
  },
];

const FEATURES = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "30-Second Exports",
    description: "Type, customize, download. No signup, no friction.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
    ),
    title: "Thumbnail-Optimized",
    description:
      "Oversized text, bold fonts, built for 1280\u00d7720 YouTube thumbnails.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    ),
    title: "Transparent PNG",
    description:
      "Export with transparent background for seamless compositing.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
    ),
    title: "Default & Manual Modes",
    description: "Quick presets or full manual control over every detail.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
    title: "Dark, Light & Dim Themes",
    description: "Match any thumbnail aesthetic with three theme options.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
        />
      </svg>
    ),
    title: "Pro Features",
    description:
      "Verified badges, no watermark, premium templates coming soon.",
  },
];

const PLATFORMS = [
  { name: "Twitter / X", status: "active" as const, link: "/twitter" },
  { name: "Facebook", status: "soon" as const },
  { name: "Truth Social", status: "pro" as const },
  { name: "Threads", status: "pro" as const },
  { name: "Instagram", status: "pro" as const },
  { name: "Bluesky", status: "soon" as const },
];

const STEPS = [
  {
    step: "1",
    title: "Enter your content",
    description: "Name, handle, tweet text \u2014 fill in the details.",
  },
  {
    step: "2",
    title: "Customize the look",
    description: "Theme, font sizes, engagement stats \u2014 make it yours.",
  },
  {
    step: "3",
    title: "Export and use",
    description: "Download PNG or copy to clipboard \u2014 done.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-surface-200 rounded-xl overflow-hidden transition-colors hover:border-surface-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
      >
        <span className="font-semibold text-surface-900 pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-surface-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="px-6 text-surface-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: "ThumbnailCards",
          url: "https://thumbnailcards.com",
          description:
            "Free fake social media post generator for YouTube thumbnails",
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    }),
    [],
  );

  return (
    <div className="scroll-smooth">
      <SEOHead
        title="ThumbnailCards — Fake Social Media Post Generator for YouTube Thumbnails"
        description="Generate realistic fake tweet screenshots, Facebook posts, and more for YouTube thumbnails. High-res PNG export in seconds. Free, no signup required."
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Free to use &mdash; no signup required
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight mb-6">
            Create Stunning Fake Social
            <br className="hidden sm:block" /> Media Posts for YouTube
            <br className="hidden sm:block" /> Thumbnails
          </h1>
          <p className="text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate realistic tweet screenshots in seconds. Oversized text,
            custom styling, transparent PNG export. Free to use, no signup
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/twitter"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200"
            >
              Start Creating &mdash; Free
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-surface-300 bg-white px-8 py-4 font-semibold text-surface-700 text-lg hover:border-surface-400 hover:bg-surface-50 transition-all duration-200"
            >
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Everything you need for perfect thumbnails
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            Purpose-built tools for YouTube thumbnail creators who want
            professional-quality social media cards.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-surface-200 bg-white p-7 transition-all duration-200 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-surface-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-50 border-y border-surface-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Three steps. That&apos;s it.
            </h2>
            <p className="text-lg text-surface-500">
              From idea to thumbnail-ready PNG in under a minute.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-surface-300" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white text-2xl font-bold mb-5 shadow-lg shadow-primary-500/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-surface-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Roadmap */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Platform Roadmap
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            We&apos;re building generators for every major social platform.
            Start with Twitter/X today.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PLATFORMS.map((platform) => {
            const isActive = platform.status === "active";
            const isPro = platform.status === "pro";
            const inner = (
              <div
                className={`rounded-2xl border p-6 text-center transition-all duration-200 ${
                  isActive
                    ? "border-primary-200 bg-primary-50 hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer"
                    : "border-surface-200 bg-white opacity-75"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-1 ${isActive ? "text-primary-700" : "text-surface-600"}`}
                >
                  {platform.name}
                </h3>
                {isActive && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Available Now
                  </span>
                )}
                {isPro && (
                  <span className="inline-block text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    Pro
                  </span>
                )}
                {platform.status === "soon" && (
                  <span className="text-sm text-surface-400">Coming Soon</span>
                )}
              </div>
            );
            return isActive ? (
              <Link key={platform.name} to={platform.link!}>
                {inner}
              </Link>
            ) : (
              <div key={platform.name}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-50 border-y border-surface-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-surface-500">
              Everything you need to know about ThumbnailCards.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
          Ready to create your first thumbnail card?
        </h2>
        <p className="text-lg text-surface-500 mb-10 max-w-xl mx-auto">
          Join thousands of YouTube creators using ThumbnailCards to make
          scroll-stopping thumbnails.
        </p>
        <Link
          to="/twitter"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-10 py-4 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200"
        >
          Get Started &mdash; It&apos;s Free
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </section>
    </div>
  );
}

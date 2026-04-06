import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Create Fake Social Media Posts for YouTube Thumbnails
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate realistic tweet screenshots, Facebook posts, and more.
          High-res PNG export in seconds. No signup required.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/twitter"
            className="rounded-lg bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Twitter/X Generator
          </Link>
          <span className="rounded-lg border border-gray-300 px-6 py-3 text-gray-400 cursor-not-allowed">
            Facebook — Coming Soon
          </span>
          <span className="rounded-lg border border-gray-300 px-6 py-3 text-gray-400 cursor-not-allowed">
            Truth Social — Pro
          </span>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">30 Second Exports</h3>
            <p className="text-sm text-gray-600">
              Type, customize, download. No signup needed.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Thumbnail-Optimized</h3>
            <p className="text-sm text-gray-600">
              Oversized text, bold styling, built for 1280x720.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Transparent PNG</h3>
            <p className="text-sm text-gray-600">
              Export with transparent background for easy compositing.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">
          How to Create Fake Tweet Screenshots for YouTube Thumbnails
        </h2>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            YouTube thumbnails with tweet screenshots are one of the most
            effective formats on the platform. Political commentators, finance
            channels, drama channels, and news recap creators use them daily to
            grab attention and drive clicks.
          </p>
          <p>
            ThumbnailCards lets you generate realistic tweet cards with custom
            text, profile pictures, engagement numbers, and verified badges —
            all optimized for thumbnail use. Unlike other tools, we offer
            Manual mode with granular control over font sizes, weights, card
            dimensions, and styling so your tweet cards stand out at thumbnail
            scale.
          </p>
          <h3 className="text-lg font-semibold text-black">
            Why Use a Fake Tweet Generator?
          </h3>
          <p>
            Screenshotting real tweets is unreliable — tweets get deleted,
            text is too small for thumbnails, and you can&apos;t control the
            styling. A tweet generator gives you full control over the
            appearance while producing high-resolution PNGs that look sharp
            at any size.
          </p>
          <h3 className="text-lg font-semibold text-black">
            Features Built for Thumbnail Creators
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Default &amp; Manual modes</strong> — use standard X
              post styling or customize every detail with sliders
            </li>
            <li>
              <strong>Built-in presets</strong> — Standard, Thumbnail Bold,
              and Minimal for quick starts
            </li>
            <li>
              <strong>Transparent PNG export</strong> — composite the tweet
              card over any background
            </li>
            <li>
              <strong>Dark, light, and dim themes</strong> — match any
              thumbnail aesthetic
            </li>
            <li>
              <strong>Randomize engagement</strong> — generate realistic
              reply, retweet, like, and view counts instantly
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

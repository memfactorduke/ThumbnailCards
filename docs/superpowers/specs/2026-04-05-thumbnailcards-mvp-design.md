# ThumbnailCards — MVP Design Spec

## Overview

ThumbnailCards is a free, client-side web app for generating fake social media post cards optimized for YouTube thumbnail creation. The MVP ships with a Twitter/X generator. Future phases add additional platform templates and a Pro monetization tier.

**Target audience:** YouTube creators (political commentators, finance channels, drama channels, meme pages, news recaps) who need realistic tweet screenshots for thumbnails.

**Core value prop:** Type a name, handle, and tweet text → customize styling → download a high-res PNG in under 30 seconds. No signup required.

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **PNG Export:** html-to-image (DOM-to-image approach)
- **Routing:** React Router (client-side)
- **SEO:** Prerendered routes at build time (vite-plugin-ssr or similar)
- **Hosting:** Cloudflare Pages (free tier)
- **Auth/Payments:** Deferred to post-MVP phase

## Architecture

### Multi-Route SPA

Each social platform gets its own route with dedicated SEO meta tags, H1, and keyword-targeted landing content. Shared generator core with platform-specific template components. Routes are lazy-loaded.

### Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | SEO landing page — hero, feature highlights, links to generators, SEO article content | MVP |
| `/twitter` | Twitter/X post generator | MVP |
| `/facebook` | Facebook post generator | Future |
| `/truthsocial` | Truth Social post generator | Future (Pro) |
| `/threads` | Threads post generator | Future (Pro) |
| `/instagram` | Instagram post generator | Future (Pro) |
| `/pricing` | Pro tier pricing page | Future |

### Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Shared nav bar
│   │   └── Footer.tsx              # Shared footer
│   ├── generator/
│   │   ├── GeneratorShell.tsx      # Shared two-column layout (controls + preview)
│   │   ├── ControlsPanel.tsx       # Left panel — inputs, toggles, sliders
│   │   ├── PreviewPanel.tsx        # Right panel — live preview + download
│   │   ├── ModeToggle.tsx          # Default / Manual mode switch
│   │   ├── EngagementBar.tsx       # Engagement stats inputs + randomize
│   │   ├── ThemeToggle.tsx         # Light / Dark / Dim toggle
│   │   ├── AvatarUpload.tsx        # Drag-and-drop avatar upload
│   │   ├── SliderControl.tsx       # Reusable labeled slider component
│   │   ├── PresetSelector.tsx      # Built-in + custom preset picker
│   │   └── ExportButton.tsx        # Download PNG + transparent BG toggle
│   └── templates/
│       └── twitter/
│           └── TwitterCard.tsx     # Twitter/X post template
├── pages/
│   ├── HomePage.tsx
│   └── TwitterGeneratorPage.tsx
├── hooks/
│   └── useGenerator.ts            # Shared generator state management
├── types/
│   └── generator.ts               # Shared types for generator config
└── utils/
    ├── export.ts                   # html-to-image export logic
    └── presets.ts                  # Built-in preset definitions
```

## Generator Page Layout

Two-column layout on desktop, stacked on mobile.

### Left Column — Controls Panel

**Mode toggle** at the top: Default | Manual (Advanced)

**Always visible (both modes):**

- Display Name (text input)
- Handle (text input)
- Tweet Text (textarea)
- Avatar (drag-and-drop image upload)
- Theme: Light / Dark / Dim (toggle buttons)
- Verified Badge: None / Blue / Gold / Gov (selector) — gated for Pro, shows lock icon on free
- Engagement Bar:
  - Toggle on/off (on by default)
  - Inputs: Replies, Retweets, Likes, Views
  - Randomize button (generates plausible random values — e.g. replies 100-5K, retweets 500-20K, likes 1K-100K, views 100K-10M, formatted with K/M suffixes)
- Preset selector: Standard, Thumbnail Bold, Minimal (dropdown or button group)

**Manual/Advanced mode only (additional sliders):**

- **Text controls:**
  - Tweet text: font size, font weight, line height, color
  - Display name: font size, font weight
  - Handle: font size, color
  - Engagement numbers: font size
- **Layout controls:**
  - Card width
  - Card padding (top/bottom, left/right)
  - Avatar size
  - Gap between avatar and text content
  - Card border radius
- **Style controls:**
  - Card background color (color picker, beyond theme presets)
  - Card border: on/off, color, thickness
  - Font family (Pro, later)

### Right Column — Preview Panel

- **Live preview** of the tweet card, updating in real time as inputs change
- **Watermark bar** below the card: "thumbnailcards.com — Upgrade to Pro to remove" (free tier only)
- **Export controls:**
  - "Download PNG" button (primary CTA)
  - "Transparent Background" toggle

### Mobile Layout

Controls and preview stack vertically. Preview at top (sticky/collapsible) so users can see changes as they scroll through controls, or controls at top with preview below — to be determined during implementation based on what feels better.

## Built-in Presets

Presets are saved combinations of Manual mode slider values.

| Preset | Description |
|---|---|
| **Standard** | Matches real X post styling — default sizes, weights, spacing |
| **Thumbnail Bold** | Oversized tweet text, heavy font weight, extra contrast, larger avatar |
| **Minimal** | No engagement bar, clean look, tighter padding |

Custom preset saving is deferred to Pro tier (requires auth + storage).

## Free vs Pro Gating

The MVP ships as entirely free. Pro gating is implemented as simple `isPro` checks in the code so it can be enabled later without restructuring.

### Free Tier (MVP)
- Full generator with all Default + Manual mode controls
- All three themes (light/dark/dim)
- No verified badge
- Small watermark bar below exported card: "thumbnailcards.com"
- PNG export with transparent background option
- Built-in presets only
- Twitter/X template only

### Pro Tier (Future)
- Verified badges: Blue, Gold, Government
- No watermark on export
- Additional platform templates (Truth Social, Threads, Instagram, Facebook)
- Save custom presets
- Custom fonts
- Batch generation (multiple cards at once)
- Price: $5-8/month via Stripe or Lemon Squeezy
- Auth: Supabase Auth, Clerk, or similar lightweight provider

## SEO Strategy

### Per-Page SEO
Each route gets unique:
- `<title>` tag targeting primary keyword
- `<meta name="description">` with compelling copy
- `<h1>` matching search intent
- Structured data (JSON-LD) where applicable
- OG/Twitter card meta tags for social sharing

### Target Keywords (by route)
- `/`: "fake tweet generator", "social media post mockup tool", "tweet screenshot maker"
- `/twitter`: "fake tweet generator", "twitter post generator", "x post maker"
- `/facebook`: "fake facebook post generator" (future)
- `/truthsocial`: "truth social post generator" (future)

### Homepage Content
Below-the-fold SEO article section: "How to Create Fake Tweet Screenshots for YouTube Thumbnails" — keyword-rich, genuinely useful content targeting long-tail queries.

## PNG Export

### Approach
Uses `html-to-image` library to capture the tweet card DOM element as a PNG.

### Export Options
- **Standard PNG:** Card rendered with background color from selected theme
- **Transparent PNG:** Card rendered with transparent background (toggle)
- **Watermark:** "thumbnailcards.com" bar appended below the card on free tier

### Technical Notes
- The tweet card component is rendered in a container with a fixed pixel width (not responsive %) so the exported image is consistent regardless of viewport
- Avatar images are inlined as base64 to avoid CORS issues during export
- Export targets a card width that produces sharp results at YouTube thumbnail scale (1280×720)

## Responsive Design

Fully responsive from launch. Mobile-first CSS with Tailwind breakpoints.

- **Desktop (lg+):** Two-column layout — controls left, preview right
- **Tablet (md):** Two-column with narrower controls panel
- **Mobile (sm):** Single-column stacked layout

## Monetization (Future)

Three revenue streams, all deferred to post-MVP:

1. **Ads:** Display ads once traffic exceeds 50K sessions/month. Apply to Mediavine or Raptive for premium rates.
2. **Pro tier:** $5-8/month subscription. See Pro Tier section above.
3. **Affiliate links:** Canva Pro, vidIQ, TubeBuddy, Adobe Creative Cloud — placed contextually on the site.

## Expansion Path (Future)

1. Additional platform templates — each with its own route and SEO page
2. Thumbnail builder — combine tweet cards with background templates, text overlays, face cutouts
3. Full YouTube thumbnail workflow tool

## Out of Scope for MVP

- User accounts / authentication
- Payment processing
- Database / backend
- Additional platform templates beyond Twitter/X
- Custom fonts
- Batch generation
- Saved presets (custom)
- Affiliate links
- Ads integration
- Thumbnail builder

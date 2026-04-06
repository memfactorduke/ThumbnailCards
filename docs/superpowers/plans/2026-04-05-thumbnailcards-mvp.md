# ThumbnailCards MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional Twitter/X fake tweet generator web app with Default/Manual modes, live preview, and PNG export.

**Architecture:** Multi-route Vite + React SPA with React Router. Generator state managed via a single `useGenerator` hook. Tweet card rendered as HTML/CSS, captured to PNG via html-to-image. Each platform template is a lazy-loaded route.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, React Router v7, html-to-image

---

## File Structure

```
thumbnailcards/
├── index.html                          # Vite entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                        # React mount + router setup
│   ├── App.tsx                         # Route definitions
│   ├── index.css                       # Tailwind directives + global styles
│   ├── types/
│   │   └── generator.ts               # GeneratorConfig, ThemeType, BadgeType, Preset types
│   ├── utils/
│   │   ├── presets.ts                  # Built-in preset definitions (Standard, Thumbnail Bold, Minimal)
│   │   ├── export.ts                   # html-to-image export + watermark logic
│   │   └── randomize.ts               # Random engagement number generation
│   ├── hooks/
│   │   └── useGenerator.ts            # Central state hook for all generator config
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Site nav bar
│   │   │   └── Footer.tsx            # Site footer
│   │   ├── generator/
│   │   │   ├── GeneratorShell.tsx     # Two-column responsive layout wrapper
│   │   │   ├── ControlsPanel.tsx      # Left panel — assembles all control sections
│   │   │   ├── PreviewPanel.tsx       # Right panel — live preview + export controls
│   │   │   ├── ModeToggle.tsx         # Default / Manual toggle
│   │   │   ├── ThemeToggle.tsx        # Light / Dark / Dim theme picker
│   │   │   ├── BadgeSelector.tsx      # Verified badge picker (with Pro lock)
│   │   │   ├── EngagementControls.tsx # Engagement bar inputs + toggle + randomize
│   │   │   ├── AvatarUpload.tsx       # Drag-and-drop + click avatar upload
│   │   │   ├── SliderControl.tsx      # Reusable labeled range slider
│   │   │   ├── ManualControls.tsx     # All Manual mode sliders grouped
│   │   │   ├── PresetSelector.tsx     # Preset button group
│   │   │   └── ExportControls.tsx     # Download PNG button + transparent BG toggle
│   │   └── templates/
│   │       └── twitter/
│   │           └── TwitterCard.tsx    # The actual tweet card DOM that gets exported
│   └── pages/
│       ├── HomePage.tsx               # SEO landing page
│       └── TwitterGeneratorPage.tsx   # Twitter generator page wrapper
└── tests/
    ├── utils/
    │   ├── presets.test.ts
    │   ├── export.test.ts
    │   └── randomize.test.ts
    ├── hooks/
    │   └── useGenerator.test.ts
    └── components/
        └── templates/
            └── TwitterCard.test.tsx
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `public/favicon.svg`

- [ ] **Step 1: Initialize Vite project with React + TypeScript**

```bash
npm create vite@latest . -- --template react-ts
```

If the directory is not empty, confirm overwrite. This generates `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, and related files.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom html-to-image
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer @types/react @types/react-dom vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Tailwind CSS v4**

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

Create `postcss.config.js`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Remove `tailwind.config.ts` if it was created — Tailwind v4 uses CSS-based config via `@theme` directives in `index.css`, not a JS config file.

- [ ] **Step 4: Configure Vitest**

Add to `vite.config.ts`:

```ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
```

Create `src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Add scripts to package.json**

Ensure these scripts exist in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit"
  }
}
```

- [ ] **Step 6: Set up routing in App.tsx**

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const TwitterGeneratorPage = lazy(
  () => import("./pages/TwitterGeneratorPage")
);

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/twitter" element={<TwitterGeneratorPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
```

Update `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 7: Create placeholder pages**

Create `src/pages/HomePage.tsx`:

```tsx
export default function HomePage() {
  return <div className="p-8"><h1 className="text-3xl font-bold">ThumbnailCards</h1></div>;
}
```

Create `src/pages/TwitterGeneratorPage.tsx`:

```tsx
export default function TwitterGeneratorPage() {
  return <div className="p-8"><h1 className="text-2xl font-bold">Twitter/X Generator</h1></div>;
}
```

- [ ] **Step 8: Create placeholder layout components**

Create `src/components/layout/Navbar.tsx`:

```tsx
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">ThumbnailCards</Link>
      <div className="flex gap-4">
        <Link to="/twitter" className="hover:underline">Twitter/X</Link>
      </div>
    </nav>
  );
}
```

Create `src/components/layout/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-4 text-sm text-gray-500 text-center">
      ThumbnailCards — Free fake social media post generator for YouTube thumbnails
    </footer>
  );
}
```

- [ ] **Step 9: Verify everything works**

```bash
npm run dev
```

Expected: App loads at `http://localhost:5173` with Navbar, "ThumbnailCards" heading, and Footer. Navigating to `/twitter` shows "Twitter/X Generator".

```bash
npm run build
```

Expected: Build succeeds with no errors.

```bash
npm run lint
```

Expected: No TypeScript errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript project with routing and Tailwind"
```

---

### Task 2: Types and Presets

**Files:**
- Create: `src/types/generator.ts`, `src/utils/presets.ts`, `tests/utils/presets.test.ts`

- [ ] **Step 1: Write the failing test for presets**

Create `tests/utils/presets.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { PRESETS, getPreset } from "../../src/utils/presets";
import type { GeneratorConfig } from "../../src/types/generator";

describe("presets", () => {
  it("exports three built-in presets", () => {
    expect(PRESETS).toHaveLength(3);
    expect(PRESETS.map((p) => p.name)).toEqual([
      "Standard",
      "Thumbnail Bold",
      "Minimal",
    ]);
  });

  it("getPreset returns a preset by name", () => {
    const preset = getPreset("Standard");
    expect(preset).toBeDefined();
    expect(preset!.name).toBe("Standard");
  });

  it("getPreset returns undefined for unknown preset", () => {
    expect(getPreset("Nonexistent")).toBeUndefined();
  });

  it("Standard preset has default X post sizing", () => {
    const preset = getPreset("Standard")!;
    expect(preset.config.tweetFontSize).toBe(15);
    expect(preset.config.showEngagement).toBe(true);
  });

  it("Thumbnail Bold preset has oversized text", () => {
    const preset = getPreset("Thumbnail Bold")!;
    expect(preset.config.tweetFontSize).toBeGreaterThan(20);
    expect(preset.config.tweetFontWeight).toBeGreaterThanOrEqual(700);
  });

  it("Minimal preset hides engagement bar", () => {
    const preset = getPreset("Minimal")!;
    expect(preset.config.showEngagement).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/utils/presets.test.ts
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Define the GeneratorConfig type**

Create `src/types/generator.ts`:

```ts
export type ThemeType = "light" | "dark" | "dim";

export type BadgeType = "none" | "blue" | "gold" | "gov";

export interface EngagementStats {
  replies: string;
  retweets: string;
  likes: string;
  views: string;
}

export interface GeneratorConfig {
  // Content
  displayName: string;
  handle: string;
  tweetText: string;
  avatarUrl: string | null;

  // Theme & badge
  theme: ThemeType;
  badge: BadgeType;

  // Engagement
  showEngagement: boolean;
  engagement: EngagementStats;

  // Text controls (Manual mode)
  tweetFontSize: number;
  tweetFontWeight: number;
  tweetLineHeight: number;
  tweetColor: string;
  nameFontSize: number;
  nameFontWeight: number;
  handleFontSize: number;
  handleColor: string;
  engagementFontSize: number;

  // Layout controls (Manual mode)
  cardWidth: number;
  cardPaddingX: number;
  cardPaddingY: number;
  avatarSize: number;
  avatarGap: number;
  cardBorderRadius: number;

  // Style controls (Manual mode)
  cardBgColor: string;
  cardBorderEnabled: boolean;
  cardBorderColor: string;
  cardBorderWidth: number;
}

export interface Preset {
  name: string;
  description: string;
  config: GeneratorConfig;
}

export type GeneratorMode = "default" | "manual";
```

- [ ] **Step 4: Implement presets**

Create `src/utils/presets.ts`:

```ts
import type { Preset, GeneratorConfig } from "../types/generator";

const BASE_CONFIG: GeneratorConfig = {
  displayName: "",
  handle: "",
  tweetText: "",
  avatarUrl: null,
  theme: "light",
  badge: "none",
  showEngagement: true,
  engagement: { replies: "", retweets: "", likes: "", views: "" },
  tweetFontSize: 15,
  tweetFontWeight: 400,
  tweetLineHeight: 1.4,
  tweetColor: "",
  nameFontSize: 15,
  nameFontWeight: 700,
  handleFontSize: 15,
  handleColor: "",
  engagementFontSize: 13,
  cardWidth: 500,
  cardPaddingX: 16,
  cardPaddingY: 12,
  avatarSize: 48,
  avatarGap: 12,
  cardBorderRadius: 0,
  cardBgColor: "",
  cardBorderEnabled: false,
  cardBorderColor: "#cfd9de",
  cardBorderWidth: 1,
};

export const PRESETS: Preset[] = [
  {
    name: "Standard",
    description: "Matches real X post styling",
    config: { ...BASE_CONFIG },
  },
  {
    name: "Thumbnail Bold",
    description: "Oversized text, heavy weight, larger avatar",
    config: {
      ...BASE_CONFIG,
      tweetFontSize: 28,
      tweetFontWeight: 700,
      tweetLineHeight: 1.3,
      nameFontSize: 20,
      nameFontWeight: 800,
      avatarSize: 64,
      cardWidth: 550,
      cardPaddingX: 20,
      cardPaddingY: 16,
    },
  },
  {
    name: "Minimal",
    description: "No engagement bar, clean look, tighter padding",
    config: {
      ...BASE_CONFIG,
      showEngagement: false,
      cardPaddingX: 12,
      cardPaddingY: 10,
    },
  },
];

export function getPreset(name: string): Preset | undefined {
  return PRESETS.find((p) => p.name === name);
}

export { BASE_CONFIG };
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run tests/utils/presets.test.ts
```

Expected: All 6 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/types/generator.ts src/utils/presets.ts tests/utils/presets.test.ts
git commit -m "feat: add GeneratorConfig types and built-in presets"
```

---

### Task 3: Randomize Utility

**Files:**
- Create: `src/utils/randomize.ts`, `tests/utils/randomize.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/utils/randomize.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { randomizeEngagement, formatCount } from "../../src/utils/randomize";

describe("formatCount", () => {
  it("formats numbers under 1000 as-is", () => {
    expect(formatCount(500)).toBe("500");
  });

  it("formats thousands with K suffix", () => {
    expect(formatCount(1500)).toBe("1.5K");
  });

  it("formats millions with M suffix", () => {
    expect(formatCount(2500000)).toBe("2.5M");
  });

  it("drops decimal for round numbers", () => {
    expect(formatCount(2000)).toBe("2K");
    expect(formatCount(1000000)).toBe("1M");
  });
});

describe("randomizeEngagement", () => {
  it("returns replies, retweets, likes, views as formatted strings", () => {
    const result = randomizeEngagement();
    expect(result).toHaveProperty("replies");
    expect(result).toHaveProperty("retweets");
    expect(result).toHaveProperty("likes");
    expect(result).toHaveProperty("views");
    expect(typeof result.replies).toBe("string");
  });

  it("generates values in plausible ranges", () => {
    // Run multiple times to check ranges
    for (let i = 0; i < 20; i++) {
      const result = randomizeEngagement();
      // All values should be non-empty strings
      expect(result.replies.length).toBeGreaterThan(0);
      expect(result.retweets.length).toBeGreaterThan(0);
      expect(result.likes.length).toBeGreaterThan(0);
      expect(result.views.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/utils/randomize.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement randomize utility**

Create `src/utils/randomize.ts`:

```ts
import type { EngagementStats } from "../types/generator";

export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000;
    return val % 1 === 0 ? `${val}M` : `${parseFloat(val.toFixed(1))}M`;
  }
  if (n >= 1_000) {
    const val = n / 1_000;
    return val % 1 === 0 ? `${val}K` : `${parseFloat(val.toFixed(1))}K`;
  }
  return String(n);
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizeEngagement(): EngagementStats {
  return {
    replies: formatCount(randBetween(100, 5000)),
    retweets: formatCount(randBetween(500, 20000)),
    likes: formatCount(randBetween(1000, 100000)),
    views: formatCount(randBetween(100000, 10000000)),
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/utils/randomize.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/randomize.ts tests/utils/randomize.test.ts
git commit -m "feat: add engagement randomizer with K/M formatting"
```

---

### Task 4: useGenerator Hook

**Files:**
- Create: `src/hooks/useGenerator.ts`, `tests/hooks/useGenerator.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/hooks/useGenerator.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGenerator } from "../../src/hooks/useGenerator";

describe("useGenerator", () => {
  it("initializes with Standard preset values", () => {
    const { result } = renderHook(() => useGenerator());
    expect(result.current.config.tweetFontSize).toBe(15);
    expect(result.current.config.showEngagement).toBe(true);
    expect(result.current.mode).toBe("default");
  });

  it("updates individual config fields", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.updateConfig({ displayName: "Test User" });
    });
    expect(result.current.config.displayName).toBe("Test User");
  });

  it("applies a preset", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.applyPreset("Thumbnail Bold");
    });
    expect(result.current.config.tweetFontSize).toBe(28);
    expect(result.current.config.tweetFontWeight).toBe(700);
    expect(result.current.activePreset).toBe("Thumbnail Bold");
  });

  it("preserves content fields when applying a preset", () => {
    const { result } = renderHook(() => useGenerator());
    act(() => {
      result.current.updateConfig({
        displayName: "Keep This",
        handle: "@keepthis",
        tweetText: "Preserve me",
      });
    });
    act(() => {
      result.current.applyPreset("Thumbnail Bold");
    });
    expect(result.current.config.displayName).toBe("Keep This");
    expect(result.current.config.handle).toBe("@keepthis");
    expect(result.current.config.tweetText).toBe("Preserve me");
  });

  it("toggles mode between default and manual", () => {
    const { result } = renderHook(() => useGenerator());
    expect(result.current.mode).toBe("default");
    act(() => {
      result.current.setMode("manual");
    });
    expect(result.current.mode).toBe("manual");
  });

  it("randomizes engagement values", () => {
    const { result } = renderHook(() => useGenerator());
    const before = { ...result.current.config.engagement };
    act(() => {
      result.current.randomizeEngagement();
    });
    // At least one value should differ (extremely unlikely all match)
    const after = result.current.config.engagement;
    const changed =
      before.replies !== after.replies ||
      before.retweets !== after.retweets ||
      before.likes !== after.likes ||
      before.views !== after.views;
    expect(changed).toBe(true);
  });

  it("sets avatar from file as base64 data URL", async () => {
    const { result } = renderHook(() => useGenerator());
    const file = new File(["fake-image"], "avatar.png", {
      type: "image/png",
    });

    // Mock FileReader
    const mockRead = vi.fn();
    const mockReader = {
      readAsDataURL: mockRead,
      result: "data:image/png;base64,abc123",
      onload: null as (() => void) | null,
    };
    vi.spyOn(globalThis, "FileReader").mockImplementation(
      () => mockReader as unknown as FileReader
    );

    await act(async () => {
      result.current.setAvatar(file);
      // Simulate FileReader onload
      mockReader.onload?.();
    });

    expect(result.current.config.avatarUrl).toBe(
      "data:image/png;base64,abc123"
    );
    vi.restoreAllMocks();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/hooks/useGenerator.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement useGenerator hook**

Create `src/hooks/useGenerator.ts`:

```ts
import { useState, useCallback } from "react";
import type { GeneratorConfig, GeneratorMode } from "../types/generator";
import { BASE_CONFIG, getPreset } from "../utils/presets";
import { randomizeEngagement as randomize } from "../utils/randomize";

export function useGenerator() {
  const [config, setConfig] = useState<GeneratorConfig>({ ...BASE_CONFIG });
  const [mode, setMode] = useState<GeneratorMode>("default");
  const [activePreset, setActivePreset] = useState<string>("Standard");

  const updateConfig = useCallback(
    (partial: Partial<GeneratorConfig>) => {
      setConfig((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const applyPreset = useCallback((name: string) => {
    const preset = getPreset(name);
    if (!preset) return;
    setConfig((prev) => ({
      ...preset.config,
      displayName: prev.displayName,
      handle: prev.handle,
      tweetText: prev.tweetText,
      avatarUrl: prev.avatarUrl,
    }));
    setActivePreset(name);
  }, []);

  const randomizeEngagement = useCallback(() => {
    const stats = randomize();
    setConfig((prev) => ({
      ...prev,
      engagement: stats,
    }));
  }, []);

  const setAvatar = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setConfig((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  return {
    config,
    mode,
    activePreset,
    updateConfig,
    applyPreset,
    setMode,
    randomizeEngagement,
    setAvatar,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/hooks/useGenerator.test.ts
```

Expected: All 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useGenerator.ts tests/hooks/useGenerator.test.ts
git commit -m "feat: add useGenerator hook with preset, randomize, and avatar support"
```

---

### Task 5: TwitterCard Template Component

**Files:**
- Create: `src/components/templates/twitter/TwitterCard.tsx`, `tests/components/templates/TwitterCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/templates/TwitterCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TwitterCard } from "../../../src/components/templates/twitter/TwitterCard";
import { BASE_CONFIG } from "../../../src/utils/presets";
import type { GeneratorConfig } from "../../../src/types/generator";

const testConfig: GeneratorConfig = {
  ...BASE_CONFIG,
  displayName: "John Doe",
  handle: "@johndoe",
  tweetText: "This is a test tweet",
  theme: "light",
  showEngagement: true,
  engagement: {
    replies: "1.2K",
    retweets: "4.5K",
    likes: "23K",
    views: "1.2M",
  },
};

describe("TwitterCard", () => {
  it("renders display name and handle", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("renders tweet text", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("This is a test tweet")).toBeInTheDocument();
  });

  it("renders engagement stats when enabled", () => {
    render(<TwitterCard config={testConfig} />);
    expect(screen.getByText("1.2K")).toBeInTheDocument();
    expect(screen.getByText("4.5K")).toBeInTheDocument();
    expect(screen.getByText("23K")).toBeInTheDocument();
    expect(screen.getByText("1.2M")).toBeInTheDocument();
  });

  it("hides engagement stats when disabled", () => {
    render(
      <TwitterCard config={{ ...testConfig, showEngagement: false }} />
    );
    expect(screen.queryByText("1.2K")).not.toBeInTheDocument();
  });

  it("applies light theme background", () => {
    const { container } = render(<TwitterCard config={testConfig} />);
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(255, 255, 255)");
  });

  it("applies dark theme background", () => {
    const { container } = render(
      <TwitterCard config={{ ...testConfig, theme: "dark" }} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(0, 0, 0)");
  });

  it("applies custom font size from config", () => {
    render(
      <TwitterCard config={{ ...testConfig, tweetFontSize: 28 }} />
    );
    const tweetEl = screen.getByText("This is a test tweet");
    expect(tweetEl.style.fontSize).toBe("28px");
  });

  it("renders avatar when avatarUrl is set", () => {
    render(
      <TwitterCard
        config={{ ...testConfig, avatarUrl: "data:image/png;base64,abc" }}
      />
    );
    const img = screen.getByAltText("Avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "data:image/png;base64,abc");
  });

  it("renders placeholder when no avatar", () => {
    render(<TwitterCard config={{ ...testConfig, avatarUrl: null }} />);
    expect(screen.queryByAltText("Avatar")).not.toBeInTheDocument();
    // Should render a placeholder div
    expect(screen.getByTestId("avatar-placeholder")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/templates/TwitterCard.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement TwitterCard component**

Create `src/components/templates/twitter/TwitterCard.tsx`:

```tsx
import type { GeneratorConfig } from "../../../types/generator";

interface TwitterCardProps {
  config: GeneratorConfig;
}

const THEME_COLORS = {
  light: { bg: "#ffffff", text: "#0f1419", secondary: "#536471", border: "#eff3f4" },
  dark: { bg: "#000000", text: "#e7e9ea", secondary: "#71767b", border: "#2f3336" },
  dim: { bg: "#15202b", text: "#f7f9f9", secondary: "#8b98a5", border: "#38444d" },
};

export function TwitterCard({ config }: TwitterCardProps) {
  const theme = THEME_COLORS[config.theme];
  const bgColor = config.cardBgColor || theme.bg;
  const textColor = config.tweetColor || theme.text;
  const handleColor = config.handleColor || theme.secondary;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: `${config.cardWidth}px`,
        padding: `${config.cardPaddingY}px ${config.cardPaddingX}px`,
        borderRadius: `${config.cardBorderRadius}px`,
        border: config.cardBorderEnabled
          ? `${config.cardBorderWidth}px solid ${config.cardBorderColor}`
          : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        boxSizing: "border-box",
      }}
    >
      {/* Header: avatar + name/handle */}
      <div
        style={{
          display: "flex",
          gap: `${config.avatarGap}px`,
          marginBottom: "8px",
          alignItems: "flex-start",
        }}
      >
        {/* Avatar */}
        {config.avatarUrl ? (
          <img
            src={config.avatarUrl}
            alt="Avatar"
            style={{
              width: `${config.avatarSize}px`,
              height: `${config.avatarSize}px`,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            data-testid="avatar-placeholder"
            style={{
              width: `${config.avatarSize}px`,
              height: `${config.avatarSize}px`,
              borderRadius: "50%",
              backgroundColor: theme.border,
              flexShrink: 0,
            }}
          />
        )}

        {/* Name + handle */}
        <div style={{ minWidth: 0 }}>
          <span
            style={{
              fontSize: `${config.nameFontSize}px`,
              fontWeight: config.nameFontWeight,
              color: textColor,
              marginRight: "4px",
            }}
          >
            {config.displayName || "Display Name"}
          </span>
          <span
            style={{
              fontSize: `${config.handleFontSize}px`,
              color: handleColor,
            }}
          >
            {config.handle || "@handle"}
          </span>
        </div>
      </div>

      {/* Tweet text */}
      <div
        style={{
          fontSize: `${config.tweetFontSize}px`,
          fontWeight: config.tweetFontWeight,
          lineHeight: config.tweetLineHeight,
          color: textColor,
          marginBottom: config.showEngagement ? "12px" : "0",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {config.tweetText || "Your tweet text here..."}
      </div>

      {/* Engagement bar */}
      {config.showEngagement && (
        <div
          style={{
            display: "flex",
            gap: "24px",
            borderTop: `1px solid ${theme.border}`,
            paddingTop: "10px",
            fontSize: `${config.engagementFontSize}px`,
            color: theme.secondary,
          }}
        >
          <span>{config.engagement.replies || "0"}</span>
          <span>{config.engagement.retweets || "0"}</span>
          <span>{config.engagement.likes || "0"}</span>
          <span>{config.engagement.views || "0"}</span>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/templates/TwitterCard.test.tsx
```

Expected: All 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/templates/twitter/TwitterCard.tsx tests/components/templates/TwitterCard.test.tsx
git commit -m "feat: add TwitterCard template component with theme and config support"
```

---

### Task 6: Export Utility

**Files:**
- Create: `src/utils/export.ts`, `tests/utils/export.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/utils/export.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";
import { buildExportOptions, triggerDownload } from "../../src/utils/export";

describe("buildExportOptions", () => {
  it("returns options with white background by default", () => {
    const opts = buildExportOptions({ transparent: false });
    expect(opts.backgroundColor).toBe("#ffffff");
  });

  it("returns transparent background when requested", () => {
    const opts = buildExportOptions({ transparent: true });
    expect(opts.backgroundColor).toBeUndefined();
  });

  it("sets pixel ratio to 2 for sharpness", () => {
    const opts = buildExportOptions({ transparent: false });
    expect(opts.pixelRatio).toBe(2);
  });
});

describe("triggerDownload", () => {
  it("creates a link element and clicks it", () => {
    const createSpy = vi.spyOn(document, "createElement");
    const appendSpy = vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    const removeSpy = vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    triggerDownload("data:image/png;base64,abc", "test.png");

    expect(createSpy).toHaveBeenCalledWith("a");
    appendSpy.mockRestore();
    removeSpy.mockRestore();
    createSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/utils/export.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement export utility**

Create `src/utils/export.ts`:

```ts
import { toPng } from "html-to-image";

interface ExportOptions {
  backgroundColor?: string;
  pixelRatio: number;
}

export function buildExportOptions(opts: {
  transparent: boolean;
}): ExportOptions {
  return {
    backgroundColor: opts.transparent ? undefined : "#ffffff",
    pixelRatio: 2,
  };
}

export function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCard(
  element: HTMLElement,
  opts: { transparent: boolean; filename?: string }
): Promise<void> {
  const exportOpts = buildExportOptions(opts);
  const dataUrl = await toPng(element, {
    backgroundColor: exportOpts.backgroundColor,
    pixelRatio: exportOpts.pixelRatio,
    cacheBust: true,
  });
  triggerDownload(dataUrl, opts.filename ?? "thumbnailcard.png");
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/utils/export.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/export.ts tests/utils/export.test.ts
git commit -m "feat: add PNG export utility with transparent background support"
```

---

### Task 7: Reusable Control Components

**Files:**
- Create: `src/components/generator/SliderControl.tsx`, `src/components/generator/ModeToggle.tsx`, `src/components/generator/ThemeToggle.tsx`, `src/components/generator/BadgeSelector.tsx`, `src/components/generator/PresetSelector.tsx`

- [ ] **Step 1: Create SliderControl**

Create `src/components/generator/SliderControl.tsx`:

```tsx
interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: SliderControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create ModeToggle**

Create `src/components/generator/ModeToggle.tsx`:

```tsx
import type { GeneratorMode } from "../../types/generator";

interface ModeToggleProps {
  mode: GeneratorMode;
  onChange: (mode: GeneratorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      <button
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "default"
            ? "bg-white shadow-sm text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onChange("default")}
      >
        Default
      </button>
      <button
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "manual"
            ? "bg-white shadow-sm text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => onChange("manual")}
      >
        Manual
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create ThemeToggle**

Create `src/components/generator/ThemeToggle.tsx`:

```tsx
import type { ThemeType } from "../../types/generator";

interface ThemeToggleProps {
  theme: ThemeType;
  onChange: (theme: ThemeType) => void;
}

const THEMES: { value: ThemeType; label: string; swatch: string }[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-gray-300" },
  { value: "dim", label: "Dim", swatch: "bg-[#15202b]" },
  { value: "dark", label: "Dark", swatch: "bg-black" },
];

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Theme</label>
      <div className="flex gap-2">
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border transition-colors ${
              theme === t.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`w-5 h-5 rounded-full ${t.swatch}`} />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create BadgeSelector**

Create `src/components/generator/BadgeSelector.tsx`:

```tsx
import type { BadgeType } from "../../types/generator";

interface BadgeSelectorProps {
  badge: BadgeType;
  onChange: (badge: BadgeType) => void;
}

const BADGES: { value: BadgeType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "blue", label: "Blue" },
  { value: "gold", label: "Gold" },
  { value: "gov", label: "Gov" },
];

export function BadgeSelector({ badge, onChange }: BadgeSelectorProps) {
  const isPro = false; // Will be wired to auth later

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Verified Badge {!isPro && <span className="text-gray-400 text-xs ml-1">Pro</span>}
      </label>
      <div className="flex gap-2">
        {BADGES.map((b) => (
          <button
            key={b.value}
            onClick={() => isPro || b.value === "none" ? onChange(b.value) : undefined}
            disabled={!isPro && b.value !== "none"}
            className={`rounded-lg px-3 py-2 text-sm border transition-colors ${
              badge === b.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            } ${!isPro && b.value !== "none" ? "opacity-50 cursor-not-allowed" : "hover:border-gray-300"}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create PresetSelector**

Create `src/components/generator/PresetSelector.tsx`:

```tsx
import { PRESETS } from "../../utils/presets";

interface PresetSelectorProps {
  activePreset: string;
  onSelect: (name: string) => void;
}

export function PresetSelector({ activePreset, onSelect }: PresetSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Preset</label>
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.name)}
            title={p.description}
            className={`rounded-lg px-3 py-2 text-sm border transition-colors ${
              activePreset === p.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify build**

```bash
npm run lint
```

Expected: No TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/generator/SliderControl.tsx src/components/generator/ModeToggle.tsx src/components/generator/ThemeToggle.tsx src/components/generator/BadgeSelector.tsx src/components/generator/PresetSelector.tsx
git commit -m "feat: add reusable control components (slider, mode, theme, badge, preset)"
```

---

### Task 8: AvatarUpload and EngagementControls

**Files:**
- Create: `src/components/generator/AvatarUpload.tsx`, `src/components/generator/EngagementControls.tsx`

- [ ] **Step 1: Create AvatarUpload**

Create `src/components/generator/AvatarUpload.tsx`:

```tsx
import { useCallback, useRef, useState } from "react";

interface AvatarUploadProps {
  avatarUrl: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}

export function AvatarUpload({ avatarUrl, onUpload, onClear }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Avatar</label>
      {avatarUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="w-12 h-12 rounded-full object-cover"
          />
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <p className="text-sm text-gray-500">
            Drop image or click to upload
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create EngagementControls**

Create `src/components/generator/EngagementControls.tsx`:

```tsx
import type { EngagementStats } from "../../types/generator";

interface EngagementControlsProps {
  show: boolean;
  engagement: EngagementStats;
  onToggle: (show: boolean) => void;
  onChange: (engagement: EngagementStats) => void;
  onRandomize: () => void;
}

export function EngagementControls({
  show,
  engagement,
  onToggle,
  onChange,
  onRandomize,
}: EngagementControlsProps) {
  const updateField = (field: keyof EngagementStats, value: string) => {
    onChange({ ...engagement, [field]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">Engagement Bar</label>
        <button
          onClick={() => onToggle(!show)}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            show ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              show ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>

      {show && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Replies</label>
            <input
              type="text"
              value={engagement.replies}
              onChange={(e) => updateField("replies", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Retweets</label>
            <input
              type="text"
              value={engagement.retweets}
              onChange={(e) => updateField("retweets", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Likes</label>
            <input
              type="text"
              value={engagement.likes}
              onChange={(e) => updateField("likes", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Views</label>
            <input
              type="text"
              value={engagement.views}
              onChange={(e) => updateField("views", e.target.value)}
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <button
            onClick={onRandomize}
            title="Randomize"
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-50"
          >
            🎲
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run lint
```

Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/generator/AvatarUpload.tsx src/components/generator/EngagementControls.tsx
git commit -m "feat: add AvatarUpload and EngagementControls components"
```

---

### Task 9: ManualControls and ExportControls

**Files:**
- Create: `src/components/generator/ManualControls.tsx`, `src/components/generator/ExportControls.tsx`

- [ ] **Step 1: Create ManualControls**

Create `src/components/generator/ManualControls.tsx`:

```tsx
import type { GeneratorConfig } from "../../types/generator";
import { SliderControl } from "./SliderControl";

interface ManualControlsProps {
  config: GeneratorConfig;
  onChange: (partial: Partial<GeneratorConfig>) => void;
}

export function ManualControls({ config, onChange }: ManualControlsProps) {
  return (
    <div className="space-y-6">
      {/* Text Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Text</h3>
        <div className="space-y-3">
          <SliderControl
            label="Tweet Font Size"
            value={config.tweetFontSize}
            min={10}
            max={48}
            onChange={(v) => onChange({ tweetFontSize: v })}
          />
          <SliderControl
            label="Tweet Font Weight"
            value={config.tweetFontWeight}
            min={100}
            max={900}
            step={100}
            onChange={(v) => onChange({ tweetFontWeight: v })}
          />
          <SliderControl
            label="Tweet Line Height"
            value={config.tweetLineHeight}
            min={1}
            max={2.5}
            step={0.1}
            onChange={(v) => onChange({ tweetLineHeight: v })}
          />
          <SliderControl
            label="Name Font Size"
            value={config.nameFontSize}
            min={10}
            max={36}
            onChange={(v) => onChange({ nameFontSize: v })}
          />
          <SliderControl
            label="Name Font Weight"
            value={config.nameFontWeight}
            min={100}
            max={900}
            step={100}
            onChange={(v) => onChange({ nameFontWeight: v })}
          />
          <SliderControl
            label="Handle Font Size"
            value={config.handleFontSize}
            min={10}
            max={28}
            onChange={(v) => onChange({ handleFontSize: v })}
          />
          <SliderControl
            label="Engagement Font Size"
            value={config.engagementFontSize}
            min={8}
            max={24}
            onChange={(v) => onChange({ engagementFontSize: v })}
          />
        </div>
      </div>

      {/* Layout Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Layout</h3>
        <div className="space-y-3">
          <SliderControl
            label="Card Width"
            value={config.cardWidth}
            min={300}
            max={800}
            onChange={(v) => onChange({ cardWidth: v })}
          />
          <SliderControl
            label="Padding X"
            value={config.cardPaddingX}
            min={0}
            max={48}
            onChange={(v) => onChange({ cardPaddingX: v })}
          />
          <SliderControl
            label="Padding Y"
            value={config.cardPaddingY}
            min={0}
            max={48}
            onChange={(v) => onChange({ cardPaddingY: v })}
          />
          <SliderControl
            label="Avatar Size"
            value={config.avatarSize}
            min={24}
            max={96}
            onChange={(v) => onChange({ avatarSize: v })}
          />
          <SliderControl
            label="Avatar Gap"
            value={config.avatarGap}
            min={4}
            max={24}
            onChange={(v) => onChange({ avatarGap: v })}
          />
          <SliderControl
            label="Border Radius"
            value={config.cardBorderRadius}
            min={0}
            max={32}
            onChange={(v) => onChange({ cardBorderRadius: v })}
          />
        </div>
      </div>

      {/* Style Controls */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Style</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Background Color</label>
            <input
              type="color"
              value={config.cardBgColor || "#ffffff"}
              onChange={(e) => onChange({ cardBgColor: e.target.value })}
              className="w-full h-8 rounded border border-gray-300 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Border</label>
            <button
              onClick={() =>
                onChange({ cardBorderEnabled: !config.cardBorderEnabled })
              }
              className={`relative w-10 h-6 rounded-full transition-colors ${
                config.cardBorderEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  config.cardBorderEnabled ? "left-5" : "left-1"
                }`}
              />
            </button>
          </div>

          {config.cardBorderEnabled && (
            <>
              <div>
                <label className="block text-sm mb-1">Border Color</label>
                <input
                  type="color"
                  value={config.cardBorderColor}
                  onChange={(e) =>
                    onChange({ cardBorderColor: e.target.value })
                  }
                  className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                />
              </div>
              <SliderControl
                label="Border Width"
                value={config.cardBorderWidth}
                min={1}
                max={8}
                onChange={(v) => onChange({ cardBorderWidth: v })}
              />
            </>
          )}

          <div>
            <label className="block text-sm mb-1">Tweet Text Color</label>
            <input
              type="color"
              value={config.tweetColor || "#000000"}
              onChange={(e) => onChange({ tweetColor: e.target.value })}
              className="w-full h-8 rounded border border-gray-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Handle Color</label>
            <input
              type="color"
              value={config.handleColor || "#536471"}
              onChange={(e) => onChange({ handleColor: e.target.value })}
              className="w-full h-8 rounded border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ExportControls**

Create `src/components/generator/ExportControls.tsx`:

```tsx
import { useRef, useState } from "react";
import { exportCard } from "../../utils/export";

interface ExportControlsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportControls({ cardRef }: ExportControlsProps) {
  const [transparent, setTransparent] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      await exportCard(cardRef.current, {
        transparent,
        filename: "thumbnailcard.png",
      });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleExport}
        disabled={exporting}
        className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {exporting ? "Exporting..." : "Download PNG"}
      </button>

      <div className="flex items-center justify-between">
        <label className="text-sm">Transparent Background</label>
        <button
          onClick={() => setTransparent(!transparent)}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            transparent ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              transparent ? "left-5" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run lint
```

Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/generator/ManualControls.tsx src/components/generator/ExportControls.tsx
git commit -m "feat: add ManualControls (all sliders) and ExportControls components"
```

---

### Task 10: ControlsPanel and PreviewPanel

**Files:**
- Create: `src/components/generator/ControlsPanel.tsx`, `src/components/generator/PreviewPanel.tsx`

- [ ] **Step 1: Create ControlsPanel**

Create `src/components/generator/ControlsPanel.tsx`:

```tsx
import type { GeneratorConfig, GeneratorMode } from "../../types/generator";
import type { EngagementStats } from "../../types/generator";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";
import { BadgeSelector } from "./BadgeSelector";
import { PresetSelector } from "./PresetSelector";
import { AvatarUpload } from "./AvatarUpload";
import { EngagementControls } from "./EngagementControls";
import { ManualControls } from "./ManualControls";

interface ControlsPanelProps {
  config: GeneratorConfig;
  mode: GeneratorMode;
  activePreset: string;
  onUpdateConfig: (partial: Partial<GeneratorConfig>) => void;
  onSetMode: (mode: GeneratorMode) => void;
  onApplyPreset: (name: string) => void;
  onRandomizeEngagement: () => void;
  onSetAvatar: (file: File) => void;
}

export function ControlsPanel({
  config,
  mode,
  activePreset,
  onUpdateConfig,
  onSetMode,
  onApplyPreset,
  onRandomizeEngagement,
  onSetAvatar,
}: ControlsPanelProps) {
  return (
    <div className="space-y-6">
      <ModeToggle mode={mode} onChange={onSetMode} />

      <PresetSelector activePreset={activePreset} onSelect={onApplyPreset} />

      {/* Display Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Display Name</label>
        <input
          type="text"
          value={config.displayName}
          onChange={(e) => onUpdateConfig({ displayName: e.target.value })}
          placeholder="Elon Musk"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Handle */}
      <div>
        <label className="block text-sm font-medium mb-1">Handle</label>
        <input
          type="text"
          value={config.handle}
          onChange={(e) => onUpdateConfig({ handle: e.target.value })}
          placeholder="@elonmusk"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Tweet Text */}
      <div>
        <label className="block text-sm font-medium mb-1">Tweet Text</label>
        <textarea
          value={config.tweetText}
          onChange={(e) => onUpdateConfig({ tweetText: e.target.value })}
          placeholder="Type your tweet here..."
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm resize-y"
        />
      </div>

      <AvatarUpload
        avatarUrl={config.avatarUrl}
        onUpload={onSetAvatar}
        onClear={() => onUpdateConfig({ avatarUrl: null })}
      />

      <ThemeToggle
        theme={config.theme}
        onChange={(theme) => onUpdateConfig({ theme })}
      />

      <BadgeSelector
        badge={config.badge}
        onChange={(badge) => onUpdateConfig({ badge })}
      />

      <EngagementControls
        show={config.showEngagement}
        engagement={config.engagement}
        onToggle={(show) => onUpdateConfig({ showEngagement: show })}
        onChange={(engagement) => onUpdateConfig({ engagement })}
        onRandomize={onRandomizeEngagement}
      />

      {mode === "manual" && (
        <ManualControls config={config} onChange={onUpdateConfig} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create PreviewPanel**

Create `src/components/generator/PreviewPanel.tsx`:

```tsx
import { useRef } from "react";
import type { GeneratorConfig } from "../../types/generator";
import { TwitterCard } from "../templates/twitter/TwitterCard";
import { ExportControls } from "./ExportControls";

interface PreviewPanelProps {
  config: GeneratorConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500">Live Preview</h3>

      {/* Card container — this is what gets exported */}
      <div className="flex justify-center">
        <div>
          <div ref={cardRef}>
            <TwitterCard config={config} />
          </div>
          {/* Watermark — free tier */}
          <div className="bg-gray-100 text-gray-400 text-xs text-center py-1 px-3">
            thumbnailcards.com — Upgrade to Pro to remove
          </div>
        </div>
      </div>

      <ExportControls cardRef={cardRef} />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run lint
```

Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/generator/ControlsPanel.tsx src/components/generator/PreviewPanel.tsx
git commit -m "feat: add ControlsPanel and PreviewPanel composing all controls and preview"
```

---

### Task 11: GeneratorShell and TwitterGeneratorPage

**Files:**
- Create: `src/components/generator/GeneratorShell.tsx`
- Modify: `src/pages/TwitterGeneratorPage.tsx`

- [ ] **Step 1: Create GeneratorShell**

Create `src/components/generator/GeneratorShell.tsx`:

```tsx
import type { GeneratorConfig, GeneratorMode } from "../../types/generator";
import { ControlsPanel } from "./ControlsPanel";
import { PreviewPanel } from "./PreviewPanel";

interface GeneratorShellProps {
  config: GeneratorConfig;
  mode: GeneratorMode;
  activePreset: string;
  onUpdateConfig: (partial: Partial<GeneratorConfig>) => void;
  onSetMode: (mode: GeneratorMode) => void;
  onApplyPreset: (name: string) => void;
  onRandomizeEngagement: () => void;
  onSetAvatar: (file: File) => void;
}

export function GeneratorShell(props: GeneratorShellProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Controls */}
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="lg:sticky lg:top-4 space-y-6 rounded-lg border border-gray-200 p-6">
          <ControlsPanel {...props} />
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0">
        <div className="lg:sticky lg:top-4">
          <PreviewPanel config={props.config} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire up TwitterGeneratorPage**

Replace `src/pages/TwitterGeneratorPage.tsx`:

```tsx
import { useGenerator } from "../hooks/useGenerator";
import { GeneratorShell } from "../components/generator/GeneratorShell";

export default function TwitterGeneratorPage() {
  const generator = useGenerator();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Twitter/X Post Generator</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create realistic tweet screenshots for YouTube thumbnails
        </p>
      </div>

      <GeneratorShell
        config={generator.config}
        mode={generator.mode}
        activePreset={generator.activePreset}
        onUpdateConfig={generator.updateConfig}
        onSetMode={generator.setMode}
        onApplyPreset={generator.applyPreset}
        onRandomizeEngagement={generator.randomizeEngagement}
        onSetAvatar={generator.setAvatar}
      />
    </div>
  );
}
```

- [ ] **Step 3: Run dev server and test manually**

```bash
npm run dev
```

Expected: Navigate to `/twitter`. Two-column layout with controls on the left and live tweet card preview on the right. Typing in inputs updates the preview in real time. Toggling theme changes card colors. Switching to Manual mode reveals sliders. Download PNG button exports the card.

- [ ] **Step 4: Verify build**

```bash
npm run build && npm run lint
```

Expected: Build and lint both succeed.

- [ ] **Step 5: Commit**

```bash
git add src/components/generator/GeneratorShell.tsx src/pages/TwitterGeneratorPage.tsx
git commit -m "feat: wire up GeneratorShell with TwitterGeneratorPage for full generator flow"
```

---

### Task 12: HomePage

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Build the SEO landing page**

Replace `src/pages/HomePage.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build && npm run lint
```

Expected: Both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: add SEO-optimized homepage with hero, features, and article content"
```

---

### Task 13: SEO Meta Tags

**Files:**
- Modify: `index.html`
- Create: `src/components/SEOHead.tsx`
- Modify: `src/pages/HomePage.tsx`, `src/pages/TwitterGeneratorPage.tsx`

- [ ] **Step 1: Set up base HTML meta tags**

Update `index.html` to include base meta tags:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ThumbnailCards — Fake Social Media Post Generator for YouTube Thumbnails</title>
    <meta name="description" content="Generate realistic fake tweet screenshots, Facebook posts, and more for YouTube thumbnails. High-res PNG export in seconds. Free, no signup required." />
    <meta property="og:title" content="ThumbnailCards — Fake Social Media Post Generator" />
    <meta property="og:description" content="Generate realistic fake tweet screenshots for YouTube thumbnails. High-res PNG export in seconds." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="ThumbnailCards — Fake Social Media Post Generator" />
    <meta name="twitter:description" content="Generate realistic fake tweet screenshots for YouTube thumbnails." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create SEOHead component for per-route meta**

Create `src/components/SEOHead.tsx`:

```tsx
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
}

export function SEOHead({ title, description }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
  }, [title, description]);

  return null;
}
```

- [ ] **Step 3: Add SEOHead to pages**

Add to `src/pages/HomePage.tsx` — import and render at top of return:

```tsx
import { SEOHead } from "../components/SEOHead";

// Inside return, at the very top:
<SEOHead
  title="ThumbnailCards — Fake Social Media Post Generator for YouTube Thumbnails"
  description="Generate realistic fake tweet screenshots, Facebook posts, and more for YouTube thumbnails. High-res PNG export in seconds. Free, no signup required."
/>
```

Add to `src/pages/TwitterGeneratorPage.tsx` — import and render at top of return:

```tsx
import { SEOHead } from "../components/SEOHead";

// Inside return, at the very top:
<SEOHead
  title="Fake Tweet Generator — Create Twitter/X Post Screenshots | ThumbnailCards"
  description="Generate realistic fake tweet screenshots for YouTube thumbnails. Custom text, profile pics, engagement stats, dark mode. Free PNG export, no signup."
/>
```

- [ ] **Step 4: Create basic favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#000"/>
  <text x="50" y="68" text-anchor="middle" font-size="56" font-weight="bold" fill="#fff" font-family="system-ui">TC</text>
</svg>
```

- [ ] **Step 5: Verify build**

```bash
npm run build && npm run lint
```

Expected: Both succeed.

- [ ] **Step 6: Commit**

```bash
git add index.html src/components/SEOHead.tsx src/pages/HomePage.tsx src/pages/TwitterGeneratorPage.tsx public/favicon.svg
git commit -m "feat: add SEO meta tags, per-route SEOHead component, and favicon"
```

---

### Task 14: Responsive Polish and Final Verification

**Files:**
- Modify: `src/components/layout/Navbar.tsx`, `src/components/generator/GeneratorShell.tsx`

- [ ] **Step 1: Add mobile menu to Navbar**

Replace `src/components/layout/Navbar.tsx`:

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          ThumbnailCards
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/twitter" className="text-sm hover:underline">
            Twitter/X
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 pb-2">
          <Link
            to="/twitter"
            className="block text-sm py-2 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Twitter/X Generator
          </Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify responsive behavior**

```bash
npm run dev
```

Test at these widths:
- **1200px+**: Two-column generator layout, desktop nav
- **768px**: Two-column with narrower controls
- **375px**: Single-column stacked layout, hamburger menu

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Run build**

```bash
npm run build && npm run lint
```

Expected: Both succeed.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add responsive navbar with mobile menu"
```

---

### Task 15: Update CLAUDE.md and Project Docs

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md with actual project info**

Update the Project Overview and Build & Run sections in `CLAUDE.md` to reflect the actual project:

```markdown
# ThumbnailCards

## Project Overview
ThumbnailCards — free web app for generating fake social media post cards optimized for YouTube thumbnails. Built with Vite + React + TypeScript + Tailwind CSS v4. Multi-route SPA with per-platform generators (Twitter/X for MVP).

## Build & Run
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npx vitest run` or `npm test`
- Lint: `npm run lint` (runs `tsc --noEmit`)
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with actual project details"
```

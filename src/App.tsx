import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const TwitterGeneratorPage = lazy(
  () => import("./pages/TwitterGeneratorPage")
);
const FacebookGeneratorPage = lazy(
  () => import("./pages/FacebookGeneratorPage")
);
const InstagramGeneratorPage = lazy(
  () => import("./pages/InstagramGeneratorPage")
);
const ThreadsGeneratorPage = lazy(
  () => import("./pages/ThreadsGeneratorPage")
);
const BlueskyGeneratorPage = lazy(
  () => import("./pages/BlueskyGeneratorPage")
);
const TruthSocialGeneratorPage = lazy(
  () => import("./pages/TruthSocialGeneratorPage")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center p-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-200 border-t-primary-500" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/twitter" element={<TwitterGeneratorPage />} />
                <Route path="/facebook" element={<FacebookGeneratorPage />} />
                <Route path="/instagram" element={<InstagramGeneratorPage />} />
                <Route path="/threads" element={<ThreadsGeneratorPage />} />
                <Route path="/bluesky" element={<BlueskyGeneratorPage />} />
                <Route path="/truth-social" element={<TruthSocialGeneratorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

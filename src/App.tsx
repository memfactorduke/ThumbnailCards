import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const TwitterGeneratorPage = lazy(
  () => import("./pages/TwitterGeneratorPage")
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
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/twitter" element={<TwitterGeneratorPage />} />
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

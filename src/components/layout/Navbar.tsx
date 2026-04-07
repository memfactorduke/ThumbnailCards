import { useState } from "react";
import { Link } from "react-router-dom";

const GENERATORS = [
  { name: "Twitter/X", path: "/twitter" },
  { name: "Facebook", path: "/facebook" },
  { name: "Instagram", path: "/instagram" },
  { name: "Threads", path: "/threads" },
  { name: "Bluesky", path: "/bluesky" },
  { name: "Truth Social", path: "/truth-social" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="bg-white/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-surface-900 hover:text-primary-600 transition-colors"
        >
          <span className="text-primary-500">Thumbnail</span>Cards
        </Link>

        <div className="hidden md:flex gap-1 items-center">
          {GENERATORS.map((g) => (
            <Link
              key={g.path}
              to={g.path}
              className="text-sm font-medium text-surface-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all"
            >
              {g.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors text-surface-600"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 pt-2 border-t border-surface-100 space-y-1">
          {GENERATORS.map((g) => (
            <Link
              key={g.path}
              to={g.path}
              className="block text-sm font-medium text-surface-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {g.name} Generator
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

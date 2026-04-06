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

        <div className="hidden md:flex gap-4 items-center">
          <Link to="/twitter" className="text-sm hover:underline">
            Twitter/X
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

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

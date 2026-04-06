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

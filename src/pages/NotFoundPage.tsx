import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-surface-600">Page not found</p>
      <p className="mt-2 text-surface-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

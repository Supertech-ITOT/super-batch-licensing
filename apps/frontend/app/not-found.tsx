import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX size={38} strokeWidth={1.8} />
        </div>

        <h1 className="text-8xl font-bold tracking-tight text-primary">404</h1>

        <h2 className="mt-5 text-2xl font-semibold text-foreground">Page not found</h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={17} />
            Go Back to Home
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">© {new Date().getFullYear()} SuperTech. All rights reserved.</p>
      </div>
    </main>
  );
}

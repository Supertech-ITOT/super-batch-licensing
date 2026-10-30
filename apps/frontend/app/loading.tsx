export default function Loading() {
  return (
    <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center text-center">
        {/* Brand Logo */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <span className="text-2xl font-bold">S</span>
        </div>

        {/* Spinner */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
        </div>

        <h2 className="mt-6 text-lg font-semibold text-foreground">Loading...</h2>

        <p className="mt-2 text-sm text-muted-foreground">Please wait while we prepare everything for you.</p>

        {/* Animated Progress Bar */}
        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-primary/10">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
}

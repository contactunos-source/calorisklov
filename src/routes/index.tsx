import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calorisk — AI Food Scanner for Instant Nutrition" },
      {
        name: "description",
        content:
          "Snap a photo of any meal and Calorisk's AI instantly reveals calories, protein, carbs, and fat.",
      },
      { property: "og:title", content: "Calorisk — AI Food Scanner" },
      {
        property: "og:description",
        content: "Scan your meal. Know your nutrition instantly.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.45-1.7 4.25-5.5 4.25-3.3 0-6-2.74-6-6.12s2.7-6.12 6-6.12c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.78 3.6 14.6 2.6 12 2.6 6.93 2.6 2.83 6.7 2.83 12s4.1 9.4 9.17 9.4c5.3 0 8.8-3.72 8.8-8.95 0-.6-.06-1.06-.14-1.52H12z"
      />
      <path
        fill="#4285F4"
        d="M21.66 12.45c0-.6-.06-1.06-.14-1.52H12v3.17h5.5c-.11.83-.72 2.08-2.07 2.92l3.34 2.6c1.98-1.83 2.89-4.5 2.89-7.17z"
      />
      <path
        fill="#FBBC05"
        d="M6 13.93a5.94 5.94 0 0 1 0-3.86V7.46H2.6a9.4 9.4 0 0 0 0 9.08L6 13.93z"
      />
      <path
        fill="#34A853"
        d="M12 21.4c2.6 0 4.78-.86 6.37-2.34l-3.34-2.6c-.9.62-2.1 1.05-3.03 1.05-2.34 0-4.32-1.55-5.03-3.7L2.6 16.54C4.18 19.46 7.85 21.4 12 21.4z"
      />
    </svg>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="group inline-flex items-baseline gap-0.5">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Calor
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-brand">
            isk
          </span>
        </a>
        <a
          href="#signin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign in
        </a>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-5 pb-16 sm:px-8">
        <section className="w-full max-w-md">
          <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-[0_8px_40px_-12px_rgba(15,40,30,0.08)] sm:p-9">
            <div className="text-center">
              <h1 className="font-display text-[28px] font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-[32px]">
                Scan Your Meal.
                <br />
                Know Your Nutrition Instantly.
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                AI-powered food scanning that reveals calories, protein, carbs, and fat from a single photo.
              </p>
            </div>

            <div className="mt-7 space-y-3">
              <button
                type="button"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 text-[15px] font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md active:translate-y-0 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <GoogleIcon className="h-5 w-5" />
                <span>Sign in with Google</span>
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand px-4 text-[15px] font-semibold text-brand-foreground shadow-[0_6px_20px_-6px_color-mix(in_oklab,var(--brand)_55%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_color-mix(in_oklab,var(--brand)_65%,transparent)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/90">
                  <GoogleIcon className="h-3.5 w-3.5" />
                </span>
                <span>Sign up with Google</span>
              </button>
            </div>

            <p id="signin" className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-brand underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Free to start · No credit card required
          </p>
        </section>
      </main>
    </div>
  );
}

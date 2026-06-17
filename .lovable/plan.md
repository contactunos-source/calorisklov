## Calorisk Landing Page

Replace `src/routes/index.tsx` with a clean, mobile-first landing page styled after the reference (light theme, soft gray card, rounded inputs/buttons, centered layout).

### Layout
- Top-left wordmark: **Calorisk** (bold, slight color accent on "isk")
- Centered card (max-w ~440px, soft `bg-muted`, rounded-2xl, subtle shadow) containing:
  - H1: "Scan Your Meal. Know Your Nutrition Instantly."
  - Subtext: "Calorisk uses AI to analyze any food photo and instantly reveal calories, protein, carbs, and fat."
  - **Continue with Google** button (white, Google "G" icon, full-width, rounded-xl)
  - "or" divider with hairlines
  - **Sign up with Google** button (primary filled, full-width, rounded-xl)
  - Footer line: "Already have an account? **Sign in**" (link styled)

### Style
- Tailwind v4 tokens in `src/styles.css`: warm off-white background, soft gray card, near-black text, a fresh green accent (`oklch` ~0.72 0.17 150) for the primary CTA and brand mark — fits a nutrition product.
- Typography: load Inter Tight (display) + Inter (body) via `<link>` in `__root.tsx`, expose as `--font-display` / `--font-sans` in `@theme`.
- Buttons: rounded-xl, `h-12`, subtle border, `transition-all`, `hover:-translate-y-0.5`, `hover:shadow-md`, `active:scale-[0.98]`, focus ring.
- Inputs: not needed for landing (auth-only buttons per request).

### SEO / Head
- Title: "Calorisk — AI Food Scanner for Instant Nutrition"
- Meta description (<160 chars), og:title, og:description, twitter card, viewport.

### Out of scope
No actual auth wiring, no dashboard, no results page. Buttons are visual only (no-op handlers) until auth is added later.

### Files
- Edit `src/routes/index.tsx` — landing page component
- Edit `src/styles.css` — add brand tokens + font family vars
- Edit `src/routes/__root.tsx` — add Google Fonts `<link>` and root meta

# Plan: Vercel-ready Calorisk on your own Supabase

Goal: cleanly export this project to GitHub and deploy on Vercel, with all backend data living in **your** Supabase project (not Lovable's managed one).

---

## What you'll need to provide (I'll ask via the secure secret form when we start)

From your Supabase project → Project Settings → API:

1. **Project URL** (e.g. `https://xxxx.supabase.co`)
2. **Publishable / anon key** (the public one — safe in the browser)
3. **Service role key** (secret — server-only)

And from Authentication → URL Configuration, you'll later add your Vercel domain to **Site URL** and **Redirect URLs** (I'll give exact strings).

---

## Steps

### 1. Re-create the database schema in your Supabase
Run a single migration on your Supabase project that creates:
- `public.profiles` table (id, first_name, last_name, email, timestamps)
- RLS policies (users can read/update only their own row)
- `handle_new_user()` trigger that auto-creates a profile on signup

You'll run this SQL once in your Supabase SQL Editor — I'll provide it as a copy-paste block and also commit it to `supabase/migrations/` so the repo has the source of truth.

### 2. Repoint the app to your Supabase
- Replace the Lovable-managed values in `.env` with your `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Document them in `.env.example` (committed) so future-you knows what Vercel needs.
- Sanity-check `src/integrations/supabase/client.ts` and `client.server.ts` read from these env names (they already do).

### 3. Swap Google sign-in to native Supabase OAuth
Today the code uses `lovable.auth.signInWithOAuth("google", ...)` (Lovable's managed broker). That broker won't exist on Vercel. Replace with `supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/app" } })`. You'll enable Google in your Supabase dashboard → Authentication → Providers (I'll give the exact callback URL to paste into Google Cloud Console).

### 4. Configure Vercel deployment
- Switch the TanStack Start Vite preset from Cloudflare Workers to **Vercel** in `vite.config.ts`.
- Add `vercel.json` for any framework hints (mostly defaults).
- Remove Cloudflare-only files (`wrangler.*` if any) so nothing locks us in.
- Add a Node version pin (`.nvmrc` / `engines` in `package.json`) matching Vercel's supported runtime.

### 5. Clean repo hygiene for GitHub
- `.gitignore`: ensure `.env`, `node_modules`, `.vercel`, build output are excluded.
- `.env.example`: list every required env var with comments.
- `README.md` (rewritten for non-coders): one-page deploy guide — Clone → push to GitHub → Import in Vercel → paste env vars → done.
- Keep `supabase/migrations/` as the canonical schema history.

### 6. Verify locally in preview, then hand off
- Test sign-up, Google sign-in, and the `/app` redirect inside Lovable preview using your Supabase.
- Then you push to GitHub and import into Vercel. I'll give a step-by-step.

---

## What stays the same
- The landing page UI, routes, and TanStack Start framework — no rewrite.
- File layout under `src/` — already clean and repo-ready.

## What gets removed
- Lovable Cloud's auto-injected Supabase credentials.
- The `@/integrations/lovable` Google broker call (replaced with native Supabase).

---

## Technical details (for reference)

| Area | Change |
|---|---|
| `vite.config.ts` | `tanstackStart({ target: "vercel" })` instead of cloudflare-module |
| `.env` | Your Supabase URL + keys (server + VITE_ prefixed) |
| `src/routes/index.tsx` | Replace `lovable.auth.signInWithOAuth` with `supabase.auth.signInWithOAuth` |
| New: `vercel.json` | Minimal framework config |
| New: `.env.example` | Documented required vars |
| New: `README.md` | Non-coder deploy walkthrough |
| `supabase/migrations/*.sql` | Committed schema for your Supabase |

---

## One thing to confirm before I build

After this switch, the **Lovable preview inside the editor will run against your Supabase** (not Lovable Cloud). That means every signup/test you do here writes to your real Supabase project. Totally normal — just confirming you're ok with that. (Alternative: keep a separate Supabase "dev" project for the preview and use the prod one only on Vercel — let me know if you want that and I'll wire two env files.)

Reply **go** and I'll request your three Supabase secrets and start building.